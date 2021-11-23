import {Mat3, Vec2} from '../math';

/**
 * Represents a camera used to render a scene.
 */
export class Camera {
  /** The camera's position. */
  private _position: Vec2;

  /** The camera's zoom. */
  private _zoom: number;

  /** The screen's aspect ratio. */
  private _aspectRatio: number;

  /** The camera's transform matrix. */
  private _matrix: Mat3;

  /**
   * @param position The camera's position.
   * @param zoom The camera's zoom.
   * @param aspectRatio The screen's aspect ratio.
   */
  public constructor(position: Vec2, zoom: number, aspectRatio: number) {
    this._position = position.clone();
    this._zoom = zoom;
    this._aspectRatio = aspectRatio;
    this.updateMatrix();
  }

  /**
   * Gets the camera's position.
   */
  public get position(): Vec2 {
    return this._position.clone();
  }

  /**
   * Sets the camera's position.
   */
  public set position(value: Vec2) {
    this._position = value.clone();
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
   * Gets the screen's aspect ratio.
   */
  public get aspectRatio(): number {
    return this._aspectRatio;
  }

  /**
   * Sets the screen's aspect ratio.
   */
  public set aspectRatio(value: number) {
    this._aspectRatio = value;
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
   */
  public worldToScreen(point: Vec2): Vec2 {
    return point.apply(this._matrix);
  }

  /**
   * Converts a point from screen coordinates to world coordinates.
   */
  public screenToWorld(point: Vec2): Vec2 {
    return point.apply(this._matrix.inverse());
  }

  /**
   * Updates the camera's transform matrix.
   */
  private updateMatrix(): void {
    const translation = Mat3.translation(this._position);
    const scale = Mat3.scale(Vec2.new(this._zoom * this._aspectRatio, this._zoom));
    this._matrix = translation.mul(scale);
  }
}
