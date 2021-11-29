import {Color, Vec2} from '../math';
import {Command} from './command';

/**
 * Command used to draw a box.
 */
export class DrawBox implements Command {
  /** The center of the box. */
  public readonly center: Vec2;

  /** The size of the box. */
  public readonly size: Vec2;

  /** The color of the box. */
  public readonly color: Color;

  /** The velocity of the box. */
  private readonly _velocity: Vec2;

  /**
   * @param center The center of the box.
   * @param size The size of the box.
   * @param color The color of the box.
   * @param velocity The velocity of the box.
   */
  public constructor(center: Vec2, size: Vec2, color: Color, velocity: Vec2) {
    this.center = center;
    this.size = size;
    this.color = color;
    this._velocity = velocity;
  }

  // Implement the Command interface.
  public interpolate(dt: number): Command {
    return new DrawBox(this.center.add(this._velocity.mul(dt)), this.size, this.color, this._velocity);
  }
}
