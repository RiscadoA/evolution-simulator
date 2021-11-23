import {Genome} from './gene';

/**
 * Represents an instance of a genome, which can be mutated and crossed over with other genotypes.
 */
export class Genotype {
  /** The fitness of this genotype. */
  public fitness: number;

  /** The genome of this genotype. */
  private _genome: Genome;

  /** The gene values. */
  private _values: number[];

  /**
   * @param genome The genome of this genotype.
   * @param values The gene values.
   */
  private constructor(genome: Genome, values: number[]) {
    this._genome = genome;
    this._values = values;
  }

  /**
   * Creates a new random genotype.
   * @param genome The genome of this genotype.
   * @returns A new random genotype.
   */
  public static random(genome: Genome): Genotype {
    const values = genome.map(gene => gene.random());
    return new Genotype(genome, values);
  }

  /**
   * Gets the genome of this genotype.
   */
  public get genome(): Genome {
    return this._genome;
  }

  /**
   * Gets the a gene value.
   * @param index The index of the gene.
   * @returns The gene value.
   */
  public get(index: number): number {
    return this._values[index];
  }

  /**
   * Returns an iterator over the gene values.
   * @returns An iterator over the gene values.
   */
  public values(): Iterator<number> {
    return this._values.values();
  }

  /**
   * Mutates this genotype.
   * @param rate The mutation rate.
   * @returns The mutated genotype.
   */
  public mutate(rate: number): Genotype {
    const values = this._values.map((value, index) => Math.random() < rate ? this._genome[index].random() : value);
    return new Genotype(this._genome, values);
  }

  /**
   * Crosses over with this genotype another genotype, and returns the result.
   * @param other The other genotype.
   * @returns The result of crossing over.
   */
  public crossover(other: Genotype): Genotype {
    if (this.genome != other.genome) throw new Error('Genotypes must have the same genome to be crossed over.');
    const values = this._values.map((value, index) => this._genome[index].crossover(value, other._values[index]));
    return new Genotype(this._genome, values);
  }
}