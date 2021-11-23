import {Button} from './button';
import {Input} from './input';

/**
 * Represents a UI button that toggles a boolean value.
 */
export class Toggle extends Input<boolean> {
  /** The UI button that toggles the value. */
  private _button: Button;

  /**
   * @param button The UI button that toggles the value.
   * @param initial The initial value.
   */
  public constructor(button: Button, initial: boolean) {
    super(initial);

    this._button = button;
    this._button.addOnClickCallback(() => this.value = !this.value);

    this.updateDisplay();
  }

  /**
   * Creates a new toggle from an element.
   * @param element The element.
   * @return The toggle.
   */
  public static fromElement(element: Element): Toggle|null {
    if (!element.classList.contains('toggle')) return null;
    const button = Button.fromElement(element);
    if (button == null) return null;

    // Get the properties from the attributes.
    const initial = element.classList.contains('activated');
    return new Toggle(button, initial);
  }

  /**
   * Creates a new toggle from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @return The toggle.
   */
  public static fromSelector(root: Element, selector: string): Toggle|null {
    const element = root.querySelector(selector);
    if (element)
      return Toggle.fromElement(element);
    else
      return null;
  }

  /**
   * Creates new toggles from the children of a root element.
   * @param root The root element.
   * @returns The toggles.
   */
  public static fromChildren(root: Element): [string, Toggle][] {
    return Array.from(root.children)
               .map(e => [e.id, Toggle.fromElement(e)])
               .filter(([_, t]) => t !== null) as [string, Toggle][];
  }

  // Validates the value.
  protected override validate(value: boolean): boolean {
    return value;
  }

  // Updates the button display.
  protected override updateDisplay() {
    this._button.element.classList.toggle('activated', this.value);
  }
}