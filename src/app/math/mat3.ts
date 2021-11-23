import {Vec2} from './vec2';

/**
 * Represents a row-major 3x3 matrix.
 */
export class Mat3 {
  /** The matrix elements. */
  public elements: Float32Array;

  /**
   * @param elements The matrix elements.
   */
  public constructor(...elements: number[]) {
    if (elements.length !== 9) throw new Error('Invalid Mat3 elements array size, must be 9');
    this.elements = new Float32Array(elements);
  }

  /**
   * Creates a new matrix from the given elements.
   * @param elements The matrix elements.
   * @returns The new matrix.
   */
  public static new(...elements: number[]): Mat3 {
    return new Mat3(...elements);
  }

  /**
   * Creates a new identity matrix.
   * @returns The new identity matrix.
   */
  public static identity(): Mat3 {
    return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
  }

  /**
   * Creates a new translation matrix.
   * @param vec The translation vector.
   * @returns The new translation matrix.
   */
  public static translation(vec: Vec2): Mat3 {
    return new Mat3(1, 0, 0, 0, 1, 0, vec.x, vec.y, 1);
  }

  /**
   * Creates a new rotation matrix.
   * @param angle The angle in radians.
   * @returns The new rotation matrix.
   */
  public static rotation(angle: number): Mat3 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new Mat3(c, s, 0, -s, c, 0, 0, 0, 1);
  }

  /**
   * Creates a new scaling matrix.
   * @param vec The scaling vector.
   * @returns The new scaling matrix.
   */
  public static scale(vec: Vec2): Mat3;

  /**
   * Creates a new scaling matrix.
   * @param factor The scaling factor.
   * @returns The new scaling matrix.
   */
  public static scale(factor: number): Mat3;

  // Implementation
  public static scale(v: Vec2|number): Mat3 {
    if (v instanceof Vec2)
      return new Mat3(v.x, 0, 0, 0, v.y, 0, 0, 0, 1);
    else
      return new Mat3(v, 0, 0, 0, v, 0, 0, 0, 1);
  }

  /**
   * Clones this matrix.
   * @returns The clone.
   */
  public clone(): Mat3 {
    return new Mat3(...Array.from(this.elements));
  }

  /**
   * Multiplies this matrix with another matrix.
   * @param other The other matrix.
   * @returns The result.
   */
  public mul(other: Mat3): Mat3;

  /**
   * Multiplies this matrix by a scalar.
   * @param scalar Scalar to multiply by.
   * @returns The result.
   */
  public mul(other: number): Mat3;

  // Implementation.
  public mul(other: Mat3|number): Mat3 {
    const a = this.elements;
    const c = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (other instanceof Mat3) {
      // Matrix multiplication.
      const b = other.elements;
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          for (let k = 0; k < 3; k++) c[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j];
    } else {
      // Scalar multiplication.
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) c[i * 3 + j] = a[i * 3 + j] * other;
    }

    return new Mat3(...c);
  }

  /**
   * Calculates the determinant of this matrix.
   * @returns The determinant.
   */
  public det(): number {
    const a = this.elements;
    let det = 0.0;
    det += a[0] * a[4] * a[8] + a[1] * a[5] * a[6] + a[2] * a[3] * a[7];
    det -= a[2] * a[4] * a[6] + a[1] * a[3] * a[8] + a[0] * a[5] * a[7];
    return det;
  }

  /**
   * Calculates the transpose of this matrix.
   * @returns The transpose.
   */
  public transpose(): Mat3 {
    const a = this.elements;
    const c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) c[i * 3 + j] = a[j * 3 + i];
    return new Mat3(...c);
  }

  /**
   * Calculates the cofactor matrix of this matrix.
   * @returns The cofactor matrix.
   */
  public cofactor(): Mat3 {
    const a = this.elements;
    const c = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        const sign = (i + j) % 2 == 0 ? 1 : -1;
        c[i * 3 + j] = sign * a[j * 3 + (i + 1) % 3] * a[(i + 2) * 3 + j];
      }
    return new Mat3(...c);
  }

  /**
   * Calculates the inverse of this matrix.
   * @returns The inverse.
   */
  public inverse(): Mat3 {
    const det = this.det();
    if (det == 0) throw new Error(`Can't find the inverse of the matrix because its determinant is zero`);
    const cof = this.cofactor();
    return cof.transpose().mul(1 / det);
  }
}
