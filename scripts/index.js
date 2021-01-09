import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {rootElement} from './rootElement.js';

import {showPopup, closePopup, addPopupCloseListeners} from './popupMethods.js';

const validationConfig = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'edit-form__submit_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error_visible'
};

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

const cardTemplate = rootElement.querySelector('#gallery-card').content;

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

function onNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const name = getInputElementValue(newPlaceNameInput);
  const link = getInputElementValue(newPlacePictureInput);

  galleryGrid.prepend(new Card({name, link}, cardTemplate).getElement());
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

  cards.forEach(card => {
    galleryGrid.append(new Card(card, cardTemplate).getElement());
  });
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);
editProfileForm.addEventListener('submit', onProfileFormSubmit);
newPlaceForm.addEventListener('submit', onNewPlaceFormSubmit);

editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
addPopupCloseListeners();
addInitialCardsToGrid();
