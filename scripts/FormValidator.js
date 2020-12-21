export class FormValidator {
  #config;
  #form;
  #button;
  #inputsList;

  constructor(config, form) {
    this.#config = config;
    this.#form = form;
    this.#inputsList = form.querySelectorAll(config.inputSelector);
    this.#button = form.querySelector(config.submitButtonSelector);
  }

  #toggleButtonState() {
    if (this.#form.checkValidity()) {
      this.#button.classList.remove(this.#config.inactiveButtonClass);
      this.#button.disabled = false;
    } else {
      this.#button.classList.add(this.#config.inactiveButtonClass);
      this.#button.disabled = true;
    }
  }

  #showInputError(inputElement) {
    inputElement.classList.add(this.#config.inputErrorClass);

    const error = this.#form.querySelector(`#${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
    error.classList.add(this.#config.errorClass);
  }

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.#config.inputErrorClass);

    const error = this.#form.querySelector(`#${inputElement.id}-error`);
    error.classList.remove(this.#config.errorClass);
    error.textContent = '';
  }

  #checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this.#hideInputError(inputElement);
    } else {
      this.#showInputError(inputElement);
    }
  }

  resetForm() {
    this.#inputsList.forEach(inputElement => this.#hideInputError(inputElement));
    this.#toggleButtonState();
  }

  enableValidation() {
    this.#inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
    this.#toggleButtonState();
  }
}
