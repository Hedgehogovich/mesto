import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputsList = Array.from(this._element.querySelectorAll('.edit-form__input'));
    this._formElement = this._element.querySelector('.edit-form');
  }

  _getInputsValues() {
    return this._inputsList.reduce((inputsValues, input) => {
      inputsValues[input.name] = input.value;
      return inputsValues;
    }, {})
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputsValues());
    });
  }

  open(initialInputsValues = {}) {
    Object.keys(initialInputsValues).forEach(inputName => {
      const inputElement = this._inputsList.find(input => input.name === inputName);
      if (inputElement) {
        inputElement.value = initialInputsValues[inputName];
      }
    });
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
