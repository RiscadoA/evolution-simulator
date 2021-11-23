import {Renderer} from '../gl';
import {Color, Vec2} from '../math';
import {StaticBody} from './body';
import {CircleCollider, Collider} from './collider';

/** The food radius. */
const FOOD_RADIUS = 0.02;

/** The food color. */
const FOOD_COLOR = Color.new(0.2, 0.9, 0.4);

/**
 * Represents a bullet.
 */
export class Food extends StaticBody {
  /**
   * @param position The position of the food.
   */
  public constructor(position: Vec2) {
    super(position);
  }

  /**
   * Gets the collider used.
   */
  public override get collider(): Collider {
    return new CircleCollider(this.position, FOOD_RADIUS);
  }

  /**
   * Draws the bullet.
   * @param renderer The renderer used to draw the bullet.
   */
  public override draw(renderer: Renderer): void {
    renderer.drawCircle(this.position, FOOD_RADIUS, FOOD_COLOR);
  }
}
