/**
 * Represents a single gene in a genome.
 */
export class Gene {
  /** The gene's minimum value. */
  private _min: number;

  /** The gene's maximum value. */
  private _max: number;

  /**
   * @param min The gene's minimum value.
   * @param max The gene's maximum value.
   */
  public constructor(min: number, max: number) {
    if (min > max)
      throw new Error('Gene creation failed: the minimum value must be less than or equal to the maximum value');
    this._min = min;
    this._max = max;
  }

  /**
   * Gets the gene's minimum value.
   */
  public get min(): number {
    return this._min;
  }

  /**
   * Gets the gene's maximum value.
   */
  public get max(): number {
    return this._max;
  }

  /**
   * Gets a random gene value for this gene.
   * @returns The random gene value.
   */
  public random(): number {
    return this._min + Math.random() * (this._max - this._min);
  }

  /**
   * Crosses over two values of this gene.
   * @param v1 First value.
   * @param v2 Second value.
   * @returns The crossed over value.
   */
  public crossover(v1: number, v2: number): number {
    const u1 = Math.min(Math.max(v1, this._min), this._max);
    const u2 = Math.min(Math.max(v2, this._min), this._max);
    return u1 + (u2 - u1) * Math.random();
  }
}

/**
 * Represents a genome.
 */
export type Genome = Gene[];
