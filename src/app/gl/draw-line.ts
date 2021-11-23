import {Color, Vec2} from '../math';
import {DrawCommand} from './draw-command';

/**
 * Command used to draw a line.
 */
export class DrawLine extends DrawCommand {
  /** The start of the line. */
  public start: Vec2;

  /** The end of the line. */
  public end: Vec2;

  /** The thickness of the line. */
  public thickness: number;

  /** The color of the line. */
  public color: Color;

  /**
   * @param start The start of the line.
   * @param end The end of the line.
   * @param radius The thickness of the line.
   * @param color The color of the line.
   */
  public constructor(start: Vec2, end: Vec2, thickness: number, color: Color) {
    super();
    this.start = start.clone();
    this.end = end.clone();
    this.thickness = thickness;
    this.color = color.clone();
  }
}
