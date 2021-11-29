/**
 * Represents a neural network connection between two neurons.
 */
export class Connection {
  /** The amplitude of the weights of the connections. */
  public static readonly WeightAmplitude: number = 10;

  /** The connection's weight. */
  private _weight: number;

  /** The connection's source neuron. */
  private _source: number;

  /** The connection's target neuron. */
  private _target: number;

  /**
   * @param weight The connection's denormalized weight.
   * @param source The connection's source neuron.
   * @param target The connection's target neuron.
   */
  public constructor(weight: number, source: number, target: number) {
    this._weight = Connection.normalizeWeight(weight);
    this._source = source;
    this._target = source === target ? (source > 0 ? source - 1 : 1) : target;
  }

  /**
   * Updates the connection.
   * @param inputs The input neurons.
   * @param outputs The output neurons.
   */
  public update(inputs: number[], outputs: number[]): void {
    outputs[this._target] += inputs[this._source] * this._weight;
  }

  /**
   * Gets the connection's source neuron.
   */
  public get source(): number {
    return this._source;
  }

  /**
   * Gets the connection's target neuron.
   */
  public get target(): number {
    return this._target;
  }

  /**
   * Gets the connection's weight.
   */
  public get weight(): number {
    return this._weight;
  }

  /**
   * Creates a random connection.
   * @param neuronCount Number of neurons in the network.
   * @returns A random connection.
   */
  public static random(neuronCount: number): Connection {
    return new Connection(
        Math.floor(Math.random() * 65536), Math.floor(Math.random() * neuronCount),
        Math.floor(Math.random() * neuronCount));
  }

  /**
   * Creates a connection from a 32 bits number.
   * @param u32 The 32 bits number to create the connection from.
   * @returns The connection.
   */
  public static fromU32(u32: number): Connection {
    return new Connection(Connection.normalizeWeight(u32 >> 16), (u32 >> 8) & 0xFF, u32 & 0xFF);
  }

  /**
   * Converts the connection to 32 bits number.
   * @returns The connection as 32 bits number.
   */
  public toU32(): number {
    return (Connection.denormalizeWeight(this._weight) << 16) | (this._source << 8) | this._target;
  }

  /**
   * Normalizes the connection's weight.
   * @param weight The denormalized connection's weight.
   * @returns The normalized connection's weight.
   */
  private static normalizeWeight(weight: number): number {
    weight = Math.min(Math.max(weight, 0), 65535);
    return ((weight / 65535) * 2.0 - 1.0) * Connection.WeightAmplitude;
  }

  /**
   * Denormalizes the connection's weight.
   * @param weight The normalized connection's weight.
   * @returns The denormalized connection's weight.
   */
  private static denormalizeWeight(weight: number): number {
    return ((weight / this.WeightAmplitude) + 1.0) * 65535;
  }
}