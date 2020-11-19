(document => {
  function updateTextElementByInputValue(textElementSelector, inputSelector) {
    let textElement = document.querySelector(textElementSelector);
    let input = document.querySelector(inputSelector);

    textElement.textContent = input.value.trim();

    input.removeAttribute('value');
    input.value = '';
  }

  function updateName() {
    updateTextElementByInputValue('.profile__name', '.edit-form__input_name');
  }

  function updateJob() {
    updateTextElementByInputValue('.profile__job', '.edit-form__input_job');
  }

  function closeModal() {
    let popupElement = document.querySelector('.popup');
    let rootElement = document.querySelector('.root');

    popupElement.classList.remove('popup_opened');
    rootElement.classList.remove('root_modal_opened');
  }

  function onFormSubmit(event) {
    event.preventDefault();

    updateName();
    updateJob();

    closeModal();
  }

  let formElement = document.querySelector('.edit-form');
  formElement.addEventListener('submit', onFormSubmit);
})(document);
