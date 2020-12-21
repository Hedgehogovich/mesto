const root = document.querySelector('.root');

function onEscapeClick(evt) {
  if (evt.key === 'Escape') {
    closePopup(root.querySelector('.popup_opened'));
  }
}

function addPopupCloseButtonsListener(popup) {
  const popupCloseButton = popup.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => closePopup(popup));
}

function addPopupBackgroundListener(popup) {
  popup.addEventListener('click', ({target, currentTarget}) => {
    if (target === currentTarget) {
      closePopup(currentTarget);
    }
  });
}

export function showPopup(popupElement) {
  root.classList.add('root_opened');
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onEscapeClick);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onEscapeClick);
  root.classList.remove('root_opened');
}

export function addPopupCloseListeners() {
  root.querySelectorAll('.popup').forEach(popup => {
    addPopupCloseButtonsListener(popup);
    addPopupBackgroundListener(popup);
  });
}
