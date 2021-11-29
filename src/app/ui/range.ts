import {Input} from './input';

type RangeType = 'integer';

/**
 * Implements an input range.
 */
export class Range extends Input<[number, number]> {
  /** The track element. */
  private _track: HTMLDivElement;

  /** The left thumb wrapper element. */
  private _leftThumbWrapper: HTMLDivElement;

  /** The left thumb element. */
  private _leftThumb: HTMLButtonElement;

  /** The right thumb wrapper element. */
  private _rightThumbWrapper: HTMLDivElement;

  /** The right thumb element. */
  private _rightThumb: HTMLButtonElement;

  /** The display element. */
  private _display: HTMLElement;

  /** The minimum value. */
  private _min: number;

  /** The maximum value. */
  private _max: number;

  /** The step value. */
  private _step: number;

  /** The range's type. */
  private _type: RangeType;

  /** Is the mouse down? */
  private _mouseDown: 'left'|'right'|null;

  /**
   * @param element The DOM element that represents the slider.
   */
  public constructor(element: HTMLDivElement) {
    // Get attributes.
    let min = parseFloat(element.getAttribute('min') ?? '1');
    if (min !== min) min = 1;
    let max = parseFloat(element.getAttribute('max') ?? '100');
    if (max !== max) max = 100;
    [min, max] = [Math.min(min, max), Math.max(min, max)];
    let step = parseFloat(element.getAttribute('step') ?? '1');
    if (step !== step) step = 1;
    const type = element.getAttribute('type') ?? 'integer';
    if (type != 'integer') throw new Error(`Invalid range type: ${type}`);

    // Initialize properties.
    super([min, max]);
    this._min = min;
    this._max = max;
    this._step = step;
    this._type = type;
    this._mouseDown = null;

    // Init track and thumb.
    this._track = element.querySelector('div') as HTMLDivElement;
    this._leftThumbWrapper = this._track.querySelector('div.left') as HTMLDivElement;
    this._leftThumb = this._leftThumbWrapper.querySelector('button') as HTMLButtonElement;
    this._leftThumb.addEventListener('mousedown', () => this._mouseDown = 'left');
    this._rightThumbWrapper = this._track.querySelector('div.right') as HTMLDivElement;
    this._rightThumb = this._rightThumbWrapper.querySelector('button') as HTMLButtonElement;
    this._rightThumb.addEventListener('mousedown', () => this._mouseDown = 'right');

    document.addEventListener('mouseup', () => this._mouseDown = null);
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (this._mouseDown === 'left') {
        const rect = this._track.getBoundingClientRect();
        const delta = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (this._type === 'integer')
          this.value =
              [Math.min(Math.round(this._min + delta * (this._max - this._min)), this.value[1]), this.value[1]];
      } else if (this._mouseDown === 'right') {
        const rect = this._track.getBoundingClientRect();
        const delta = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (this._type === 'integer')
          this.value =
              [this.value[0], Math.max(this.value[0], Math.round(this._min + delta * (this._max - this._min)))];
      }
    });

    // Init input element.
    this._display = element.querySelector('span#display') as HTMLElement;
    this.updateDisplay();
  }

  /**
   * Creates a new range from an element.
   * @param element The element.
   * @returns The range.
   */
  public static fromElement(element: Element): Range|null {
    if (element instanceof HTMLDivElement && element.classList.contains('range'))
      return new Range(element);
    else
      return null;
  }

  /**
   * Creates a new range from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @returns The slider.
   */
  public static fromSelector(root: Element, selector: string): Range|null {
    const element = root.querySelector(selector);
    if (element)
      return Range.fromElement(element);
    else
      return null;
  }

  /**
   * Creates new sliders from the children of a root element.
   * @param root The root element.
   * @returns The sliders.
   */
  public static fromChildren(root: Element): [string, Range][] {
    return Array.from(root.children)
               .map(e => [e.id, Range.fromElement(e)])
               .filter(([_, s]) => s !== null) as [string, Range][];
  }

  // Validate the value.
  protected override validate(value: [number, number]): [number, number] {
    // Fix to step.
    value = [Math.round(value[0] / this._step) * this._step, Math.round(value[1] / this._step) * this._step];
    if (this._type === 'integer') value = [Math.round(value[0]), Math.round(value[1])];
    value = [Math.max(this._min, value[0]), Math.max(value[0], Math.min(this._max, value[1]))];
    return value;
  }

  // Update the range display.
  protected override updateDisplay(): void {
    if (this._type === 'integer') this._display.innerText = this.value.join(' - ');
    let delta = this.value.map(v => (v - this._min) / (this._max - this._min));
    this._leftThumbWrapper.style.transform = `translateX(${delta[0] * 100}%)`;
    this._rightThumbWrapper.style.transform = `translateX(${delta[1] * 100}%)`;
  }
}