import {CommandQueue} from '../gl';
import {Color, Vec2} from '../math';
import {Connection} from './connection';

/**
 * Neural network implementation.
 */
export class Network {
  /** Neural network neurons. */
  private _neurons: number[];

  /** Input neurons. */
  private _inputs: number[];

  /** Output neurons. */
  private _outputs: number[];

  /** Neural network swap neurons. */
  private _swapNeurons: number[];

  /** Neural network connections. */
  private _connections: Connection[];

  /**
   * @param neuronCount Number of neurons in the network.
   * @param connections The connections in the network.
   */
  public constructor(neuronCount: number, connections: Connection[]) {
    this._neurons = new Array(neuronCount).fill(0);
    this._swapNeurons = new Array(neuronCount).fill(0);
    this._connections = connections;
    this._inputs = [];
    this._outputs = [];
  }

  /**
   * Sets the value of a neuron.
   * @param index Index of the neuron to set.
   * @param value Value to set the neuron to.
   */
  public set(index: number, value: number): void {
    this._neurons[index] = value;
  }

  /**
   * Gets the value of a neuron.
   * @param index Index of the neuron to get.
   * @returns Neuron value.
   */
  public get(index: number): number {
    return this._neurons[index];
  }

  /**
   * Marks a neuron as an input for drawing.
   * @param index Index of the neuron to mark as an input.
   */
  public markInput(index: number): void {
    this._inputs.push(index);
  }

  /**
   * Marks a neuron as an output for drawing.
   * @param index Index of the neuron to mark as an output.
   */
  public markOutput(index: number): void {
    this._outputs.push(index);
  }

  /**
   * Resets the network.
   */
  public reset(): void {
    this._neurons.fill(0);
  }

  /**
   * Updates the network's neurons.
   */
  public update(): void {
    for (let i = 0; i < this._connections.length; i++) this._connections[i].update(this._neurons, this._swapNeurons);
    for (let i = 0; i < this._neurons.length; i++) {
      this._neurons[i] = Network.sigmoid(this._swapNeurons[i]);
      this._swapNeurons[i] = 0;
    }
  }

  /**
   * Draws the neural network.
   * @param queue Command queue to draw the network with.
   * @param translation Where to draw the network.
   * @param velocity Velocity of the network.
   * @param scale The scale to draw the network at.
   */
  public draw(queue: CommandQueue, translation: Vec2, velocity: Vec2, scale: number): void {
    const CIRCLE_RADIUS = scale * 0.5;
    const NEURON_RADIUS = scale * 0.1;
    const CONNECTION_THICKNESS = NEURON_RADIUS * 1;

    // Draw all connections in the network.
    for (let i = 0; i < this._connections.length; i++) {
      const connection = this._connections[i];
      const from = translation.add(Vec2.new(
          Math.cos(connection.source / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS),
          Math.sin(connection.source / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS)));
      const to = translation.add(Vec2.new(
          Math.cos(connection.target / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS) ,
          Math.sin(connection.target / this._neurons.length * Math.PI * 2) * (CIRCLE_RADIUS - NEURON_RADIUS)));
      const color = connection.weight > 0 ? Color.black().mix(Color.new(1, 0, 0), connection.weight / 10) :
                                            Color.new(0, 0, 1).mix(Color.black(), -connection.weight / 10);
      queue.drawMovingArrow(from, to, CONNECTION_THICKNESS, color, velocity, velocity);
    }

    // Draw all neurons in the network.
    for (let i = 0; i < this._neurons.length; i++) {
      const position = translation.add(Vec2.new(
          Math.cos(i / this._neurons.length * Math.PI * 2) * CIRCLE_RADIUS,
          Math.sin(i / this._neurons.length * Math.PI * 2) * CIRCLE_RADIUS));
      const color = Color.black().mix(Color.white(), this._neurons[i]);
      let borderColor;
      if (this._inputs.indexOf(i) >= 0)
        borderColor = Color.new(0, 1, 0);
      else if (this._outputs.indexOf(i) >= 0)
        borderColor = Color.new(0, 0, 1);
      else
        borderColor = Color.new(1, 1, 1);
      queue.drawMovingCircle(position, NEURON_RADIUS, borderColor, velocity);
      queue.drawMovingCircle(position, NEURON_RADIUS * 0.9, color, velocity);
    }
  }

  /**
   * The sigmoid function.
   * @param x Value to apply the sigmoid function to.
   * @returns The sigmoid value of the input.
   */
  private static sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }
}
