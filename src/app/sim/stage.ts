import {Genome, Population} from '../evo';
import {CommandQueue} from '../gl';
import {Color, Vec2} from '../math';
import {CircleCollider} from './collider';
import {Creature} from './creature';
import {Food} from './food';

/** The simulation time step. */
export const TIME_STEP = 1.0 / 30.0;

/** The boundaries radius. */
export const BOUNDARY_RADIUS = 12.0;
export const BOUNDARY_THICKNESS = 0.05;

/**
 * The settings for the stage.
 */
export class StageSettings {
  public population: number;
  public mutationRate: number;
  public eyeCount: number;
  public minExtraNeuronCount: number;
  public maxExtraNeuronCount: number;
  public minConnectionCount: number;
  public maxConnectionCount: number;
  public initialFoodCount: number;
  public newFoodRate: number;
  public roundDuration: number;
};

/**
 * Represents the simulation's stage, where the creatures are tested.
 */
export class Stage {
  /** The stage settings. */
  private _settings: StageSettings;

  /** The genome of the creatures. */
  private _genome: Genome;

  /** The population of creatures. */
  private _population: Population;

  /** The creatures in the stage. */
  private _creatures: Creature[];

  /** The food in the simulation. */
  private _food: Food[];

  /** The amount of food to generate. */
  private _newFoodAccumulator: number;

  /** The time that has passed since the beginning of the round. */
  private _time: number;

  /**
   * @param settings The settings for the stage.
   */
  public constructor(settings: StageSettings) {
    this._settings = settings;
    this._genome = new Genome(
        Creature.getNeuronCount(settings.eyeCount, settings.minExtraNeuronCount),
        Creature.getNeuronCount(settings.eyeCount, settings.maxExtraNeuronCount), settings.minConnectionCount,
        settings.maxConnectionCount);
    this._population = Population.random(this._genome, settings.population, settings.mutationRate);

    this._creatures = [];
    this._food = [];

    // Start the first round.
    this.startRound();
  }

  /**
   * Starts a new round.
   */
  public startRound(): void {
    if (this._creatures.length !== 0) {
      // Select the best creatures from the previous round.
      let fitness = this._creatures.map(creature => creature.fitness);
      let parents = this._population.select(fitness);
      this._population = this._population.breed(parents);
    }

    // Create the creatures.
    this._creatures = this._population.genotypes.map(genotype => {
      let position = this.randomPosition(Creature.Radius);
      let color = Color.random();
      return new Creature(this._settings.eyeCount, genotype, position, position, color);
    });

    // Create the food.
    this._food = [];
    for (let i = 0; i < this._settings.initialFoodCount; i++)
      this._food.push(new Food(this.randomPosition(Food.Radius)));
    this._newFoodAccumulator = 0;
    this._time = 0;
  }

  /**
   * Updates the stage.
   * @returns Whether the round is over.
   */
  public update(): boolean {
    // Check if the round ended.
    if (this._food.length === 0 || this._time > this._settings.roundDuration) {
      for (const creature of this._creatures) creature.velocity = Vec2.ZERO;
      return true;
    }

    this._time += TIME_STEP;

    // Add new food.
    this._newFoodAccumulator += TIME_STEP * this._settings.newFoodRate;
    while (this._newFoodAccumulator >= 1) {
      this._newFoodAccumulator -= 1;
      this._food.push(new Food(this.randomPosition(Food.Radius)));
    }

    // Update the creatures.
    this._creatures.forEach(creature => creature.update(this.getClosestFood(creature.position), TIME_STEP));
    this._creatures.forEach(creature => creature.position = creature.position.add(creature.velocity.mul(TIME_STEP)));

    // Test for collisions between creatures and the bounds.
    this._creatures.forEach(creature => {
      if (creature.position.lengthSquared() > (BOUNDARY_RADIUS - Creature.Radius) ** 2) {
        creature.position = creature.position.normalize();
        creature.velocity = creature.velocity.reflect(creature.position);
        creature.position = creature.position.mul(BOUNDARY_RADIUS - Creature.Radius);
      }
    });

    // Test for collisions between creatures and food.
    this._creatures.forEach(creature => {
      for (let i = this._food.length - 1; i >= 0; i--)
        if (creature.collider.colliding(this._food[i].collider)) {
          creature.fitness += 1;
          this._food.splice(i, 1);
        }
    });

    // Round is not over.
    return false;
  }

  /**
   * Draws the stage.
   * @param queue The command queue to draw to.
   */
  public draw(queue: CommandQueue): void {
    queue.drawCircle(Vec2.ZERO, BOUNDARY_RADIUS + BOUNDARY_THICKNESS, Color.new(0.0, 0.0, 0.0));
    queue.drawCircle(Vec2.ZERO, BOUNDARY_RADIUS, Color.new(0.3, 0.6, 0.9));
    this._food.forEach(food => food.draw(queue));
    this._creatures.forEach(creature => creature.draw(queue));
  }

  /**
   * Picks a creature from a position.
   * @param position The position to pick from.
   * @returns The creature, or null if none was found.
   */
  public pickCreature(position: Vec2): Creature|null {
    for (const creature of this._creatures)
      if (creature.collider.colliding(new CircleCollider(position, 0.00001))) return creature;
    return null;
  }

  /**
   * Gets the best creature in the stage.
   * @returns The best creature, or null if none was found.
   */
  public getBestCreature(): Creature|null {
    if (this._creatures.length === 0) return null;
    let best = this._creatures[0];
    for (const creature of this._creatures)
      if (creature.fitness > best.fitness) best = creature;
    return best;
  }

  /**
   * Generates a random position within the stage.
   * @param radius The minimum distance from the edge.
   * @return The random position.
   */
  private randomPosition(radius: number): Vec2 {
    const distance = Math.sqrt(Math.random() * (BOUNDARY_RADIUS - radius) ** 2);
    const angle = Math.random() * Math.PI * 2;
    return Vec2.fromAngle(angle).mul(distance);
  }

  /**
   * Gets the closest food to a position.
   * @param position The position.
   * @return The closest food.
   */
  private getClosestFood(position: Vec2): Food|null {
    let closestFood: Food|null = null;
    let closestDistance = Infinity;
    this._food.forEach(food => {
      const distance = position.sub(food.position).length();
      if (distance < closestDistance) {
        closestFood = food;
        closestDistance = distance;
      }
    });
    return closestFood;
  }
}
