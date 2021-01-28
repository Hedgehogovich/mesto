import '~src/pages/index.css';

import {
  addPlaceButton,
  cards,
  editProfileButton,
  editProfileForm,
  newPlaceForm,
  validationConfig
} from '~src/utils/constants';
import FormValidator from '~src/components/FormValidator.js';
import Card from '~src/components/Card.js';
import Section from '~src/components/Section.js';
import PopupWithImage from '~src/components/PopupWithImage.js';
import PopupWithForm from '~src/components/PopupWithForm.js';
import UserInfo from '~src/components/UserInfo.js';

const galleryGrid = new Section({items: cards, renderer: createCard}, '.gallery__grid');

const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const newPlaceValidation = new FormValidator(validationConfig, newPlaceForm);

const cardTemplate = document.querySelector('#gallery-card').content;

const zoomPreviewPopup = new PopupWithImage('.zoom-preview');
zoomPreviewPopup.setEventListeners();

const newPlacePopup = new PopupWithForm('.place-popup', onNewPlaceFormSubmit);
newPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.profile-popup', onProfileFormSubmit);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

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

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);

editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
galleryGrid.renderElements();
