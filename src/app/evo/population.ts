import {Genome} from './gene';
import {Genotype} from './genotype';

// Number of elite genotypes to keep.
const ELITE_COUNT = 2;

/**
 * Represents a population of genotypes.
 */
export class Population {
  /** The genotypes in the population. */
  private _genotypes: Genotype[];

  /**
   * @param genes The population's genome.
   * @param genotypeCount The genotype count.
   */
  public constructor(genome: Genome, genotypeCount: number) {
    this._genotypes = new Array(genotypeCount).map(() => Genotype.random(genome));
  }

  /**
   * Gets the population's genotypes.
   */
  public get genotypes(): Genotype[] {
    return this._genotypes;
  }

  /**
   * Iterates a new generation of genotypes.
   * @param eliteCount The number of elite genotypes to keep.
   * @param mutationRate The gene mutation rate.
   */
  public iterate(eliteCount: number = ELITE_COUNT, mutationRate: number): void {
    // Rank old genotypes by their fitness.
    const oldGenotypes = this._genotypes.sort((a, b) => b.fitness - a.fitness);

    // Keep the best genotypes.
    const newGenotypes: Genotype[] = oldGenotypes.slice(0, eliteCount);

    // Used to choose the parents of the next generation.
    const chooseParent = (): Genotype => {
      const index = Math.floor(Math.random() ** 2 * oldGenotypes.length);
      return oldGenotypes[index];
    };

    // Create new genotypes by crossing over old ones.
    while (newGenotypes.length < oldGenotypes.length)
      newGenotypes.push(chooseParent().crossover(chooseParent()).mutate(mutationRate));
    this._genotypes = newGenotypes;
  }
}
