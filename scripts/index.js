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
  const popupContainer = popup.querySelector('.popup__container');
  const popupCloseButton = popup.querySelector('.popup__close');

  const editProfileButton = root.querySelector('.profile__edit');
  const profileNameElement = root.querySelector('.profile__name');
  const profileJobElement = root.querySelector('.profile__job');

  const addPlaceButton = root.querySelector('.profile__add');

  function showPopup(innerPopupElement) {
    popupContainer.appendChild(innerPopupElement);

    root.classList.add('root_opened');
    popup.classList.add('popup_opened');
  }

  function closePopup() {
    popup.classList.remove('popup_opened');
    root.classList.remove('root_opened');

    popupContainer.removeChild(popupContainer.lastElementChild);
  }

  function onLikeButtonClick(event) {
    event.currentTarget.classList.toggle('gallery__card-like_active');
  }

  function onPictureClick(event) {
    const {currentTarget} = event;

    const zoomImage = document.createElement('img');
    zoomImage.classList.add('zoom-preview');
    zoomImage.src = currentTarget.src;
    zoomImage.alt = currentTarget.alt;

    showPopup(zoomImage);
  }

  function onDeleteButtonClick(event) {
    const cardElement = event.currentTarget.closest('.gallery__grid-item');

    galleryGrid.removeChild(cardElement);
  }

  function createCardElement(card) {
    const heading = document.createElement('h2');
    heading.classList.add('gallery__card-name');
    heading.textContent = card.name;

    const likeButton = document.createElement('button');
    likeButton.classList.add('gallery__card-like');
    likeButton.type = 'button';
    likeButton.ariaLabel = 'Поставить отметку нравится для фотографии';
    likeButton.addEventListener('click', onLikeButtonClick);

    const cardCaption = document.createElement('figcaption');
    cardCaption.classList.add('gallery__card-caption');
    cardCaption.appendChild(heading);
    cardCaption.appendChild(likeButton);

    const cardImage = document.createElement('img');
    cardImage.classList.add('gallery__card-image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', onPictureClick);

    const deleteCardButton = document.createElement('button');
    deleteCardButton.classList.add('gallery__card-delete');
    deleteCardButton.type = 'button';
    deleteCardButton.ariaLabel = 'Удалить фотографию';
    deleteCardButton.addEventListener('click', onDeleteButtonClick);

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

  function createPopupFormInput(name, defaultValue = '', placeholder = '') {
    const input = document.createElement('input');

    input.classList.add('edit-form__input');
    input.type = 'text';
    input.name = name;
    if (placeholder) {
      input.placeholder = placeholder;
    }
    if (defaultValue) {
      input.value = defaultValue;
    }

    return input;
  }

  function createPopupForm(name, heading, inputs, onSubmit) {
    const form = document.createElement('form');

    form.classList.add('edit-form');
    form.addEventListener('submit', onSubmit);

    const headingElement = document.createElement('h2');

    headingElement.classList.add('edit-form__title');
    headingElement.textContent = heading;

    form.appendChild(headingElement);

    if (inputs?.length) {
      inputs.forEach((input) => form.appendChild(input));
    }

    const submitButton = document.createElement('button');

    submitButton.classList.add('edit-form__submit');
    submitButton.type = 'submit';
    submitButton.textContent = 'Сохранить';
    form.appendChild(submitButton);

    return form;
  }

  function getElementTextContent(element) {
    return element.textContent.trim();
  }

  function getInputElementValue(inputElement) {
    return inputElement.value.trim();
  }

  function onProfileFormSubmit(event) {
    event.preventDefault();
    const {currentTarget: form} = event;

    profileNameElement.textContent = getInputElementValue(form.querySelector('.edit-form__input[name="name"]'));
    profileJobElement.textContent = getInputElementValue(form.querySelector('.edit-form__input[name="job"]'));

    closePopup();
  }

  function getElementTextContent(element) {
    return element.textContent.trim();
  }

  function onProfileEditButtonClick() {
    const nameInput = createPopupFormInput('name', getElementTextContent(profileNameElement));
    const jobInput = createPopupFormInput('job', getElementTextContent(profileJobElement));
    const form = createPopupForm('profile', 'Редактировать профиль', [nameInput, jobInput], onProfileFormSubmit);

    showPopup(form);
  }

  function onNewPlaceFormSubmit(event) {
    event.preventDefault();
    const {currentTarget: form} = event;

    const name = getInputElementValue(form.querySelector('.edit-form__input[name="place-name"]'));
    const link = getInputElementValue(form.querySelector('.edit-form__input[name="picture"]'));

    galleryGrid.prepend(createCardElement({name, link}));
    closePopup();
  }

  function onAddNewPlaceButtonClick() {
    const placeNameInput = createPopupFormInput('place-name', '', 'Название');
    const pictureInput = createPopupFormInput('picture', '', 'Ссылка на картинку');
    const form = createPopupForm('new-place', 'Новое место', [placeNameInput, pictureInput], onNewPlaceFormSubmit);

    showPopup(form);
  }

  function addInitialCardsToGrid() {
    initialCards.forEach(card => {
      galleryGrid.appendChild(createCardElement(card));
    });
  }

  editProfileButton.addEventListener('click', onProfileEditButtonClick);
  addPlaceButton.addEventListener('click', onAddNewPlaceButtonClick);
  popupCloseButton.addEventListener('click', closePopup);

  addInitialCardsToGrid();
})(document);
