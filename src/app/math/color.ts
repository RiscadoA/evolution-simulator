/**
 * Represents a color.
 */
export class Color {
  /** The red component. */
  public r: number;

  /** The green component. */
  public g: number;

  /** The blue component. */
  public b: number;

  /** The alpha component. */
  public a: number;

  /**
   * @param r The red component.
   * @param g The green component.
   * @param b The blue component.
   * @param a The alpha component.
   */
  public constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * Creates a new color from the given RGBA values.
   * @param r The red component.
   * @param g The green component.
   * @param b The blue component.
   * @param a The alpha component.
   * @returns The new color.
   */
  public static new(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r, g, b, a);
  }

  /**
   * Creates a random color (fixed alpha).
   * @returns The new color.
   */
  public static random(): Color {
    return new Color(Math.random(), Math.random(), Math.random());
  }

  /**
   * Returns the black color.
   * @returns The black color.
   */
  public static black(): Color {
    return new Color(0, 0, 0);
  }

  /**
   * Returns the white color.
   * @returns The white color.
   */
  public static white(): Color {
    return new Color(1, 1, 1);
  }

  /**
   * Returns the transparent color.
   * @returns The transparent color.
   */
  public static transparent(): Color {
    return new Color(0, 0, 0, 0);
  }

  /**
   * Clones the color and returns the result.
   * @returns The cloned color.
   */
  public clone(): Color {
    return new Color(this.r, this.g, this.b, this.a);
  }

  /**
   * Adds the given color to this color and returns the result (fixed alpha).
   * @param other The color to add.
   * @returns The result.
   */
  public add(other: Color): Color {
    return new Color(this.r + other.r, this.g + other.g, this.b + other.b, this.a);
  }

  /**
   * Mixes the color with the given color and returns the result (fixed alpha).
   * @param min The minimum value.
   * @param max The maximum value.
   * @param delta The delta value.
   * @returns The mixed color.
   */
  public mix(other: Color, delta: number): Color {
    return new Color(
        this.r + (other.r - this.r) * delta, this.g + (other.g - this.g) * delta, this.b + (other.b - this.b) * delta,
        this.a);
  }

  /**
   * Clamps the color to the given range (fixed alpha).
   * @param min The minimum color.
   * @param max The maximum color.
   * @returns The clamped color.
   */
  public clamp(min: Color = Color.black(), max: Color = Color.white()): Color {
    return new Color(
        Math.max(min.r, Math.min(max.r, this.r)), Math.max(min.g, Math.min(max.g, this.g)),
        Math.max(min.b, Math.min(max.b, this.b)), Math.max(min.a, Math.min(max.a, this.a)));
  }
}
