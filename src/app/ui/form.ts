import {Button} from './button';
import {Input} from './input';
import {Range} from './range';
import {Slider} from './slider';
import {Switch} from './switch';
import {Toggle} from './toggle';

/**
 * Represents a form.
 */
export class Form {
  /** The form element. */
  private _element: HTMLDivElement;

  /** The inputs on the form. */
  private _inputs: Map<string, Input<any>>;

  /** The cancel button. */
  private _cancelButton: Button|null;

  /** The submit button. */
  private _submitButton: Button;

  /** The on cancel callback. */
  private _onCancelCallback: () => void;

  /** The on submit callback. */
  private _onSubmitCallback: () => void;

  /**
   * @param element The form element.
   * @param inputs The inputs on the form.
   */
  public constructor(element: HTMLDivElement, inputs: Map<string, Input<any>>) {
    this._element = element;
    this._inputs = inputs;
    this._cancelButton = Button.fromSelector(this._element, 'button#cancel');
    const submit = Button.fromSelector(this._element, 'button#submit');
    if (!submit) throw new Error('Submit button not found on form.');
    this._submitButton = submit;
    this._onCancelCallback = () => {};
    this._onSubmitCallback = () => {};
    if (this._cancelButton) this._cancelButton.addOnClickCallback(this.cancel.bind(this));
    this._submitButton.addOnClickCallback(this.submit.bind(this));
  }

  /**
   * Creates a new form from an element.
   * @param element The element.
   * @return The form.
   */
  public static fromElement(element: Element): Form|null {
    if (!(element instanceof HTMLDivElement) || !element.classList.contains('form')) return null;

    // Get all inputs on the form.
    const inputs = new Map<string, Input<any>>();
    Range.fromChildren(element).forEach(([id, r]) => inputs.set(id, r));
    Slider.fromChildren(element).forEach(([id, s]) => inputs.set(id, s));
    Switch.fromChildren(element).forEach(([id, s]) => inputs.set(id, s));
    Toggle.fromChildren(element).forEach(([id, t]) => inputs.set(id, t));
    return new Form(element, inputs);
  }

  /**
   * Creates a new form from a query selector to find the element.
   * @param selector The query selector.
   * @return The form.
   */
  public static fromSelector(selector: string): Form|null {
    const root = document.querySelector('body>div#forms');
    if (!root) throw new Error('Couldn\'t find forms root element.');
    const element = root.querySelector(selector) as HTMLDivElement;
    if (element)
      return Form.fromElement(element);
    else
      return null;
  }

  /**
   * Creates new forms from the children of a root element.
   * @param root The root element.
   * @returns The forms.
   */
  public static fromChildren(root: Element): [string, Form][] {
    return Array.from(root.children)
               .map(e => [e.id, Form.fromElement(e)])
               .filter(t => t[1] !== null) as [string, Form][];
  }

  /**
   * Sets the callback for when the form is canceled.
   * @param callback The callback.
   */
  public setOnCancel(callback: () => void): void {
    this._onCancelCallback = callback;
  }

  /**
   * Sets the callback for when the form is submitted.
   * @param callback The callback.
   */
  public setOnSubmit(callback: () => void): void {
    this._onSubmitCallback = callback;
  }

  /**
   * Checks if the form is visible.
   */
  public get visible(): boolean {
    return !this._element.classList.contains('hidden');
  }

  /**
   * Sets the visibility of the form.
   */
  public set visible(value: boolean) {
    this._element.classList.toggle('hidden', !value);
  }

  /**
   * Cancels the form.
   */
  public cancel(): void {
    this.visible = false;
    this._onCancelCallback();
  }

  /**
   * Submits the form.
   */
  public submit(): void {
    this.visible = false;
    this._onSubmitCallback();
  }

  /**
   * Gets an input from the form.
   * @param name The name of the input.
   * @return The input.
   */
  public get(name: string): Input<any>|null {
    return this._inputs.get(name) ?? null;
  }

  /**
   * Gets an iterator over the inputs on the form.
   */
  public get inputs(): IterableIterator<[string, Input<any>]> {
    return this._inputs.entries();
  }
}
