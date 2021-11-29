import {Vec2} from '../math';

/**
 * Represents a collision manifold.
 */
export class Manifold {
  /** The normal of the collision. */
  public normal: Vec2;

  /** The penetration depth of the collision. */
  public penetration: number;

  /**
   * @param normal The normal of the collision.
   * @param penetration The penetration depth of the collision.
   */
  public constructor(normal: Vec2, penetration: number) {
    this.normal = normal;
    this.penetration = penetration;
  }
}

/**
 * Represents a generic collider.
 */
export interface Collider {
  /**
   * Checks if the collider is colliding with another collider.
   * @param other The other collider.
   * @returns Collision manifold if colliding, otherwise null.
   */
  colliding(other: Collider): Manifold|null;
}

/**
 * Represents a circle collider.
 */
export class CircleCollider implements Collider {
  /** The position of the circle. */
  public position: Vec2;

  /** The radius of the circle. */
  public radius: number;

  /**
   * @param position The position of the circle.
   * @param radius The radius of the circle.
   */
  public constructor(position: Vec2, radius: number) {
    this.position = position;
    this.radius = radius;
  }

  // Collision detection.
  public colliding(other: Collider): Manifold|null {
    if (other instanceof CircleCollider) {  // Circle vs Circle
      const offset = other.position.sub(this.position);
      const distanceSquared = offset.lengthSquared();
      const radiusSum = this.radius + other.radius;

      // Check if the circles are colliding
      if (distanceSquared > radiusSum * radiusSum) return null;

      // Get the collision manifold
      const normal = offset.normalize();
      const penetration = radiusSum - Math.sqrt(distanceSquared);
      return new Manifold(normal, penetration);
    } else {
      const manifold = other.colliding(this);
      manifold?.normal.mul(-1.0);
      return manifold;
    }
  }
}

/**
 * Represents a AABB collider.
 */
export class AABBCollider implements Collider {
  /** The top left corner of the rectangle. */
  public start: Vec2;

  /** The bottom right corner of the rectangle. */
  public end: Vec2;

  /**
   * @param start The top right corner of the rectangle.
   * @param end The bottom left corner of the rectangle.
   */
  public constructor(start: Vec2, end: Vec2) {
    this.start = start.max(end);
    this.end = start.min(end);
  }

  // Collision detection.
  public colliding(other: Collider): Manifold|null {
    if (other instanceof AABBCollider) {
      // AABB vs AABB
      throw new Error('AABB vs AABB not implemented');
    } else if (other instanceof CircleCollider) {
      // AABB vs Circle
      const halfExtents = this.start.sub(this.end).div(2);
      const center = this.start.add(this.end).div(2);
      const clamped = other.position.sub(center).clamp(halfExtents.mul(-1), halfExtents);
      const closest = clamped.add(center);
      const offset = closest.sub(other.position);
      if (offset.lengthSquared() > other.radius * other.radius) return null;
      const normal = offset.normalize();
      const penetration = other.radius - offset.length();
      return new Manifold(normal, penetration);
    } else {
      const manifold = other.colliding(this);
      manifold?.normal.mul(-1.0);
      return manifold;
    }
  }
}

/**
 * Group of colliders.
 */
export class GroupCollider implements Collider {
  /** The colliders in the group. */
  private _colliders: Collider[];

  /**
   * @param colliders The colliders in the group.
   */
  public constructor(colliders: Collider[]) {
    this._colliders = colliders;
  }

  // Collision detection.
  public colliding(other: Collider): Manifold|null {
    for (const collider of this._colliders) {
      const manifold = collider.colliding(other);
      if (manifold) return manifold;
    }
    return null;
  }
}
