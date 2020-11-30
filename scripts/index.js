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

  const cardTemplate = root.querySelector('#gallery-card').content;
  const formTemplate = root.querySelector('#edit-form').content;

  const editFormInputClass = 'edit-form__input'

  function showPopup(innerPopupElement) {
    popupContainer.append(innerPopupElement);

    root.classList.add('root_opened');
    popup.classList.add('popup_opened');
  }

  function closePopup() {
    popup.classList.remove('popup_opened');
    root.classList.remove('root_opened');

    popupContainer.lastElementChild.remove();
  }

  function onLikeButtonClick(evt) {
    evt.target.classList.toggle('gallery__card-like_active');
  }

  function onPictureClick(evt) {
    const {target: img} = evt;

    const zoomImage = document.createElement('img');
    zoomImage.classList.add('zoom-preview');
    zoomImage.src = img.src;
    zoomImage.alt = img.alt;

    showPopup(zoomImage);
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

  function createPopupFormInput(name, defaultValue = '', placeholder = '') {
    const input = document.createElement('input');

    input.classList.add(editFormInputClass);
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
    const formElement = formTemplate.cloneNode(true);

    formElement.querySelector('.edit-form__title').textContent = heading;
    formElement.addEventListener('submit', onSubmit);

    const submitButton = formElement.querySelector('.edit-form__submit');
    inputs.forEach((input) => submitButton.parentElement.insertBefore(input, submitButton));

    return formElement;
  }

  function getElementTextContent(element) {
    return element.textContent.trim();
  }

  function getInputElementValue(inputElement) {
    return inputElement.value.trim();
  }

  function onProfileFormSubmit(evt) {
    evt.preventDefault();
    const {target: form} = evt;

    profileNameElement.textContent = getInputElementValue(form.querySelector(`.${editFormInputClass}[name="name"]`));
    profileJobElement.textContent = getInputElementValue(form.querySelector(`.${editFormInputClass}[name="job"]`));

    closePopup();
  }

  function onProfileEditButtonClick() {
    const nameInput = createPopupFormInput('name', getElementTextContent(profileNameElement));
    const jobInput = createPopupFormInput('job', getElementTextContent(profileJobElement));
    const form = createPopupForm('profile', 'Редактировать профиль', [nameInput, jobInput], onProfileFormSubmit);

    showPopup(form);
  }

  function onNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    const {currentTarget: form} = evt;

    const name = getInputElementValue(form.querySelector(`.${editFormInputClass}[name="place-name"]`));
    const link = getInputElementValue(form.querySelector(`.${editFormInputClass}[name="picture"]`));

    galleryGrid.prepend(createCardElement({name, link}));
    closePopup();
  }

  function onNewPlaceButtonClick() {
    const placeNameInput = createPopupFormInput('place-name', '', 'Название');
    const pictureInput = createPopupFormInput('picture', '', 'Ссылка на картинку');
    const form = createPopupForm('new-place', 'Новое место', [placeNameInput, pictureInput], onNewPlaceFormSubmit);

    showPopup(form);
  }

  function addInitialCardsToGrid() {
    initialCards.forEach(card => {
      galleryGrid.append(createCardElement(card));
    });
  }

  editProfileButton.addEventListener('click', onProfileEditButtonClick);
  addPlaceButton.addEventListener('click', onNewPlaceButtonClick);
  popupCloseButton.addEventListener('click', closePopup);

  addInitialCardsToGrid();
})(document);
