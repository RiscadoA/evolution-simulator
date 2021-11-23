import {Color, Vec2} from '../math';
import {DrawCommand} from './draw-command';

/**
 * Command used to draw a circle.
 */
export class DrawCircle extends DrawCommand {
  /** The center of the circle. */
  public center: Vec2;

  /** The radius of the circle. */
  public radius: number;

  /** The color of the circle. */
  public color: Color;

  /**
   * @param center The center of the circle.
   * @param radius The radius of the circle.
   * @param color The color of the circle.
   */
  public constructor(center: Vec2, radius: number, color: Color) {
    super();
    this.center = center.clone();
    this.radius = radius;
    this.color = color.clone();
  }
}
