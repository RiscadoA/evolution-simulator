import {Color, Mat3, Vec2} from '../math';

import {DrawBox} from './draw-box';
import {DrawCircle} from './draw-circle';
import {DrawCommand} from './draw-command';
import {DrawLine} from './draw-line';
import {Renderer} from './renderer';

/** Background color. */
const BACKGROUND_COLOR = new Color(0.3, 0.6, 0.9, 1.0);

/** Number of circle divisions. */
const CIRCLE_DIVISIONS = 32;

/** Line thickness. */
const LINE_THICKNESS = 0.05;

/**
 * Renderer implementation for WebGL.
 */
export class WebGLRenderer extends Renderer {
  /** The WebGL context. */
  private _gl: WebGLRenderingContext;

  /** The shader used to draw. */
  private _drawShader: ShaderProgram;

  /** The draw shader position attribute location. */
  private _drawShaderPositionLocation: number;

  /** The draw shader transform uniform location. */
  private _drawShaderTransformLocation: WebGLUniformLocation;

  /** The draw shader color uniform location. */
  private _drawShaderColorLocation: WebGLUniformLocation;

  /** Vertex buffer used for drawing primitives. */
  private _vertexBuffer: WebGLBuffer;

  /** Circle vertex offset and count. */
  private _circle: [number, number];

  /** Line vertex offset and count. */
  private _line: [number, number];

  /** Box vertex offset and count. */
  private _box: [number, number];

  /**
   * @param canvas The canvas element.
   */
  public constructor(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {
    super(canvas);
    this._gl = gl;

    // Create the shader program used to draw.
    this._drawShader = new ShaderProgram(
        this._gl, `
      attribute vec2 position;

      uniform mat3 transform;

      void main() {
        vec3 position = transform * vec3(position, 1.0);
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `, `
      precision mediump float;

      uniform vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `);

    // Get the shader attributes locations and uniform locations.
    this._drawShaderPositionLocation = this._drawShader.getAttributeLocation('position');
    this._drawShaderTransformLocation = this._drawShader.getUniformLocation('transform');
    this._drawShaderColorLocation = this._drawShader.getUniformLocation('color');

    // Generate circle primitive.
    let vertices: number[] = [];
    this._circle = [0, CIRCLE_DIVISIONS + 2];
    vertices.push(0.0, 0.0);
    for (let i = 0; i <= CIRCLE_DIVISIONS; i++) {
      const angle = 2 * Math.PI * i / CIRCLE_DIVISIONS;
      vertices.push(Math.cos(angle), Math.sin(angle));
    }

    // Generate line primitive.
    this._line = [vertices.length / 2, 4];
    vertices.push(-LINE_THICKNESS, 0.0);
    vertices.push(-LINE_THICKNESS, 1.0);
    vertices.push(+LINE_THICKNESS, 1.0);
    vertices.push(+LINE_THICKNESS, 0.0);

    // Generate box primitive.
    this._box = [vertices.length / 2, 4];
    vertices.push(-1.0, -1.0);
    vertices.push(-1.0, +1.0);
    vertices.push(+1.0, +1.0);
    vertices.push(+1.0, -1.0);

    // Create the vertex buffer used to draw primitives.
    this._vertexBuffer = this._gl.createBuffer()!;
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
    this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(vertices), this._gl.STATIC_DRAW);
  }

  // Flushes the draw commands queue.
  public override flush(): void {
    // Clear the canvas.
    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    this._gl.clearColor(BACKGROUND_COLOR.r, BACKGROUND_COLOR.g, BACKGROUND_COLOR.b, 1);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);

    // Execute all the draw commands.
    this._drawShader.use();
    this.executeCommands(this.executeCommand.bind(this));
    this.clearCommands();
  }

  /**
   * Executes a draw command.
   * @param command The command to execute.
   */
  private executeCommand(command: DrawCommand): void {
    // Draw circle command.
    if (command instanceof DrawCircle) {
      // Set uniforms.
      const model = Mat3.scale(command.radius).mul(Mat3.translation(command.center));
      const final = model.mul(this.camera.matrix);
      this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
      this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);

      // Draw the circle.
      this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
      this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
      this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._circle[0], this._circle[1]);
    }
    // Draw box command.
    else if (command instanceof DrawBox) {
      // Set uniforms.
      const model = Mat3.scale(command.size).mul(Mat3.rotation(command.rotation)).mul(Mat3.translation(command.center));
      const final = model.mul(this.camera.matrix);
      this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
      this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);

      // Draw the box.
      this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
      this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
      this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._box[0], this._box[1]);
    }
    // Draw line command.
    else if (command instanceof DrawLine) {
      // Set uniforms.
      const offset = command.end.sub(command.start);
      const translation = Mat3.translation(command.start);
      const scale = Mat3.scale(Vec2.new(command.thickness, offset.length()));
      const rotation = Mat3.rotation(offset.angle() - Math.PI / 2);
      const final = scale.mul(rotation).mul(translation).mul(this.camera.matrix);
      this._gl.uniformMatrix3fv(this._drawShaderTransformLocation, false, final.elements);
      this._gl.uniform3f(this._drawShaderColorLocation, command.color.r, command.color.g, command.color.b);

      // Draw the line.
      this._gl.enableVertexAttribArray(this._drawShaderPositionLocation);
      this._gl.vertexAttribPointer(this._drawShaderPositionLocation, 2, this._gl.FLOAT, false, 0, 0);
      this._gl.drawArrays(this._gl.TRIANGLE_FAN, this._line[0], this._line[1]);
    }
  }
}

/**
 * WebGL shader program wrapper.
 */
class ShaderProgram {
  /** The WebGL context. */
  private _gl: WebGLRenderingContext;

  /** The shader program. */
  private _program: WebGLProgram;

  /** The vertex shader. */
  private _vertexShader: WebGLShader;

  /** The fragment shader. */
  private _fragmentShader: WebGLShader;

  public constructor(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    this._gl = gl;

    // Create shaders.
    this._vertexShader = this.createShader(this._gl.VERTEX_SHADER, vertexShaderSource);
    this._fragmentShader = this.createShader(this._gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Attach and link the shaders.
    this._program = this._gl.createProgram()!;
    this._gl.attachShader(this._program, this._vertexShader);
    this._gl.attachShader(this._program, this._fragmentShader);
    this._gl.linkProgram(this._program);

    // Check if the program linked successfully.
    if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS))
      throw new Error(`Shader linking failed: ${this._gl.getProgramInfoLog(this._program)!}`);
  }

  /**
   * Uses the shader program.
   */
  public use(): void {
    this._gl.useProgram(this._program);
  }

  /**
   * Gets the attribute location.
   * @param name The attribute name.
   * @return The attribute location.
   */
  public getAttributeLocation(name: string): number {
    return this._gl.getAttribLocation(this._program, name);
  }

  /**
   * Gets the uniform location.
   * @param name The uniform name.
   * @return The uniform location.
   */
  public getUniformLocation(name: string): WebGLUniformLocation {
    const loc = this._gl.getUniformLocation(this._program, name);
    if (loc === null) throw new Error(`Shader uniform ${name} not found.`);
    return loc;
  }

  /**
   * Creates a WebGL shader.
   * @param type The shader type.
   * @param source The shader source.
   */
  private createShader(type: number, source: string): WebGLShader {
    const shader = this._gl.createShader(type)!;
    this._gl.shaderSource(shader, source);
    this._gl.compileShader(shader);

    // Check if the shader compiled successfully.
    if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS))
      throw new Error(`Shader compilation failed: ${this._gl.getShaderInfoLog(shader)!}`);

    return shader;
  }
}