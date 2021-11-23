import {Genome, Genotype} from '../evo';
import * as GL from '../gl';
import {Color, Mat3, Vec2} from '../math';
import * as NN from '../nn';

import {KinematicBody} from './body';
import {CircleCollider, Collider} from './collider';
import {Food} from './food';

/** Radius of a creature. */
const CREATURE_RADIUS = 0.1;

/** The movement speed. */
const MOVEMENT_SPEED = 0.5;

/** The rotation speed. */
const ROTATION_SPEED = 0.5;

/**
 * Represents a creature in the simulation.
 */
export class Creature extends KinematicBody {
  /** The creature's fitness. */
  public fitness: number;

  /** The creature's genotype. */
  private _genotype: Genotype;

  /** The creature's color. */
  private _color: Color;

  /** The creature's eye angles. */
  private _eyes: number[];

  /** The neural network of the creature. */
  private _nn: NN.Network;

  /** The forward direction of the creature. */
  private _forward: Vec2;

  /**
   * @param eyeCount The number of eyes.
   * @param hiddenLayerSize The size of the hidden layer.
   * @param genotype The genotype of the creature.
   * @param position The position of the creature.
   * @param forward The forward direction of the creature.
   * @param color The color of the creature.
   */
  public constructor(
      eyeCount: number, hiddenLayerSize: number, genotype: Genotype, position: Vec2, forward: Vec2, color: Color) {
    super(position, Vec2.zero());
    this._genotype = genotype;
    this._forward = forward.clone();
    this._color = color.clone();

    // Set the eye angles.
    this._eyes = [];
    if (eyeCount == 1)
      this._eyes = [0];
    else if (eyeCount == 2)
      this._eyes = [-Math.PI / 4, Math.PI / 4];
    else if (eyeCount == 3)
      this._eyes = [-Math.PI / 3, 0, Math.PI / 3];

    // Create the neural network from the genotype.
    const topology = Creature.getNNTopology(eyeCount, hiddenLayerSize);
    this._nn = NN.Network.fromGenotype(topology, this._genotype.values());
  }

  /**
   * Creates the genome of a creature.
   * @param eyeCount The number of eyes.
   * @param hiddenLayerSize The size of the hidden layer.
   * @returns The genome of a creature.
   */
  public static createGenome(eyeCount: number, hiddenLayerSize: number): Genome {
    return NN.Network.createGenome(Creature.getNNTopology(eyeCount, hiddenLayerSize));
  }

  /**
   * Gets the topology of a creature's neural network.
   * @param eyeCount The number of eyes.
   * @param hiddenLayerSize The size of the hidden layer.
   * @returns The topology of a creature's neural network.
   */
  private static getNNTopology(eyeCount: number, hiddenLayerSize: number): number[] {
    return [eyeCount, hiddenLayerSize, 1];
  }

  /**
   * Updates the creature.
   * @param nearestFood The nearest food.
   * @param dt The time step.
   */
  public update(nearestFood: Food, dt: number): void {
    // Update the creature's neural network inputs.
    for (let i = 0; i < this._eyes.length; i++) {
      const eye = this._forward.apply(Mat3.rotation(this._eyes[i]));
      const distance = nearestFood.position.sub(this.position.add(eye)).length();
      this._nn.setInput(i, distance);
    }

    // Update the creature's neural network outputs.
    this._nn.update();

    // Update the creature's velocity and rotate it.
    this.velocity = this._forward.mul(this._nn.getOutput(0));
    this._forward = this._forward.apply(Mat3.rotation(this._nn.getOutput(1) * dt));
  }

  // Gets the creature's collider.
  public override get collider(): Collider {
    return new CircleCollider(this.position, CREATURE_RADIUS);
  }

  // Draw the creature.
  public override draw(renderer: GL.Renderer): void {
    for (let i = 0; i < this._eyes.length; i++) {
      const eyeDir = this._forward.apply(Mat3.rotation(this._eyes[i])).normalize();
      const eye = this.position.add(eyeDir.mul(CREATURE_RADIUS * 1.5));
      renderer.drawLine(this.position, eye, 0.5, this._color.mix(Color.black(), 0.2));
    }

    renderer.drawCircle(this.position, CREATURE_RADIUS, this._color);
  }
}
