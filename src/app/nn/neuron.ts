import {Gene, Genome} from '../evo';

/** Represents a neural network layer. */
export type Layer = Neuron[];

/**
 * Represents a neural network neuron.
 */
export class Neuron {
  /** The neuron's input weights. */
  public weights: number[];

  /** The neuron's bias. */
  public bias: number;

  /** The neuron's output value. */
  public output: number;

  /**
   * Initializes the neuron.
   * @param numInputs The number of inputs.
   */
  public constructor(numInputs: number) {
    this.weights = new Array(numInputs).fill(0);
    this.bias = 0;
  }

  /**
   * Creates the genome representation of a neuron.
   * @param numInputs The number of inputs.
   * @returns The genome representation.
   */
  public static createGenome(numInputs: number): Genome {
    // Create the genome.
    const genome: Genome = [];

    // Add the bias and weights.
    genome.push(new Gene(-1, 1));
    for (let i = 0; i < numInputs; i++) genome.push(new Gene(-1, 1));

    return genome;
  }

  /**
   * Creates a new neuron from a genotype.
   * @param numInputs Number of neuron inputs.
   * @param values Genotype values to create the neuron from.
   */
  public static fromGenotype(numInputs: number, values: Iterator<number>): Neuron {
    // Create the neuron and set its bias.
    const neuron = new Neuron(numInputs);
    neuron.bias = values.next().value;

    // Set the neuron's weights.
    for (let i = 0; i < numInputs; i++) neuron.weights[i] = values.next().value;
    return neuron;
  }

  /**
   * Updates the neuron's output value.
   * @param inputs The previous layer's neurons.
   */
  public update(inputs: Layer): void {
    this.output = this.bias;
    for (let i = 0; i < inputs.length; i++) this.output += inputs[i].output * this.weights[i];
    this.output = this.sigmoid(this.output);
  }

  /**
   * Sigmoid activation function.
   * @param x The input value.
   * @returns The output value.
   */
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }
}