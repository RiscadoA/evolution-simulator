import {Connection} from './connection';
import {Genome} from './genome';

/**
 * Represents an instance of a genome, which can be mutated and crossed over with other genotypes.
 */
export class Genotype {
  /** The genome of this genotype. */
  private _genome: Genome;

  /** The neuron count of this genotype. */
  private _neuronCount: number;

  /** The connections of this genotype. */
  private _connections: Connection[];

  /**
   * @param genome The genome of this genotype.
   * @param neuronCount The neuron count of this genotype.
   * @param connections The connections of this genotype.
   */
  private constructor(genome: Genome, neuronCount: number, connections: Connection[]) {
    this._genome = genome;
    this._neuronCount = neuronCount;
    this._connections = connections;
  }

  /**
   * Creates a new random genotype.
   * @param genome The genome of this genotype.
   * @returns A new random genotype.
   */
  public static random(genome: Genome): Genotype {
    let neuronCount =
        Math.round(Math.random() * (genome.maxNeuronCount - genome.minNeuronCount)) + genome.minNeuronCount;
    let connectionCount =
        Math.round(Math.random() * (genome.maxConnectionCount - genome.minConnectionCount)) + genome.minConnectionCount;
    let connections = new Array<Connection|null>(connectionCount).fill(null).map(() => Connection.random(neuronCount));
    return new Genotype(genome, neuronCount, connections);
  }

  /**
   * Gets the genome of this genotype.
   */
  public get genome(): Genome {
    return this._genome;
  }

  /**
   * Gets the neuron count of this genotype.
   */
  public get neuronCount(): number {
    return this._neuronCount;
  }

  /**
   * Gets the connections of this genotype.
   */
  public get connections(): Connection[] {
    return this._connections;
  }

  /**
   * Mutates this genotype.
   * @param rate The mutation rate.
   * @returns The mutated genotype.
   */
  public mutate(rate: number): Genotype {
    let neuronCount = this.neuronCount;

    // Change the neuron count.
    if (Math.random() < rate) {
      let delta = Math.random() < 0.5 ? 1 : -1;
      let newNeuronCount = this.neuronCount + delta;
      if (newNeuronCount >= this.genome.minNeuronCount && newNeuronCount <= this.genome.maxNeuronCount)
        neuronCount = newNeuronCount;
    }

    // Change the connections.
    let connections = this.connections
                          .map(connection => {
                            if (Math.random() < rate)
                              return Connection.random(neuronCount);
                            else if (Math.random() < rate / this.connections.length)
                              return null;  // Remove the connection.
                            else if (connection.source < neuronCount && connection.target < neuronCount)
                              return connection;
                            else
                              return null;
                          })
                          .filter(connection => connection !== null) as Connection[];
    // Add a connection.
    if (connections.length < this.genome.maxConnectionCount && Math.random() < rate)
      connections.push(Connection.random(neuronCount));

    return new Genotype(this._genome, neuronCount, connections);
  }
}