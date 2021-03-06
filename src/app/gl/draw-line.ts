import {Color, Vec2} from '../math';
import {Command} from './command';

/**
 * Command used to draw a line.
 */
export class DrawLine implements Command {
  /** The start of the line. */
  public readonly start: Vec2;

  /** The end of the line. */
  public readonly end: Vec2;

  /** The thickness of the line. */
  public readonly thickness: number;

  /** The color of the line. */
  public readonly color: Color;

  /** The start velocity of the line. */
  private readonly _startVelocity: Vec2;

  /** The end velocity of the line. */
  private readonly _endVelocity: Vec2;

  /**
   * @param start The start of the line.
   * @param end The end of the line.
   * @param radius The thickness of the line.
   * @param color The color of the line.
   * @param startVelocity The velocity of the start of the line.
   * @param endVelocity The velocity of the end of the line.
   */
  public constructor(start: Vec2, end: Vec2, thickness: number, color: Color, startVelocity: Vec2, endVelocity: Vec2) {
    this.start = start;
    this.end = end;
    this.thickness = thickness;
    this.color = color;
    this._startVelocity = startVelocity;
    this._endVelocity = endVelocity;
  }

  // Implement the Command interface.
  public interpolate(dt: number): Command {
    return new DrawLine(
        this.start.add(this._startVelocity.mul(dt)), this.end.add(this._endVelocity.mul(dt)), this.thickness,
        this.color, this._startVelocity, this._endVelocity);
  }
}
