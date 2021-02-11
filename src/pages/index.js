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
import Api from '~src/components/Api';

import FormValidator from '~src/components/FormValidator.js';
import Card from '~src/components/Card.js';
import Section from '~src/components/Section.js';
import PicturePopup from '~src/components/PicturePopup.js';
import PopupWithForm from '~src/components/PopupWithForm.js';
import UserInfo from '~src/components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'ae67ccb6-ec53-41ab-bfce-d685e4f66069',
    'Content-Type': 'application/json'
  }
});

const cardTemplate = document.querySelector('#gallery-card').content;

const zoomPreviewPopup = new PicturePopup('.zoom-preview');
zoomPreviewPopup.setEventListeners();

const cardRemovePopup = new PopupWithForm('.delete-popup');
cardRemovePopup.setEventListeners();

function beforeCardDeleteHandle(cardId, cardDeleteCallback) {
  cardRemovePopup.setSubmitHandler(() => {
    api.removeCard(cardId)
      .then(isOk => {
        if (isOk) {
          cardDeleteCallback();
          cardRemovePopup.close();
          cardRemovePopup.setSubmitHandler(null);
        }
      })
      .catch(console.error);
  });
  cardRemovePopup.open();
}

function likeCard(cardId, likeCallback) {
  return api.likeCard(cardId).then(likeCallback).catch(console.error);
}

function removeLikeFromCard(cardId, removeLikeCallback) {
  return api.removeLikeFromCard(cardId).then(removeLikeCallback).catch(console.error);
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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image'
});

const galleryGrid = new Section({renderer: createCard}, '.gallery__grid');

const editProfilePopup = new PopupWithForm('.profile-popup', profileData => {
  api.updateProfile(profileData)
    .then(updatedProfileData => {
      userInfo.setUserInfo(updatedProfileData);
      editProfilePopup.close();
    })
    .catch(console.error);
});
editProfilePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm('.avatar-popup', ({avatar}) => {
  api.updateAvatar(avatar)
    .then(updatedUserData => {
      userInfo.setUserInfo(updatedUserData);
      avatarEditPopup.close();
    })
    .catch(console.error);
});
avatarEditPopup.setEventListeners();

const newPlacePopup = new PopupWithForm('.place-popup', cardData => {
  api.addCard(cardData)
    .then(createdCardData => {
      galleryGrid.prependItem(createCard({
        cardData: createdCardData,
        currentUserId: userInfo.getUserInfo()._id
      }));
      newPlacePopup.close();
    })
    .catch(console.error);
});
newPlacePopup.setEventListeners();

const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const newPlaceValidation = new FormValidator(validationConfig, newPlaceForm);
const avatarEditValidation = new FormValidator(validationConfig, avatarEditForm);

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
    .then(authorizedUserInfo => userInfo.setUserInfo(authorizedUserInfo))
    .catch(console.error);
}

function getCards() {
  return api.getCards()
    .then(cards => {
      const currentUser = userInfo.getUserInfo();
      const cardsCount = cards.length;

      for (let i = 0; i < cardsCount; i++) {
        galleryGrid.appendItem(createCard({
          cardData: cards[i],
          currentUserId: currentUser._id
        }));
      }
    })
    .catch(console.error);
}

function initializeApp() {
  return initializeUserProfile()
    .then(getCards)
    .catch(console.error);
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
addPlaceButton.addEventListener('click', onNewPlaceButtonClick);
avatarEditButton.addEventListener('click', onAvatarEditClick);

initializeApp();
editProfileValidation.enableValidation();
newPlaceValidation.enableValidation();
avatarEditValidation.enableValidation();
