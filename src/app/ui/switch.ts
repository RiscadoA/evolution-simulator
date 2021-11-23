import {Input} from './input';
import {Toggle} from './toggle';

/**
 * Represents a set of UI toggles, of which only one can be activated at a time.
 */
export class Switch extends Input<string> {
  /** The toggles. */
  private _toggles: Map<string, Toggle>;

  /** Does the switch allow no state? */
  private _noneState: string|undefined;

  /**
   * @param toggles The switch toggles.
   * @param initialState The initial state.
   * @param noneState The state to use when no toggle is activated. If undefined, no state won't be allowed.
   */
  public constructor(toggles: Map<string, Toggle>, initialState: string, noneState: string|undefined = undefined) {
    super(initialState);

    if (toggles.size === 0) throw new Error('A switch cannot be empty, toggles must be specified.');
    this._toggles = toggles;
    this._noneState = noneState;

    // Initialize toggles.
    this._toggles.forEach((toggle, state) => {
      // Set the initial state.
      toggle.value = state === this.value;

      // Add the callback.
      toggle.addOnValueChangedCallback(value => {
        if (value)
          this.value = state;
        else if (this.value === state && this._noneState !== undefined)
          this.value = this._noneState;
        else if (this.value === state)
          toggle.value = true;  // Since no state isn't allowed, we need to activate the toggle.
      });
    });
  }

  /**
   * Creates a new switch from an element.
   * @param element The element.
   * @return The switch.
   */
  public static fromElement(element: Element): Switch|null {
    if (!(element instanceof HTMLDivElement) || !element.classList.contains('switch')) return null;
    const toggles = Toggle.fromChildren(element);
    const noneState = (element.getAttribute('none-state') ?? undefined);
    const initialState = (element.getAttribute('initial') ?? noneState);
    if (initialState === undefined) throw new Error('If no initial state is specified, none-state must be specified.');
    return new Switch(new Map(toggles), initialState, noneState);
  }

  /**
   * Creates a new switch from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @return The switch.
   */
  public static fromSelector(root: Element, selector: string): Switch|null {
    const element = root.querySelector(selector);
    if (element)
      return Switch.fromElement(element);
    else
      return null;
  }

  /**
   * Creates new switches from the children of a root element.
   * @param root The root element.
   * @returns The switches.
   */
  public static fromChildren(root: Element): [string, Switch][] {
    return Array.from(root.children)
               .filter(e => e instanceof HTMLDivElement && e.classList.contains('switch'))
               .map(e => [e.id, Switch.fromElement(e as HTMLDivElement)])
               .filter(([_, s]) => s !== null) as [string, Switch][];
  }

  // Validate the state.
  protected override validate(state: string): string {
    return state;
  }

  // Updates the display of the switch.
  protected override updateDisplay() {
    this._toggles.forEach((toggle, state) => toggle.value = state === this.value);
  }
}