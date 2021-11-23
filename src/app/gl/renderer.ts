import {Color, Vec2} from '../math';

import {Camera} from './camera';
import {DrawBox} from './draw-box';
import {DrawCircle} from './draw-circle';
import {DrawCommand} from './draw-command';
import {DrawLine} from './draw-line';

/**
 * Class used to draw stuff on the canvas.
 */
export abstract class Renderer {
  /** The canvas element. */
  protected _canvas: HTMLCanvasElement;

  /** The camera used to render. */
  private _camera: Camera;

  /** The draw commands queue. */
  private _drawCommands: DrawCommand[];

  /**
   * @param canvas The canvas element.
   */
  public constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._camera = new Camera(Vec2.zero(), 0.5, this._canvas.height / this._canvas.width);
    this._drawCommands = [];
    this.onResize();
  }

  /**
   * Draws a circle.
   * @param center The circle's center.
   * @param radius The circle's radius.
   * @param color The circle's color.
   */
  public drawCircle(center: Vec2, radius: number, color: Color): void {
    this._drawCommands.push(new DrawCircle(center, radius, color));
  }

  /**
   * Draws a box.
   * @param center The center of the box.
   * @param size The size of the box.
   * @param rotation The rotation of the box.
   * @param color The color of the box.
   */
  public drawBox(center: Vec2, size: Vec2, rotation: number, color: Color): void {
    this._drawCommands.push(new DrawBox(center, size, rotation, color));
  }

  /**
   * Draws a line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness The thickness of the line.
   * @param color The color of the line.
   */
  public drawLine(start: Vec2, end: Vec2, thickness: number, color: Color): void {
    this._drawCommands.push(new DrawLine(start, end, thickness, color));
  }

  /**
   * Gets the camera used to render.
   */
  public get camera(): Camera {
    return this._camera;
  }

  /**
   * Flushes the draw commands queue.
   */
  public abstract flush(): void;

  /**
   * Should be called when the window is resized.
   */
  public onResize(): void {
    // Update the canvas size to match the window size.
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    // Update the camera's aspect ratio.
    this._camera.aspectRatio = this._canvas.height / this._canvas.width;
  }

  /**
   * Executes all the draw commands.
   * @param method The method used to draw the commands.
   */
  protected executeCommands(method: (command: DrawCommand) => void): void {
    this._drawCommands.forEach(command => method(command));
  }

  /**
   * Clears all draw commands.
   */
  protected clearCommands(): void {
    this._drawCommands = [];
  }
}
