import {Genotype} from '../evo';
import {Renderer} from '../gl';
import {Color, Vec2} from '../math';
import {Creature} from './creature';
import {Food} from './food';

/**
 * The settings for the stage.
 */
export type StageSettings = {
  population: number; mutationRate: number; eyeCount: number; hiddenLayerSize: number; initialFoodCount: number;
  newFoodRate: number;
  roundDuration: number;
};

/**
 * Represents the simulation's stage, where the creatures are tested.
 */
export class Stage {
  /** The creatures in the simulation. */
  private _creatures: Creature[];

  /** The food in the simulation. */
  private _food: Food[];

  /** The stage settings. */
  private _settings: StageSettings;

  /**
   * @param settings The settings for the stage.
   */
  public constructor(settings: StageSettings) {
    this._creatures = [];
    this._food = [];
    this._settings = settings;

    // Create the creatures.
    const genome = Creature.createGenome(settings.eyeCount, settings.hiddenLayerSize);
    for (let i = 0; i < settings.population; i++) {
      const genotype = Genotype.random(genome);
      const position = Vec2.new(Math.random() * 2 - 1, Math.random() * 2 - 1);
      const forward = Vec2.zero().sub(position);
      const color = Color.random();
      this._creatures.push(
          new Creature(this._settings.eyeCount, this._settings.hiddenLayerSize, genotype, position, forward, color));
    }
  }

  /**
   * Updates the stage.
   * @param dt The time step in seconds.
   */
  public update(dt: number): void {
    
  }

  /**
   * Draws the stage.
   * @param renderer The renderer to use.
   */
  public draw(renderer: Renderer): void {
    this._food.forEach(food => food.draw(renderer));
    this._creatures.forEach(creature => creature.draw(renderer));
  }
}
