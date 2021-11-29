import {Genotype, Network} from '../evo';
import {CommandQueue} from '../gl';
import {Color, Mat3, Vec2} from '../math';

import {KinematicBody} from './body';
import {CircleCollider, Collider} from './collider';
import {Food} from './food';

/** Radius of a creature. */
const CREATURE_RADIUS = 0.05;

/** The movement speed. */
const MOVEMENT_SPEED = 1.0;

/** The rotation speed. */
const ROTATION_SPEED = 5.0;

/**
 * Represents a creature in the simulation.
 */
export class Creature extends KinematicBody {
  /** The creature's radius. */
  public static readonly Radius = CREATURE_RADIUS;

  /** The creature's fitness. */
  public fitness: number;

  /** The creature's genotype. */
  private _genotype: Genotype;

  /** The creature's color. */
  private _color: Color;

  /** The creature's eye angles. */
  private _eyes: number[];

  /** The neural network of the creature. */
  private _nn: Network;

  /** The forward direction of the creature. */
  private _forward: Vec2;

  /** The rotation velocity of the creature. */
  private _rotationVelocity: number;

  /**
   * @param eyeCount The number of eyes.
   * @param genotype The genotype of the creature.
   * @param position The position of the creature.
   * @param forward The forward direction of the creature.
   * @param color The color of the creature.
   */
  public constructor(eyeCount: number, genotype: Genotype, position: Vec2, forward: Vec2, color: Color) {
    super(position, Vec2.ZERO);
    this._genotype = genotype;
    this._nn = new Network(genotype.neuronCount, genotype.connections);
    for (let i = 0; i < eyeCount; i++)
      this._nn.markInput(i);
    this._nn.markOutput(eyeCount);
    this._nn.markOutput(eyeCount + 1);
    this._forward = forward.normalize();
    this._color = color.clone();
    this.fitness = 0;

    // Set the eye angles.
    this._eyes = [];
    if (eyeCount == 1)
      this._eyes = [0];
    else if (eyeCount == 2)
      this._eyes = [-Math.PI / 4, Math.PI / 4];
    else if (eyeCount == 3)
      this._eyes = [-Math.PI / 3, 0, Math.PI / 3];
  }

  /**
   * Gets the number of neurons of the creature's neural network.
   * @param eyeCount The number of eyes.
   * @param extraNeuronCount The number of extra neurons.
   * @returns The topology of a creature's neural network.
   */
  public static getNeuronCount(eyeCount: number, extraNeuronCount: number): number {
    return eyeCount + extraNeuronCount + 2;
  }

  /**
   * Updates the creature.
   * @param nearestFood The nearest food.
   * @param dt The time step.
   */
  public update(nearestFood: Food|null, dt: number): void {
    // Update the creature's neural network inputs.
    for (let i = 0; i < this._eyes.length; i++) {
      const eye = this._forward.apply(Mat3.rotation(this._eyes[i])).normalize();
      let distance = 0;
      if (nearestFood === null)
        distance = Infinity;
      else
        distance = nearestFood.position.sub(this.position.add(eye)).length();
      this._nn.set(i, distance);
    }

    // Update the creature's neural network outputs.
    this._nn.update();

    // Update the creature's velocity and rotate it.
    const dir = this._nn.get(this._eyes.length) > this._nn.get(this._eyes.length + 1) ? -1 : 1;
    this._rotationVelocity = dir * ROTATION_SPEED;
    this._forward = this._forward.apply(Mat3.rotation(this._rotationVelocity * dt));
    this.velocity = this._forward.mul(MOVEMENT_SPEED);
  }

  /**
   * Gets the genome of the creature.
   */
  public get genotype(): Genotype {
    return this._genotype;
  }

  /**
   * Gets the neural network of the creature.
   */
  public get nn(): Network {
    return this._nn;
  }

  // Gets the creature's collider.
  public override get collider(): Collider {
    return new CircleCollider(this.position, CREATURE_RADIUS);
  }

  // Draw the creature.
  public override draw(queue: CommandQueue): void {
    for (let i = 0; i < this._eyes.length; i++) {
      const eyeDir = this._forward.apply(Mat3.rotation(this._eyes[i]));
      const eyeNextDir = this._forward.apply(Mat3.rotation(this._eyes[i] - this._rotationVelocity));
      const eye = this.position.add(eyeDir.mul(CREATURE_RADIUS * 2));
      const eyeNext = this.position.add(eyeNextDir.mul(CREATURE_RADIUS * 2));
      const eyeVelocity = this.velocity.add(eyeNext.sub(eye));
      queue.drawMovingLine(
          this.position, eye, CREATURE_RADIUS * 4, this._color.mix(Color.black(), 0.2), this.velocity, eyeVelocity);
      queue.drawMovingCircle(eye, CREATURE_RADIUS * 0.25, this._color.mix(Color.black(), 0.2), eyeVelocity);
    }

    queue.drawMovingCircle(this.position, CREATURE_RADIUS, this._color, this.velocity);
  }
}
