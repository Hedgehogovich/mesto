(document => {
  function resetInput(inputSelector) {
    let input = document.querySelector(inputSelector);

    input.value = '';
    input.removeAttribute('value');
  }

  function closeModal() {
    let rootElement = document.querySelector('.root');
    let popupElement = document.querySelector('.popup');

    popupElement.classList.remove('popup_opened');
    rootElement.classList.remove('root_modal_opened');
  }

  function onCloseButtonClick() {
    closeModal();
    resetInput('.edit-form__input_name');
    resetInput('.edit-form__input_job');
  }

  let popupCloseButton = document.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', onCloseButtonClick);
})(document);
