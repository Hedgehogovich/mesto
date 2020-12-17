const root = document.querySelector('.root');
const galleryGrid = root.querySelector('.gallery__grid');

const editProfileButton = root.querySelector('.profile__edit');
const profileNameElement = root.querySelector('.profile__name');
const profileJobElement = root.querySelector('.profile__job');

const editProfilePopup = root.querySelector('.profile-popup')
const editProfileForm = editProfilePopup.querySelector('.profile-popup__form')
const profileNameInput = editProfileForm.querySelector('.profile-popup__input_type_name');
const profileJobInput = editProfileForm.querySelector('.profile-popup__input_type_job');

const addPlaceButton = root.querySelector('.profile__add');

const newPlacePopup = root.querySelector('.place-popup')
const newPlaceForm = newPlacePopup.querySelector('.place-popup__form')
const newPlaceNameInput = newPlaceForm.querySelector('.place-popup__input_type_name');
const newPlacePictureInput = newPlaceForm.querySelector('.place-popup__input_type_picture');

const zoomPreviewPopup = root.querySelector('.zoom-preview');
const zoomPreviewPopupImage = zoomPreviewPopup.querySelector('.zoom-preview__image');

const cardTemplate = root.querySelector('#gallery-card').content;

function onEscapeClick(evt) {
  if (evt.key === 'Escape') {
    closePopup(root.querySelector('.popup_opened'));
  }
}

function showPopup(popupElement) {
  root.classList.add('root_opened');
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onEscapeClick);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onEscapeClick);
  root.classList.remove('root_opened');
}

function onLikeButtonClick(evt) {
  evt.target.classList.toggle('gallery__card-like_active');
}

function onPictureClick(evt) {
  const {target: img} = evt;

  zoomPreviewPopupImage.src = img.src;
  zoomPreviewPopupImage.alt = img.alt;

  showPopup(zoomPreviewPopup);
}

function onDeleteButtonClick(evt) {
  evt.target.closest('.gallery__grid-item').remove();
}

function createCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.gallery__card-name').textContent = card.name;
  cardElement.querySelector('.gallery__card-like').addEventListener('click', onLikeButtonClick);
  cardElement.querySelector('.gallery__card-delete').addEventListener('click', onDeleteButtonClick);

  const cardImage = cardElement.querySelector('.gallery__card-image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', onPictureClick);

  const gridElement = document.createElement('li');
  gridElement.classList.add('gallery__grid-item');
  gridElement.append(cardElement);

  return gridElement;
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

function updateProfileFormInputs() {
  profileNameInput.value = getElementTextContent(profileNameElement);
  profileJobInput.value = getElementTextContent(profileJobElement);
}

function onProfileEditButtonClick() {
  updateProfileFormInputs();
  showPopup(editProfilePopup);
}

function onNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const name = getInputElementValue(newPlaceNameInput);
  const link = getInputElementValue(newPlacePictureInput);

  galleryGrid.prepend(createCardElement({name, link}));
  closePopup(newPlacePopup);
}

function onNewPlaceButtonClick() {
  newPlaceNameInput.value = '';
  newPlacePictureInput.value = '';

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
    galleryGrid.append(createCardElement(card));
  });
}

function addPopupCloseButtonsListeners(popup) {
  const popupCloseButton = popup.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => closePopup(popup));
}

function addPopupBackgroundListener(popup) {
  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

function addPopupCloseListeners() {
  const popups = [...root.querySelectorAll('.popup')];

  popups.forEach(popup => {
    addPopupCloseButtonsListeners(popup);
    addPopupBackgroundListener(popup);
  });
}

editProfileButton.addEventListener('click', onProfileEditButtonClick);
updateProfileFormInputs();

addPlaceButton.addEventListener('click', onNewPlaceButtonClick);
editProfileForm.addEventListener('submit', onProfileFormSubmit);
newPlaceForm.addEventListener('submit', onNewPlaceFormSubmit);

addPopupCloseListeners();
addInitialCardsToGrid();
