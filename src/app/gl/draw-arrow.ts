import {Color, Vec2} from '../math';
import {Command} from './command';

/**
 * Command used to draw an arrow.
 */
export class DrawArrow implements Command {
  /** The start of the arrow. */
  public readonly start: Vec2;

  /** The end of the arrow. */
  public readonly end: Vec2;

  /** The thickness of the arrow. */
  public readonly thickness: number;

  /** The color of the arrow. */
  public readonly color: Color;

  /** The start velocity of the arrow. */
  private readonly _startVelocity: Vec2;

  /** The end velocity of the arrow. */
  private readonly _endVelocity: Vec2;

  /**
   * @param start The start of the arrow.
   * @param end The end of the arrow.
   * @param radius The thickness of the arrow.
   * @param color The color of the arrow.
   * @param startVelocity The velocity of the start of the arrow.
   * @param endVelocity The velocity of the end of the arrow.
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
    return new DrawArrow(
        this.start.add(this._startVelocity.mul(dt)), this.end.add(this._endVelocity.mul(dt)), this.thickness,
        this.color, this._startVelocity, this._endVelocity);
  }
}
