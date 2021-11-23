import {Genome} from '../evo';
import {Layer, Neuron} from './neuron';

/**
 * Neural network implementation.
 */
export class Network {
  /** Neural network layers. */
  private _layers: Layer[];

  /**
   * @param topology Neural network topology (number of neurons in each layer).
   */
  public constructor(topology: number[]) {
    this._layers = topology.map((s, l) => new Array(s).map(() => new Neuron(l === 0 ? 0 : topology[l - 1])));
  }

  /**
   * Creates the genome representation of a neural network.
   * @param topology Neural network topology (number of neurons in each layer).
   * @returns The genome representation.
   */
  public static createGenome(topology: number[]): Genome {
    // Create the genome.
    const genome: Genome = [];

    // Add the genome representation of each neuron.
    for (let i = 0; i < topology.length; i++)
      for (let j = 0; j < topology[i]; j++) genome.push(...Neuron.createGenome(i === 0 ? 0 : topology[i - 1]));

    return genome;
  }

  /**
   * Creates a new neural network from a genotype.
   * @param topology Neural network topology (number of neurons in each layer).
   * @param values Genotype values to create the network from.
   */
  public static fromGenotype(topology: number[], values: Iterator<number>): Network {
    const network = new Network(topology);

    // Read the genome representation of each neuron.
    for (let i = 0; i < topology.length; i++)
      for (let j = 0; j < topology[i]; j++)
        network._layers[i][j] = Neuron.fromGenotype(i === 0 ? 0 : topology[i - 1], values);

    return network;
  }

  /**
   * Sets one of the network's inputs.
   * @param index Index of the input to set.
   * @param value Value to set.
   */
  public setInput(index: number, value: number): void {
    this._layers[0][index].output = value;
  }

  /**
   * Gets one of the network's outputs.
   * @param index Index of the output to get.
   * @returns Output value.
   */
  public getOutput(index: number): number {
    return this._layers[this._layers.length - 1][index].output;
  }

  /**
   * Updates the network's output.
   */
  public update(): void {
    for (let i = 1; i < this._layers.length; i++)
      for (let j = 0; j < this._layers[i].length; j++) this._layers[i][j].update(this._layers[i - 1]);
  }
}
