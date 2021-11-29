import {CommandQueue} from '../gl';
import {Vec2} from '../math';

import {Collider} from './collider';

/**
 * Represents a physics body.
 */
export abstract class Body {
  /** The position of the body. */
  private _position: Vec2;

  /**
   * @param position The position of the body.
   */
  public constructor(position: Vec2) {
    this._position = position;
  }

  /**
   * Gets the position of the body.
   */
  public get position(): Vec2 {
    return this._position;
  }

  /**
   * Sets the position of the body.
   */
  public set position(position: Vec2) {
    this._position = position;
  }

  /**
   * Gets the collider used.
   */
  public abstract get collider(): Collider;

  /**
   * Draws the body.
   * @param queue The command queue to draw to.
   */
  public abstract draw(queue: CommandQueue): void;
}

/**
 * Represents a kinematic body.
 */
export abstract class KinematicBody extends Body {
  /** The velocity of the body. */
  private _velocity: Vec2;

  /**
   * @param position The position of the body.
   * @param velocity The velocity of the body.
   * @param mass The mass of the body.
   */
  public constructor(position: Vec2, velocity: Vec2) {
    super(position);
    this._velocity = velocity;
  }

  /**
   * Gets the velocity of the body.
   */
  public get velocity(): Vec2 {
    return this._velocity;
  }

  /**
   * Sets the velocity of the body.
   */
  public set velocity(velocity: Vec2) {
    this._velocity = velocity;
  }
}

/**
 * Represents a static body.
 */
export abstract class StaticBody extends Body {
  /**
   * @param position The position of the body.
   */
  public constructor(position: Vec2) {
    super(position);
  }
}
