(document => {
  function updateInputByTextElement(inputSelector, textElementSelector) {
    let textContent = document.querySelector(textElementSelector).textContent.trim();
    let inputElement = document.querySelector(inputSelector);

    inputElement.value = textContent;
    inputElement.setAttribute('value', textContent);
  }

  function updateNameInput() {
    updateInputByTextElement('.edit-form__input_name', '.profile__name');
  }

  function updateJobInput() {
    updateInputByTextElement('.edit-form__input_job', '.profile__job');
  }

  function showModal() {
    let rootElement = document.querySelector('.root');
    let popupElement = document.querySelector('.popup');

    rootElement.classList.add('root_modal_opened');
    popupElement.classList.add('popup_opened');
  }

  function onEditButtonClick() {
    updateNameInput();
    updateJobInput();
    showModal();
  }

  let editButton = document.querySelector('.profile__edit');
  editButton.addEventListener('click', onEditButtonClick);
})(document);
