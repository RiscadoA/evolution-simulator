import {Input} from './input';

type SliderType = 'exponential'|'linear'|'integer';

/**
 * Implements an input slider.
 */
export class Slider extends Input<number> {
  /** The track element. */
  private _track: HTMLDivElement;

  /** The thumb wrapper element. */
  private _thumbWrapper: HTMLDivElement;

  /** The thumb element. */
  private _thumb: HTMLButtonElement;

  /** The input element. */
  private _input: HTMLInputElement;

  /** The minimum value. */
  private _min: number;

  /** The maximum value. */
  private _max: number;

  /** The step value. */
  private _step: number;

  /** The digits shown. */
  private _digits: number;

  /** The slider's type. */
  private _type: SliderType;

  /** Is the mouse down? */
  private _mouseDown: boolean;

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
    let initial = parseFloat(element.getAttribute('initial') ?? '50');
    if (initial !== initial) initial = 50;
    let digits = parseInt(element.getAttribute('digits') ?? '2');
    if (digits > 3) digits = 3;
    const type = element.getAttribute('type') ?? 'linear';
    if (type != 'exponential' && type != 'linear' && type != 'integer') throw new Error(`Invalid slider type: ${type}`);

    if (type === 'exponential' && min <= 0)
      throw new Error('Exponential sliders must have a minimum value greater than 0.');

    // Initialize properties.
    super(initial);
    this._min = min;
    this._max = max;
    this._step = step;
    this._digits = digits;
    this._type = type;
    this._mouseDown = false;

    // Init track and thumb.
    this._track = element.querySelector('div') as HTMLDivElement;
    this._thumbWrapper = this._track.querySelector('div') as HTMLDivElement;
    this._thumb = this._thumbWrapper.querySelector('button') as HTMLButtonElement;
    this._thumb.addEventListener('mousedown', () => this._mouseDown = true);
    document.addEventListener('mouseup', () => this._mouseDown = false);
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (this._mouseDown) {
        const rect = this._track.getBoundingClientRect();
        const delta = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

        if (this._type == 'exponential')
          this.value = this._min * Math.pow(10, delta * Math.log10(this._max / this._min));
        else if (this._type == 'linear')
          this.value = this._min + delta * (this._max - this._min);
        else if (this._type == 'integer')
          this.value = Math.round(this._min + delta * (this._max - this._min));
      }
    });

    // Init input element.
    this._input = element.querySelector('input') as HTMLInputElement;
    this._input.setAttribute('min', this._min.toString());
    this._input.setAttribute('min', this._max.toString());
    this._input.setAttribute('step', this._step.toString());
    this._input.addEventListener('change', () => this.value = this._input.valueAsNumber);

    this.updateDisplay();
  }

  /**
   * Creates a new slider from an element.
   * @param element The element.
   * @returns The slider.
   */
  public static fromElement(element: Element): Slider|null {
    if (element instanceof HTMLDivElement && element.classList.contains('slider'))
      return new Slider(element);
    else
      return null;
  }

  /**
   * Creates a new slider from a query selector to find the element.
   * @param root The root element.
   * @param selector The query selector.
   * @returns The slider.
   */
  public static fromSelector(root: Element, selector: string): Slider|null {
    const element = root.querySelector(selector);
    if (element)
      return Slider.fromElement(element);
    else
      return null;
  }

  /**
   * Creates new sliders from the children of a root element.
   * @param root The root element.
   * @returns The sliders.
   */
  public static fromChildren(root: Element): [string, Slider][] {
    return Array.from(root.children)
               .map(e => [e.id, Slider.fromElement(e)])
               .filter(([_, s]) => s !== null) as [string, Slider][];
  }

  // Validate the value.
  protected override validate(value: number): number {
    // Fix to step.
    if (this._type === 'exponential')
      value = Math.pow(10, Math.round(Math.log10(value) / this._step) * this._step);
    else
      value = Math.round(value / this._step) * this._step;
    if (this._type === 'integer') value = Math.round(value);
    return Math.max(this._min, Math.min(this._max, value));
  }

  // Update the slider display.
  protected override updateDisplay(): void {
    let delta;
    if (this._type === 'exponential')
      delta = Math.log10(this.value / this._min) / Math.log10(this._max / this._min);
    else
      delta = (this.value - this._min) / (this._max - this._min);

    if (this._type === 'integer')
      this._input.valueAsNumber = this.value;
    else if (this.value > Math.pow(10.0, -1 - this._digits) && this.value < Math.pow(10.0, 6 - this._digits) || this.value == 0)
      this._input.value = this.value.toFixed(this._digits);
    else if (this._digits === 0)
      this._input.value = this.value.toExponential(0);
    else
      this._input.value = this.value.toExponential(this._digits);
    this._thumbWrapper.style.transform = `translateX(${delta * 100}%)`;
  }
}