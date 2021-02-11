import Popup from '~src/components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputsList = Array.from(this._element.querySelectorAll('.edit-form__input'));
    this._formElement = this._element.querySelector('.edit-form');
    this._buttonElement = this._element.querySelector('.edit-form__submit');
    this._buttonDefaultText = this._buttonElement.textContent;
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

      this._buttonElement.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputsValues());
    });
  }

  open(initialInputsValues = {}, appendValues = false) {
    if (!appendValues) {
      this._formElement.reset();
    }

    Object.keys(initialInputsValues).forEach(inputName => {
      const inputElement = this._inputsList.find(input => input.name === inputName);
      if (inputElement) {
        inputElement.value = initialInputsValues[inputName];
      }
    });
    this._buttonElement.textContent = this._buttonDefaultText;
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
