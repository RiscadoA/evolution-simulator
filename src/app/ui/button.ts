/**
 * Represents a UI button.
 */
export class Button {
  /** The DOM element that represents the button. */
  protected readonly _element: HTMLButtonElement;

  /** The on click callbacks. */
  private _onClick: Set<() => void>;

  /**
   * @param element The DOM element that represents the button.
   */
  private constructor(element: HTMLButtonElement) {
    this._element = element;
    this._onClick = new Set<() => void>();
    this._element.addEventListener('click', () => {
      this._onClick.forEach(callback => callback());
    });
  }

  /**
   * Creates a new button from an element.
   * @param element The element.
   * @return The button.
   */
  public static fromElement(element: Element): Button|null {
    if (element instanceof HTMLButtonElement)
      return new Button(element);
    else
      return null;
  }

  /**
   * Creates a new button from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @return The button.
   */
  public static fromSelector(root: Element, selector: string): Button|null {
    const element = root.querySelector(selector);
    if (element)
      return Button.fromElement(element);
    else
      return null;
  }

  /**
   * Adds a callback to the on click callback set.
   * @param callback The callback to add.
   */
  public addOnClickCallback(callback: () => void): void {
    this._onClick.add(callback);
  }

  /**
   * Removes a callback from the on click callback set.
   * @param callback The callback to remove.
   */
  public removeOnClickCallback(callback: () => void): void {
    this._onClick.delete(callback);
  }

  /**
   * Clears the on click callback set.
   */
  public clearOnClickCallbacks(): void {
    this._onClick.clear();
  }

  /**
   * Gets the DOM element that represents the button.
   */
  public get element(): HTMLButtonElement {
    return this._element;
  }
}