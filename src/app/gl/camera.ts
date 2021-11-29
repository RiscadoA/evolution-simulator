import {Mat3, Vec2} from '../math';

/**
 * Represents a camera used to render a scene.
 */
export class Camera {
  /** The camera's position. */
  private _position: Vec2;

  /** The camera's velocity. */
  public velocity: Vec2;

  /** The camera's zoom. */
  private _zoom: number;

  /** The canvas' width. */
  private _width: number;

  /** The canvas' height. */
  private _height: number;

  /** The camera's transform matrix. */
  private _matrix: Mat3;

  /**
   * @param position The camera's position.
   * @param zoom The camera's zoom.
   * @param width The canvas' width.
   * @param height The canvas' height.
   */
  public constructor(position: Vec2, zoom: number, width: number, height: number) {
    this._position = position;
    this.velocity = Vec2.ZERO;
    this._zoom = zoom;
    this._width = width;
    this._height = height;
    this.updateMatrix();
  }

  /**
   * Gets the camera's position.
   */
  public get position(): Vec2 {
    return this._position;
  }

  /**
   * Sets the camera's position.
   */
  public set position(value: Vec2) {
    this._position = value;
    this.updateMatrix();
  }

  /**
   * Gets the camera's zoom.
   */
  public get zoom(): number {
    return this._zoom;
  }

  /**
   * Sets the camera's zoom.
   */
  public set zoom(value: number) {
    this._zoom = value;
    this.updateMatrix();
  }

  /**
   * Sets the canvas' width.
   */
  public set width(value: number) {
    this._width = value;
    this.updateMatrix();
  }

  /**
   * Sets the canvas' height.
   */
  public set height(value: number) {
    this._height = value;
    this.updateMatrix();
  }

  /**
   * Gets the camera's transform matrix.
   */
  public get matrix(): Mat3 {
    return this._matrix.clone();
  }

  /**
   * Converts a point from world coordinates to screen coordinates.
   * @param point The point to convert.
   * @return The converted point.
   */
  public worldToScreen(point: Vec2): Vec2 {
    return point.apply(this._matrix);
  }

  /**
   * Converts a point from screen coordinates to world coordinates.
   * @param point The point to convert.
   * @return The converted point.
   */
  public screenToWorld(point: Vec2): Vec2 {
    return point.apply(this._matrix.inverse());
  }

  /**
   * Converts a point from canvas coordinates to world coordinates.
   * @param point The point to convert.
   * @return The converted point.
   */
  public canvasToWorld(point: Vec2): Vec2 {
    const normalized = Vec2.new(point.x / this._width, -point.y / this._height).mul(2.0).add(Vec2.new(-1, 1));
    return this.screenToWorld(normalized);
  }

  /**
   * Updates the camera's transform matrix.
   */
  private updateMatrix(): void {
    const translation = Mat3.translation(this._position.mul(-1));
    const scale = Mat3.scale(Vec2.new(this._zoom * this._height / this._width, this._zoom));
    this._matrix = translation.mul(scale);
  }
}
