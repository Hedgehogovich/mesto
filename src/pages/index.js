import '~src/pages/index.css';

import {
  addPlaceButton,
  editProfileButton,
  editProfileForm,
  newPlaceForm,
  avatarEditForm,
  avatarEditButton,
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
const avatarEditValidation = new FormValidator(validationConfig, avatarEditForm);

const cardTemplate = document.querySelector('#gallery-card').content;

const zoomPreviewPopup = new PopupWithImage('.zoom-preview');
zoomPreviewPopup.setEventListeners();

const cardRemovingPopup = new CardRemovingPopup('.delete-popup');
cardRemovingPopup.setEventListeners();

const newPlacePopup = new PopupWithForm('.place-popup', cardData => {
  api.addCard(cardData).then(createdCardData => {
    galleryGrid.addItem(createCard({
      cardData: createdCardData,
      currentUserId: userInfo.getUserInfo()._id
    }));
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

const avatarEditPopup = new PopupWithForm('.avatar-popup', ({avatar}) => {
  api.updateAvatar(avatar).then(updatedUserData => {
    userInfo.setUserInfo(updatedUserData);
    avatarEditPopup.close();
  });
});
avatarEditPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image'
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

function likeCard(cardId, likeCallback) {
  return api.likeCard(cardId).then(likeCallback);
}

function removeLikeFromCard(cardId, removeLikeCallback) {
  return api.removeLikeFromCard(cardId).then(removeLikeCallback);
}

function createCard({cardData, currentUserId}) {
  return new Card({
    cardData,
    template: cardTemplate,
    currentUserId,
    handleCardClick: zoomPreviewPopup.open.bind(zoomPreviewPopup),
    beforeDeleteHandle: beforeCardDeleteHandle,
    likeHandle: likeCard,
    removeLikeHandle: removeLikeFromCard,
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

function onAvatarEditClick() {
  avatarEditValidation.resetForm();
  avatarEditPopup.open();
}

function initializeUserProfile() {
  return api
    .getAuthorizedUserInfo()
    .then(authorizedUserInfo => userInfo.setUserInfo(authorizedUserInfo));
}

function getCards() {
  return api
    .getCards()
    .then(cards => {
      const currentUser = userInfo.getUserInfo();

      cards.reverse().forEach(card => {
        galleryGrid.addItem(createCard({
          cardData: card,
          currentUserId: currentUser._id
        }));
      });
    });
}

function initializeApp() {
  return initializeUserProfile().then(getCards);
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);
avatarEditButton.addEventListener('click', onAvatarEditClick);

initializeApp();
editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
avatarEditValidation.enableValidation();
