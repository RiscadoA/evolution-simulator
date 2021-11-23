import {Renderer} from './renderer';
import {WebGLRenderer} from './webgl-renderer';

export {Camera} from './camera';
export {Renderer};

/**
 * Creates a new renderer.
 * @param canvas The canvas element.
 */
export function createRenderer(canvas: HTMLCanvasElement): Renderer {
  const gl = canvas.getContext('webgl');
  if (gl === null) throw new Error('WebGL is necessary but not supported.');
  return new WebGLRenderer(canvas, gl);
}