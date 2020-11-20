(document => {
  function updateInputByTextElement(inputSelector, textElementSelector) {
    let textContent = document.querySelector(textElementSelector).textContent.trim();
    let inputElement = document.querySelector(inputSelector);

    inputElement.value = textContent;
    inputElement.setAttribute('value', textContent);
  }

  function updateNameInput() {
    updateInputByTextElement('.edit-form__input_type_name', '.profile__name');
  }

  function updateJobInput() {
    updateInputByTextElement('.edit-form__input_type_job', '.profile__job');
  }

  function updateTextElementByInputValue(textElementSelector, inputSelector) {
    let textElement = document.querySelector(textElementSelector);
    let input = document.querySelector(inputSelector);

    textElement.textContent = input.value.trim();
  }

  function updateProfileName() {
    updateTextElementByInputValue('.profile__name', '.edit-form__input_type_name');
  }

  function updateProfileJob() {
    updateTextElementByInputValue('.profile__job', '.edit-form__input_type_job');
  }

  function showModal() {
    let rootElement = document.querySelector('.root');
    let popupElement = document.querySelector('.popup');

    rootElement.classList.add('root_modal_opened');
    popupElement.classList.add('popup_opened');
  }

  function closeModal() {
    let popupElement = document.querySelector('.popup');
    let rootElement = document.querySelector('.root');

    popupElement.classList.remove('popup_opened');
    rootElement.classList.remove('root_modal_opened');
  }

  function onEditButtonClick() {
    updateNameInput();
    updateJobInput();
    showModal();
  }

  function onCloseButtonClick() {
    closeModal();

    let formElement = document.querySelector('.edit-form');
    formElement.reset();
  }

  function onFormSubmit(event) {
    event.preventDefault();

    updateProfileName();
    updateProfileJob();

    closeModal();
  }

  let popupCloseButton = document.querySelector('.popup__close');
  let editButton = document.querySelector('.profile__edit');
  let formElement = document.querySelector('.edit-form');

  editButton.addEventListener('click', onEditButtonClick);
  popupCloseButton.addEventListener('click', onCloseButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
})(document);
