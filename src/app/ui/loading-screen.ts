/**
 * Loading screen implementation.
 */
export class LoadingScreen {
  /** The loading screen element. */
  private _element: HTMLElement;

  /**
   * @param element The loading screen element.
   */
  public constructor(element: HTMLElement) {
    this._element = element;
  }

  /**
   * Creates a new loading screen from a query selector.
   * @param selector The selector for the loading screen element.
   * @return The loading screen.
   */
  public static fromSelector(selector: string): LoadingScreen {
    const element = document.querySelector(selector) as HTMLElement;
    if (element === null) throw new Error('Loading screen element not found.');
    return new LoadingScreen(element);
  }

  /**
   * Checks if the the loading screen is visible.
   */
  public get loading(): boolean {
    return this._element.style.display === 'block';
  }

  /**
   * Shows or hides the loading screen.
   */
  public set loading(value: boolean) {
    if (value)
      this._element.style.display = 'block';
    else
      this._element.style.display = 'none';
  }
}