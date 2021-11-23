import {Mat3} from './mat3';

/**
 * Represents a row-major 2D vector.
 */
export class Vec2 {
  /** The x coordinate. */
  private _x: number;

  /** The y coordinate. */
  private _y: number;

  /**
   * @param x The x coordinate.
   * @param y The y coordinate.
   */
  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  /**
   * Gets the x coordinate.
   */
  public get x(): number {
    return this._x;
  }

  /**
   * Gets the y coordinate.
   */
  public get y(): number {
    return this._y;
  }

  /**
   * Creates a new vector.
   * @param x The x coordinate.
   * @param y The y coordinate.
   * @returns The new vector.
   */
  public static new(x: number, y: number): Vec2 {
    return new Vec2(x, y);
  }

  /**
   * Creates a new vector with zero coordinates.
   * @returns The new vector.
   */
  public static zero(): Vec2 {
    return new Vec2(0, 0);
  }

  /**
   * Creates a new vector from an angle.
   * @param angle The angle.
   * @returns The new vector.
   */
  public static fromAngle(angle: number): Vec2 {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  /**
   * Clones this vector.
   * @returns The cloned vector.
   */
  public clone(): Vec2 {
    return new Vec2(this._x, this._y);
  }

  /**
   * Adds another vector to this vector and returns the result.
   * @param other The other vector.
   * @returns The result.
   */
  public add(other: Vec2): Vec2 {
    return new Vec2(this._x + other._x, this._y + other._y);
  }

  /**
   * Subtracts another vector from this vector and returns the result.
   * @param other The other vector.
   * @returns The result.
   */
  public sub(other: Vec2): Vec2 {
    return new Vec2(this._x - other._x, this._y - other._y);
  }

  /**
   * Multiplies this vector by a scalar and returns the result.
   * @param scalar The scalar.
   * @returns The result.
   */
  public mul(scalar: number): Vec2 {
    return new Vec2(this._x * scalar, this._y * scalar);
  }

  /**
   * Divides this vector by a scalar and returns the result.
   * @param scalar The scalar.
   * @returns The result.
   */
  public div(scalar: number): Vec2 {
    return new Vec2(this._x / scalar, this._y / scalar);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   * @param other The other vector.
   * @returns The dot product.
   */
  public dot(other: Vec2): number {
    return this._x * other._x + this._y * other._y;
  }

  /**
   * Calculates the squared length of this vector.
   * @returns The squared length.
   */
  public lengthSquared(): number {
    return this.dot(this);
  }

  /**
   * Calculates the length of this vector.
   * @returns The length.
   */
  public length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * Normalizes this vector and returns the result.
   * @returns The result.
   */
  public normalize(): Vec2 {
    return this.div(this.length());
  }

  /**
   * Calculates the angle between this vector and another vector, or the angle between this vector and the x axis.
   * @param other The other vector.
   * @returns The angle.
   */
  public angle(other?: Vec2): number {
    if (other === undefined)
      return Math.atan2(this._y, this._x);
    else
      return Math.acos(this.dot(other) / (this.length() * other.length()));
  }

  /**
   * Calculates the perpendicular vector of this vector and returns the result.
   * @returns The result.
   */
  public perpendicular(): Vec2 {
    return new Vec2(-this._y, this._x);
  }

  /**
   * Multiplies this vector by a matrix.
   * @param mat The matrix.
   * @returns The result.
   */
  public apply(mat: Mat3): Vec2 {
    const a = mat.elements;
    const x = this._x;
    const y = this._y;
    return new Vec2(a[0] * x + a[3] * y + a[6], a[1] * x + a[4] * y + a[7]);
  }

  /**
   * Clamps this vector to a given range.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns The result.
   */
  public clamp(min: Vec2, max: Vec2): Vec2 {
    return new Vec2(Math.max(min.x, Math.min(max.x, this._x)), Math.max(min.y, Math.min(max.y, this._y)));
  }

  /**
   * Returns the absolute vector.
   * @returns The result.
   */
  public abs(): Vec2 {
    return new Vec2(Math.abs(this._x), Math.abs(this._y));
  }

  /**
   * Returns the vector with the maximum components.
   * @param other The other vector.
   * @returns The result.
   */
  public max(other: Vec2): Vec2 {
    return new Vec2(Math.max(this._x, other._x), Math.max(this._y, other._y));
  }

  /**
   * Returns the vector with the minimum components.
   * @param other The other vector.
   * @returns The result.
   */
  public min(other: Vec2): Vec2 {
    return new Vec2(Math.min(this._x, other._x), Math.min(this._y, other._y));
  }
}