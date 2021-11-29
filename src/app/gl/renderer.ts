import {Color, Vec2} from '../math';

import {Camera} from './camera';
import {Command} from './command';
import {CommandQueue} from './command-queue';

/**
 * Class used to draw stuff on the canvas.
 */
export abstract class Renderer {
  /** The canvas element. */
  protected _canvas: HTMLCanvasElement;

  /** The camera used to render. */
  private _camera: Camera;

  /** The last command queue. */
  private _commandQueue: CommandQueue|null = null;

  /**
   * @param canvas The canvas element.
   */
  public constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._camera = new Camera(Vec2.ZERO, 1, this._canvas.width, this._canvas.height);
    this._commandQueue = null;
    this.resize();
  }

  /**
   * Submits a new command queue to be drawn.
   * @param queue The command queue to be drawn.
   */
  public submit(queue: CommandQueue): void {
    this._commandQueue = queue;
  }

  /**
   * Flushes the draw commands queue.
   * @param time The current time.
   */
  public flush(time: number): void {
    if (this._commandQueue === null) {
      return;
    }

    // Interpolate the queue.
    this._commandQueue = this._commandQueue.interpolate(time);

    // Render the queue.
    this.render();
  }

  /**
   * Gets the camera used to render.
   */
  public get camera(): Camera {
    return this._camera;
  }

  /**
   * Should be called when the window is resized.
   */
  public resize(): void {
    // Update the canvas size to match the window size.
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    // Update the camera's canvas size.
    this._camera.width = this._canvas.width;
    this._camera.height = this._canvas.height;
  }

  /**
   * Renders the current frame.
   */
  protected abstract render(): void;

  /**
   * Executes all the draw commands.
   * @param method The method used to draw the commands.
   */
  protected executeCommands(method: (command: Command) => void): void {
    if (this._commandQueue === null) return;
    for (const command of this._commandQueue) {
      method(command);
    }
  }
}
