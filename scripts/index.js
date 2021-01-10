import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

const validationConfig = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'edit-form__submit_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error_visible'
};

const rootElement = document.querySelector('.root')

const galleryGrid = rootElement.querySelector('.gallery__grid');

const editProfileButton = rootElement.querySelector('.profile__edit');
const profileNameElement = rootElement.querySelector('.profile__name');
const profileJobElement = rootElement.querySelector('.profile__job');

const editProfilePopup = rootElement.querySelector('.profile-popup');
const editProfileForm = editProfilePopup.querySelector('.profile-popup__form');
const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const profileNameInput = editProfileForm.querySelector('.profile-popup__input_type_name');
const profileJobInput = editProfileForm.querySelector('.profile-popup__input_type_job');

const addPlaceButton = rootElement.querySelector('.profile__add');

const newPlacePopup = rootElement.querySelector('.place-popup');
const newPlaceForm = newPlacePopup.querySelector('.place-popup__form');
const newPlaceValidation = new FormValidator(validationConfig, newPlaceForm);
const newPlaceNameInput = newPlaceForm.querySelector('.place-popup__input_type_name');
const newPlacePictureInput = newPlaceForm.querySelector('.place-popup__input_type_picture');

const zoomPreviewPopup = rootElement.querySelector('.zoom-preview');
const zoomPreviewPopupImage = zoomPreviewPopup.querySelector('.zoom-preview__image');
const zoomPreviewPopupCaption = zoomPreviewPopup.querySelector('.zoom-preview__caption');

const cardTemplate = rootElement.querySelector('#gallery-card').content;

export function showPopup(popupElement) {
  rootElement.classList.add('root_opened');
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onEscapeClick);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onEscapeClick);
  rootElement.classList.remove('root_opened');
}

function onEscapeClick({key}) {
  if (key === 'Escape') {
    closePopup(rootElement.querySelector('.popup_opened'));
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

export function addPopupCloseListeners() {
  rootElement.querySelectorAll('.popup').forEach(popup => {
    addPopupCloseButtonsListener(popup);
    addPopupBackgroundListener(popup);
  });
}

function getElementTextContent(element) {
  return element.textContent.trim();
}

function getInputElementValue(inputElement) {
  return inputElement.value.trim();
}

function onProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = getInputElementValue(profileNameInput);
  profileJobElement.textContent = getInputElementValue(profileJobInput);

  closePopup(editProfilePopup);
}

function onProfileEditButtonClick() {
  profileNameInput.value = getElementTextContent(profileNameElement);
  profileJobInput.value = getElementTextContent(profileJobElement);
  editProfileValidation.resetForm();

  showPopup(editProfilePopup);
}

function onPictureClick({link, name}) {
  zoomPreviewPopupImage.src = link;
  zoomPreviewPopupImage.alt = name;
  zoomPreviewPopupCaption.textContent = name;

  showPopup(zoomPreviewPopup);
}

function createCard(item) {
  return new Card(item, cardTemplate, onPictureClick).getElement();
}

function onNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const name = getInputElementValue(newPlaceNameInput);
  const link = getInputElementValue(newPlacePictureInput);

  galleryGrid.prepend(createCard({name, link}));
  closePopup(newPlacePopup);
}

function onNewPlaceButtonClick() {
  newPlaceNameInput.value = '';
  newPlacePictureInput.value = '';
  newPlaceValidation.resetForm();

  showPopup(newPlacePopup);
}

function addInitialCardsToGrid() {
  const cards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  galleryGrid.append(...cards.map(card => createCard(card)));
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);
editProfileForm.addEventListener('submit', onProfileFormSubmit);
newPlaceForm.addEventListener('submit', onNewPlaceFormSubmit);

editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
addPopupCloseListeners();
addInitialCardsToGrid();
