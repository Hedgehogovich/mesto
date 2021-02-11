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
import CardRemovingPopup from '~src/components/CardRemovingPopup';

const api = new Api();

const galleryGrid = new Section({renderer: createCard}, '.gallery__grid');

const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const newPlaceValidation = new FormValidator(validationConfig, newPlaceForm);

const cardTemplate = document.querySelector('#gallery-card').content;

const zoomPreviewPopup = new PopupWithImage('.zoom-preview');
zoomPreviewPopup.setEventListeners();

const cardRemovingPopup = new CardRemovingPopup('.delete-popup');
cardRemovingPopup.setEventListeners();

const newPlacePopup = new PopupWithForm('.place-popup', cardData => {
  api.addCard(cardData).then(createdCardData => {
    galleryGrid.addItem(createCard(createdCardData, true));
    newPlacePopup.close();
  });
});
newPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.profile-popup', profileData => {
  api.updateProfile(profileData)
    .then(updatedProfileData => {
      userInfo.setUserInfo(updatedProfileData);
      editProfilePopup.close();
    });
});
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

function beforeCardDeleteHandle(cardId, cardDeleteCallback) {
  cardRemovingPopup.open(() => {
    api.removeCard(cardId).then(isOk => {
      if (isOk) {
        cardDeleteCallback();
      }
    });
  });
}

function createCard(cardData, isCardBelongsToCurrentUser) {
  return new Card({
    cardData,
    template: cardTemplate,
    handleCardClick: zoomPreviewPopup.open.bind(zoomPreviewPopup),
    beforeDeleteHandle: isCardBelongsToCurrentUser ? beforeCardDeleteHandle : null,
  }).getElement();
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
  return api
    .getAuthorizedUserInfo()
    .then(authorizedUserInfo => userInfo.setUserInfo(authorizedUserInfo));
}

function getCards() {
  api.getCards()
    .then(cards => {
      const currentUser = userInfo.getUserInfo();

      cards.reverse().forEach(card => {
        const isCardBelongsToCurrentUser = card.owner._id === currentUser._id;

        galleryGrid.addItem(createCard(card, isCardBelongsToCurrentUser));
      });
    });
}

function initializeApp() {
  initializeUserProfile().then(getCards);
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);

initializeApp();
editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
