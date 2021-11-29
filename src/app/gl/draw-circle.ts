import {Color, Vec2} from '../math';
import {Command} from './command';

/**
 * Command used to draw a circle.
 */
export class DrawCircle implements Command {
  /** The center of the circle. */
  public readonly center: Vec2;

  /** The radius of the circle. */
  public readonly radius: number;

  /** The color of the circle. */
  public readonly color: Color;

  /** The velocity of the circle. */
  private readonly _velocity: Vec2;

  /**
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   * @param velocity The velocity of the circle.
   */
  public constructor(center: Vec2, radius: number, color: Color, velocity: Vec2) {
    this.center = center;
    this.radius = radius;
    this.color = color;
    this._velocity = velocity;
  }

  // Implement the Command interface.
  public interpolate(dt: number): Command {
    return new DrawCircle(this.center.add(this._velocity.mul(dt)), this.radius, this.color, this._velocity);
  }
}
