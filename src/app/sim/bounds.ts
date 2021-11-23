import {Renderer} from '../gl';
import {Color, Vec2} from '../math';

import {StaticBody} from './body';
import {AABBCollider, Collider, GroupCollider} from './collider';

/** Bounds color. */
const BOUNDS_COLOR = Color.new(0.8, 0.8, 0.8);

/** Bounds thickness. */
const BOUNDS_THICKNESS = 0.1;

/**
 * Used to define the bounds of a simulation.
 */
export class Bounds extends StaticBody {
  private _colliders: AABBCollider[];

  /**
   * Creates a new bounds.
   * @param center The center of the bounds.
   * @param size The size of the bounds.
   */
  constructor(center: Vec2, size: Vec2) {
    super(center);

    const topLeft = Vec2.new(center.x - size.x / 2, center.y + size.y / 2);
    const topRight = Vec2.new(center.x + size.x / 2, center.y + size.y / 2);
    const bottomLeft = Vec2.new(center.x - size.x / 2, center.y - size.y / 2);
    const bottomRight = Vec2.new(center.x + size.x / 2, center.y - size.y / 2);
    const thicknessX = Vec2.new(BOUNDS_THICKNESS, 0);
    const thicknessY = Vec2.new(0, BOUNDS_THICKNESS);

    this._colliders = [
      new AABBCollider(topLeft.sub(thicknessX).add(thicknessY), bottomLeft.sub(thicknessY)),
      new AABBCollider(topRight.add(thicknessY), bottomRight.add(thicknessX).sub(thicknessY)),
      new AABBCollider(topLeft.add(thicknessY), topRight),
      new AABBCollider(bottomLeft, bottomRight.add(thicknessY)),
    ];
  }

  // Get the collider.
  public override get collider(): Collider {
    return new GroupCollider(this._colliders);
  }

  // Draw the bounds.
  public override draw(renderer: Renderer): void {
    for (const collider of this._colliders)
      renderer.drawBox(
          collider.start.add(collider.end).div(2), collider.end.sub(collider.start).abs().div(2), 0, BOUNDS_COLOR);
  }
}