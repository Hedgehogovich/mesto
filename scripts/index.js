(document => {
  const initialCards = [
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

  const root = document.querySelector('.root');
  const galleryGrid = root.querySelector('.gallery__grid');

  const popup = root.querySelector('.popup');
  const popups = root.querySelector('.popup-list');
  const popupContainer = popup.querySelector('.popup__container');
  const popupCloseButton = root.querySelector('.popup__close');

  const editProfileButton = root.querySelector('.profile__edit');
  const profileNameElement = root.querySelector('.profile__name');
  const profileJobElement = root.querySelector('.profile__job');
  const profileForm = root.querySelector('.edit-form[name="profile"]');
  const profileNameInput = root.querySelector('.edit-form__input[name="name"]');
  const profileJobInput = root.querySelector('.edit-form__input[name="job"]');

  const addPlaceButton = root.querySelector('.profile__add');
  const newPlaceForm = root.querySelector('.edit-form[name="new-place"]');
  const newPlaceNameInput = root.querySelector('.edit-form__input[name="place-name"]');
  const newPlaceImageLinkInput = root.querySelector('.edit-form__input[name="picture"]');

  let currentInnerPopupElement = null;

  function createCardElement(card) {
    const heading = document.createElement('h2');
    heading.textContent = card.name;
    heading.classList.add('gallery__card-name');

    const likeButton = document.createElement('button');
    likeButton.type = 'button';
    likeButton.classList.add('gallery__card-like');
    likeButton.ariaLabel = 'Поставить отметку нравится для фотографии';

    const cardCaption = document.createElement('figcaption');
    cardCaption.classList.add('gallery__card-caption');
    cardCaption.appendChild(heading);
    cardCaption.appendChild(likeButton);

    const cardImage = document.createElement('img');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.classList.add('gallery__card-image');

    const deleteCardButton = document.createElement('button')
    deleteCardButton.classList.add('gallery__card-delete');
    deleteCardButton.type = 'button';
    deleteCardButton.ariaLabel = 'Удалить фотографию'

    const cardElement = document.createElement('figure');
    cardElement.classList.add('gallery__card');
    cardElement.appendChild(cardImage);
    cardElement.appendChild(deleteCardButton);
    cardElement.appendChild(cardCaption);

    const gridElement = document.createElement('li');
    gridElement.classList.add('gallery__grid-item');
    gridElement.appendChild(cardElement);

    return gridElement;
  }

  function updateProfileFormInputByTextElement(inputElement, textElement) {
    const textContent = textElement.textContent.trim();

    inputElement.value = textContent;
    inputElement.setAttribute('value', textContent);
  }

  function updateProfileElementByInputValue(textElement, inputElement) {
    textElement.textContent = inputElement.value.trim();
  }

  function showPopup(innerPopupElement) {
    currentInnerPopupElement = innerPopupElement;
    popupContainer.appendChild(innerPopupElement);

    root.classList.add('root_opened');
    popup.classList.add('popup_opened');
  }

  function closePopup() {
    popup.classList.remove('popup_opened');
    root.classList.remove('root_opened');

    popupContainer.removeChild(currentInnerPopupElement);
    popups.appendChild(currentInnerPopupElement);
    currentInnerPopupElement = null;
  }

  function onProfileEditButtonClick() {
    updateProfileFormInputByTextElement(profileNameInput, profileNameElement);
    updateProfileFormInputByTextElement(profileJobInput, profileJobElement);

    showPopup(profileForm);
  }

  function onProfileFormSubmit(event) {
    event.preventDefault();

    updateProfileElementByInputValue(profileNameElement, profileNameInput);
    updateProfileElementByInputValue(profileJobElement, profileJobInput);

    closePopup();
  }

  function onAddNewPlaceButtonClick() {
    newPlaceForm.reset();

    showPopup(newPlaceForm);
  }

  function onNewPlaceFormSubmit(event) {
    event.preventDefault();

    const name = newPlaceNameInput.value.trim();
    const link = newPlaceImageLinkInput.value.trim();

    galleryGrid.prepend(createCardElement({name, link}));
    closePopup();
  }

  function addInitialCardsToGrid() {
    initialCards.forEach(card => {
      galleryGrid.appendChild(createCardElement(card));
    });
  }

  function onLikeButtonClick(event) {
    const {currentTarget} = event;

    currentTarget.classList.toggle('gallery__card-like_active');
  }

  function addLikeButtonsListeners() {
    const buttons = root.querySelectorAll('.gallery__card-like');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', onLikeButtonClick)
    }
  }

  function onDeleteButtonClick(event) {
    const {currentTarget} = event;
    const cardElement = currentTarget.closest('.gallery__grid-item');

    galleryGrid.removeChild(cardElement);
  }

  function addDeleteButtonsListeners() {
    const buttons = root.querySelectorAll('.gallery__card-delete');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', onDeleteButtonClick)
    }
  }

  function onPictureClick(event) {
    const {currentTarget} = event;

    const zoomImage = document.createElement('img');
    zoomImage.classList.add('zoom-preview');
    zoomImage.src = currentTarget.src;
    zoomImage.alt = currentTarget.alt;

    showPopup(zoomImage);
  }

  function addPicturesListeners() {
    const pictures = root.querySelectorAll('.gallery__card-image');

    for (let i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', onPictureClick)
    }
  }

  editProfileButton.addEventListener('click', onProfileEditButtonClick);
  addPlaceButton.addEventListener('click', onAddNewPlaceButtonClick);
  popupCloseButton.addEventListener('click', closePopup);
  profileForm.addEventListener('submit', onProfileFormSubmit);
  newPlaceForm.addEventListener('submit', onNewPlaceFormSubmit);

  addInitialCardsToGrid();
  addLikeButtonsListeners();
  addDeleteButtonsListeners();
  addPicturesListeners();
})(document);
