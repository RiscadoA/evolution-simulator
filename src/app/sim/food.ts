import {CommandQueue} from '../gl';
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
  /** The food's radius. */
  public static readonly Radius = FOOD_RADIUS;

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

  // Draws the food.
  public override draw(queue: CommandQueue): void {
    queue.drawCircle(this.position, FOOD_RADIUS, FOOD_COLOR);
  }
}
