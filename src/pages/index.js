import '~src/pages/index.css';

import {
  addPlaceButton,
  editProfileButton,
  editProfileForm,
  newPlaceForm,
  validationConfig
} from '~src/utils/constants';
import Api from '~src/utils/Api';

import FormValidator from '~src/components/FormValidator.js';
import Card from '~src/components/Card.js';
import Section from '~src/components/Section.js';
import PopupWithImage from '~src/components/PopupWithImage.js';
import PopupWithForm from '~src/components/PopupWithForm.js';
import UserInfo from '~src/components/UserInfo.js';

const api = new Api();

const galleryGrid = new Section({renderer: createCard}, '.gallery__grid');

const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const newPlaceValidation = new FormValidator(validationConfig, newPlaceForm);

const cardTemplate = document.querySelector('#gallery-card').content;

const zoomPreviewPopup = new PopupWithImage('.zoom-preview');
zoomPreviewPopup.setEventListeners();

const newPlacePopup = new PopupWithForm('.place-popup', onNewPlaceFormSubmit);
newPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.profile-popup', onProfileFormSubmit);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

function createCard(item) {
  return new Card(item, cardTemplate, zoomPreviewPopup.open.bind(zoomPreviewPopup)).getElement();
}

function onProfileFormSubmit(profileData) {
  userInfo.setUserInfo(profileData);
  editProfilePopup.close();
}

function onNewPlaceFormSubmit({name, link}) {
  galleryGrid.addItem(createCard({name, link}));
  newPlacePopup.close();
}

function onProfileEditButtonClick() {
  editProfilePopup.open(userInfo.getUserInfo());
  editProfileValidation.resetForm();
}

function onNewPlaceButtonClick() {
  newPlaceValidation.resetForm();
  newPlacePopup.open();
}

function initializeUserProfile() {
  api.getAuthorizedUserInfo()
    .then(authorizedUserInfo => userInfo.setUserInfo(authorizedUserInfo));
}

function getCards() {
  api.getCards()
    .then(cards => cards.forEach(card => galleryGrid.addItem(createCard(card))));
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);

initializeUserProfile();
getCards();
editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
