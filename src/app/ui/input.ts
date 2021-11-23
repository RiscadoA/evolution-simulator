/**
 * Represents an input element which can be used to get a value from the user.
 * @tparam Type The type of the value.
 */
export abstract class Input<Type> {
  /** The current value. */
  private _value: Type;

  /** The on value changed callbacks. */
  private _onValueChanged: Set<(value: Type) => void>;

  /**
   * @param initial The initial value.
   */
  protected constructor(initial: Type) {
    this._value = initial;
    this._onValueChanged = new Set<(value: Type) => void>();
  }

  /**
   * Gets the value of the input.
   */
  public get value(): Type {
    return this._value;
  }

  /**
   * Sets the value of the input.
   */
  set value(value: Type) {
    const newValue = this.validate(value);
    this._value = newValue;
    this.updateDisplay();
    if (this._value !== newValue) this._onValueChanged.forEach(callback => callback(this._value));
  }

  /**
   * Validates the value of the input.
   * @param value The value to validate.
   * @return The validated value.
   */
  protected abstract validate(value: Type): Type;

  /**
   * Updates the display of the input.
   */
  protected abstract updateDisplay(): void;

  /**
   * Adds a callback to be called when the value of the input changes.
   * @param callback The callback.
   */
  public addOnValueChangedCallback(callback: (value: Type) => void): void {
    this._onValueChanged.add(callback);
  }

  /**
   * Removes a callback from being called when the value of the input changes.
   * @param callback The callback.
   */
  public removeOnValueChangedCallback(callback: (value: Type) => void): void {
    this._onValueChanged.delete(callback);
  }
}
