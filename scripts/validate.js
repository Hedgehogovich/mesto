function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function showInputError(inputElement, inputErrorClass, formElement, errorClass) {
  inputElement.classList.add(inputErrorClass);

  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = inputElement.validationMessage;
  error.classList.add(errorClass);
}

function hideInputError(inputElement, inputErrorClass, formElement, errorClass) {
  inputElement.classList.remove(inputErrorClass);

  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.remove(errorClass);
  error.textContent = '';
}

function checkInputValidity(inputElement, inputErrorClass, formElement, errorClass) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputErrorClass, formElement, errorClass);
  } else {
    showInputError(inputElement, inputErrorClass, formElement, errorClass);
  }
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', evt => {
      if (hasInvalidInput(inputList)) {
        evt.preventDefault();
      }
    });

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, inputErrorClass, formElement, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
}

enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'edit-form__submit_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error_visible'
});
