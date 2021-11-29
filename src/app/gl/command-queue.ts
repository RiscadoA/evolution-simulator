import {Color, Vec2} from '../math';
import {Command} from './command';
import {DrawArrow} from './draw-arrow';
import {DrawBox} from './draw-box';
import {DrawCircle} from './draw-circle';
import {DrawLine} from './draw-line';

/** Represents a draw command queue. */
export class CommandQueue {
  /** The commands in the queue. */
  private _commands: Command[];

  /** The time of the queue start. */
  private _time: number;

  // Default constructor.
  public constructor(time: number) {
    this._commands = [];
    this._time = time;
  }

  /**
   * Interpolates the queue to the given time.
   * @param time The time to interpolate to.
   */
  public interpolate(time: number): CommandQueue {
    const queue = new CommandQueue(time);
    queue._commands = this._commands.map(command => command.interpolate(time - this._time));
    return queue;
  }

  /**
   * Iterates over the commands in the queue.
   */
  public[Symbol.iterator](): Iterator<Command> {
    return this._commands[Symbol.iterator]();
  }

  /**
   * Draws a moving box.
   * @param center The center of the box.
   * @param size The size of the box.
   * @param color The color of the box.
   * @param velocity The velocity of the box.
   */
  public drawMovingBox(center: Vec2, size: Vec2, color: Color, velocity: Vec2): void {
    this._commands.push(new DrawBox(center, size, color, velocity));
  }

  /**
   * Draws a moving circle.
   * @param center The circle's center.
   * @param radius The circle's radius.
   * @param color The circle's color.
   * @param velocity The circle's velocity.
   */
  public drawMovingCircle(center: Vec2, radius: number, color: Color, velocity: Vec2): void {
    this._commands.push(new DrawCircle(center, radius, color, velocity));
  }

  /**
   * Draws a moving line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness The thickness of the line.
   * @param color The color of the line.
   * @param startVelocity The start velocity of the line.
   * @param endVelocity The end velocity of the line.
   */
  public drawMovingLine(
      start: Vec2, end: Vec2, thickness: number, color: Color, startVelocity: Vec2, endVelocity: Vec2): void {
    this._commands.push(new DrawLine(start, end, thickness, color, startVelocity, endVelocity));
  }

  /**
   * Draws a moving arrow.
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param thickness The thickness of the arrow.
   * @param color The color of the arrow.
   * @param startVelocity The start velocity of the arrow.
   * @param endVelocity The end velocity of the arrow.
   */
  public drawMovingArrow(
      start: Vec2, end: Vec2, thickness: number, color: Color, startVelocity: Vec2, endVelocity: Vec2): void {
    this._commands.push(new DrawArrow(start, end, thickness, color, startVelocity, endVelocity));
  }

  /**
   * Draws a box.
   * @param center The center of the box.
   * @param size The size of the box.
   * @param color The color of the box.
   */
  public drawBox(center: Vec2, size: Vec2, color: Color): void {
    this.drawMovingBox(center, size, color, Vec2.ZERO);
  }

  /**
   * Draws a circle.
   * @param center The circle's center.
   * @param radius The circle's radius.
   * @param color The circle's color.
   */
  public drawCircle(center: Vec2, radius: number, color: Color): void {
    this.drawMovingCircle(center, radius, color, Vec2.ZERO);
  }

  /**
   * Draws a line.
   * @param start The start of the line.
   * @param end The end of the line.
   * @param thickness The thickness of the line.
   * @param color The color of the line.
   */
  public drawLine(start: Vec2, end: Vec2, thickness: number, color: Color): void {
    this.drawMovingLine(start, end, thickness, color, Vec2.ZERO, Vec2.ZERO);
  }

  /**
   * Draws an arrow.
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param thickness The thickness of the arrow.
   * @param color The color of the arrow.
   */
  public drawArrow(start: Vec2, end: Vec2, thickness: number, color: Color): void {
    this.drawMovingArrow(start, end, thickness, color, Vec2.ZERO, Vec2.ZERO);
  }
}
