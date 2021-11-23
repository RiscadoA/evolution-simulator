import {Form} from './form';
import {Input} from './input';

/**
 * Represents a chain of forms.
 */
export class FormChain {
  /** The forms in the chain. */
  private _forms: Form[];

  /** The index of the current form in the chain. */
  private _currentIndex: number;

  /** The on cancel callback. */
  private _onCancelCallback: () => void;

  /** The on submit callback. */
  private _onSubmitCallback: () => void;

  /**
   * @param forms The forms in the chain.
   */
  public constructor(forms: Form[]) {
    this._forms = forms;
    this._currentIndex = -1;
    this._onCancelCallback = () => {};
    this._onSubmitCallback = () => {};

    // Set callbacks for each form.
    for (let i = 0; i < this._forms.length; i++) {
      const form = this._forms[i];

      form.setOnSubmit(() => {
        if (i == this._forms.length - 1) {
          this._currentIndex = -1;
          this._onSubmitCallback();
        } else
          this._forms[i + 1].visible = true;
      });

      form.setOnCancel(() => {
        if (i == 0) {
          this._currentIndex = -1;
          this._onCancelCallback();
        } else
          this._forms[i - 1].visible = true;
      });
    }
  }

  /**
   * Creates a new form chain from an element.
   * @param element The element.
   * @return The form chain.
   */
  public static fromElement(element: Element): FormChain|null {
    if (!(element instanceof HTMLDivElement) || !element.classList.contains('form-chain')) return null;

    // Get all forms on the form chain.
    const forms = Form.fromChildren(element).map(([_, f]) => f);
    if (forms.length === 0) return null;
    return new FormChain(forms);
  }

  /**
   * Creates a new form chain from a query selector to find the element.
   * @param selector The query selector.
   * @return The form chain.
   */
  public static fromSelector(selector: string): FormChain|null {
    const root = document.querySelector('body>div#forms');
    if (!root) throw new Error('Couldn\'t find forms root element.');
    const element = root.querySelector(selector) as HTMLDivElement;
    if (element)
      return FormChain.fromElement(element);
    else
      return null;
  }

  /**
   * Checks if the form chain is visible.
   */
  public get visible(): boolean {
    return this._currentIndex !== -1;
  }

  /**
   * Skips to the next form in the chain, by submitting the current form.
   */
  public skip() {
    if (this._currentIndex !== -1) this._forms[this._currentIndex].submit();
  }

  /**
   * Sets the visibility of the form chain.
   */
  public set visible(value: boolean) {
    if (value && this._currentIndex === -1) {
      this._currentIndex = 0;
      this._forms[this._currentIndex].visible = true;
    } else if (!value && this._currentIndex !== -1) {
      this._forms[this._currentIndex].visible = false;
      this._currentIndex = -1;
    }
  }

  /**
   * Gets an input from the form chain.
   * @param name The name of the input.
   * @return The input.
   */
  public get<T>(name: string): Input<T>|null {
    for (const form of this._forms) {
      const input = form.get(name);
      if (input !== null) return input as Input<T>;
    }
    return null;
  }

  /**
   * Gets an iterator over the inputs on the form chain.
   */
  public get inputs(): IterableIterator<[string, Input<any>]> {
    return this._forms.flatMap(form => Array.from(form.inputs)).values();
  }

  /**
   * Sets the on cancel callback.
   * @param callback The callback.
   */
  public setOnCancel(callback: () => void) {
    this._onCancelCallback = callback;
  }

  /**
   * Sets the on submit callback.
   * @param callback The callback.
   */
  public setOnSubmit(callback: () => void) {
    this._onSubmitCallback = callback;
  }
}