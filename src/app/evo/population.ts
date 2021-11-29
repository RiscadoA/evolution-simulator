import {Genome} from './genome';
import {Genotype} from './genotype';

/**
 * Represents a population of genotypes.
 */
export class Population {
  /** The genome of the population. */
  private _genome: Genome;

  /** The genotypes in the population. */
  private _genotypes: Genotype[];

  /** The mutation rate. */
  private _mutationRate: number;

  /**
   * @param genome The genome of the population.
   * @param genotypes The genotypes of the population.
   * @param mutationRate The mutation rate.
   */
  public constructor(genome: Genome, genotypes: Genotype[], mutationRate: number) {
    if (genotypes.length % 2 !== 0) throw new Error('The number of genotypes in a population must be even.');
    this._genome = genome;
    this._genotypes = genotypes;
    this._mutationRate = mutationRate;
  }

  /**
   * Creates a new random population.
   * @param genome The genome of the population.
   * @param genotypeCount The number of genotypes in the population.
   * @param mutationRate The mutation rate.
   */
  public static random(genome: Genome, genotypeCount: number, mutationRate: number): Population {
    let genotypes = new Array<Genotype|null>(genotypeCount).fill(null).map(() => Genotype.random(genome));
    return new Population(genome, genotypes, mutationRate);
  }

  /**
   * Gets the population's genotypes.
   */
  public get genotypes(): Genotype[] {
    return this._genotypes;
  }

  /**
   * Selects the parents of the next generation.
   * @parma fitness The fitness of the population.
   * @returns The indices of the parents.
   */
  public select(fitness: number[]): number[] {
    let sortedFitness = fitness.map((f, i) => [f, i]).sort(([a, _1], [b, _2]) => b - a);
    let parents = new Array<number>(this._genotypes.length);
    for (let i = 0; i < parents.length / 2; i++) {
      parents[2 * i + 0] = sortedFitness[i][1];
      parents[2 * i + 1] = sortedFitness[i][1];
    }
    return parents;
  }

  /**
   * Creates a new population from this one, by making the genotypes reproduce.
   * @param parents The indices of the parents of the new population.
   * @returns A new population.
   */
  public breed(parents: number[]): Population {
    let newGenotypes = new Array<Genotype|null>(this._genotypes.length)
                           .fill(null)
                           .map((_, i) => this._genotypes[parents[i]].mutate(this._mutationRate));
    return new Population(this._genome, newGenotypes, this._mutationRate);
  }
}
