/**
 * Represents a draw command.
 */
export interface Command {
  /**
   * Interpolates the command to the given time.
   * @param dt The time difference to interpolate.
   */
  interpolate(dt: number): Command;
}
