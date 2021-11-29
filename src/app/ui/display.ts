/**
 * Used to display a single value.
 */
export class Display {
  /** Display root element. */
  private _element: HTMLElement;

  /** Display DOM element. */
  private _display: HTMLElement;

  /**
   * @param element DOM element to display value in.
   */
  public constructor(element: HTMLElement) {
    this._element = element;
    this._display = this._element.querySelector('span')!;
  }

  /**
   * Creates a display from a DOM element.
   * @param element DOM element to display value in.
   * @returns Display instance.
   */
  public static fromElement(element: HTMLElement): Display|null {
    if (element.classList.contains('display'))
      return new Display(element);
    else
      return null;
  }

  /**
   * Creates a display from a query selector.
   * @param root Root element to search from.
   * @param selector Query selector to find display in.
   * @returns Display instance.
   */
  public static fromSelector(root: HTMLElement, selector: string): Display|null {
    const element = root.querySelector(selector);
    if (element && element instanceof HTMLDivElement)
      return Display.fromElement(element);
    else
      return null;
  }

  /**
   * Sets the value to display.
   */
  public set value(value: number) {
    this._display.innerText = value.toString();
  }

  /**
   * Gets the value to display.
   */
  public get value(): number {
    return parseFloat(this._display.innerText);
  }

  /**
   * Sets the display's visibility.
   */
  public set visible(visible: boolean) {
    this._element.classList.toggle('hidden', !visible);
  }

  /**
   * Gets the display's visibility.
   */
  public get visible(): boolean {
    return !this._element.classList.contains('hidden');
  }
}