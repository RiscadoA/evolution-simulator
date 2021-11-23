import {Color, Vec2} from '../math';
import {DrawCommand} from './draw-command';

/**
 * Command used to draw a box.
 */
export class DrawBox extends DrawCommand {
  /** The center of the box. */
  public center: Vec2;

  /** The size of the box. */
  public size: Vec2;

  /** The rotation of the box. */
  public rotation: number;

  /** The color of the box. */
  public color: Color;

  /**
   * @param center The center of the box.
   * @param size The size of the box.
   * @param rotation The rotation of the box.
   * @param color The color of the box.
   */
  public constructor(center: Vec2, size: Vec2, rotation: number, color: Color) {
    super();
    this.center = center.clone();
    this.size = size.clone();
    this.rotation = rotation;
    this.color = color.clone();
  }
}
