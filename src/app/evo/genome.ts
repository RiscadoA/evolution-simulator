/**
 * Represents a genome.
 */
export class Genome {
  /** The genome's minimum neuron count. */
  private _minNeuronCount: number;

  /** The genome's maximum neuron count. */
  private _maxNeuronCount: number;

  /** The genome's minimum connection count. */
  private _minConnectionCount: number;

  /** The genome's maximum connection count. */
  private _maxConnectionCount: number;

  /**
   * @param minNeuronCount The genome's minimum neuron count.
   * @param maxNeuronCount The genome's maximum neuron count.
   * @param minConnectionCount The genome's minimum connection count.
   * @param maxConnectionCount The genome's maximum connection count.
   */
  public constructor(minNeuronCount: number, maxNeuronCount: number, minConnectionCount: number, maxConnectionCount: number) {
    if (minNeuronCount > maxNeuronCount)
      throw new Error('Genome creation failed: the minimum neuron count must be less than or equal to the maximum neuron count');
    if (minConnectionCount > maxConnectionCount)
      throw new Error('Genome creation failed: the minimum connection count must be less than or equal to the maximum connection count');

    this._minNeuronCount = minNeuronCount;
    this._maxNeuronCount = maxNeuronCount;
    this._minConnectionCount = minConnectionCount;
    this._maxConnectionCount = maxConnectionCount;
  }

  /**
   * Gets the genome's minimum neuron count.
   */
  public get minNeuronCount(): number {
    return this._minNeuronCount;
  }

  /**
   * Gets the genome's maximum neuron count.
   */
  public get maxNeuronCount(): number {
    return this._maxNeuronCount;
  }

  /**
   * Gets the genome's minimum connection count.
   */
  public get minConnectionCount(): number {
    return this._minConnectionCount;
  }

  /**
   * Gets the genome's maximum connection count.
   */
  public get maxConnectionCount(): number {
    return this._maxConnectionCount;
  }
}
