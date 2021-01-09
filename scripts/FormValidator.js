export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputsList = form.querySelectorAll(config.inputSelector);
    this._button = form.querySelector(config.submitButtonSelector);
  }

  _toggleButtonState() {
    if (this._form.checkValidity()) {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._config.inputErrorClass);

    const error = this._form.querySelector(`#${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
    error.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);

    const error = this._form.querySelector(`#${inputElement.id}-error`);
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  resetForm() {
    this._inputsList.forEach(inputElement => this._hideInputError(inputElement));
    this._toggleButtonState();
  }

  enableValidation() {
    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }
}
