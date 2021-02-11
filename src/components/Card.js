export default class Card {
  constructor({cardData, template, handleCardClick, beforeDeleteHandle}) {
    this._cardData = cardData;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._beforeDeleteHandle = beforeDeleteHandle;
    this._element = null;
    this._deleteButton = null;

    this._deleteSelf = this._deleteSelf.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _onLikeButtonClick({target}) {
    target.classList.toggle('card__like_active');
  }

  _deleteSelf() {
    this._element.remove();
    this._element = null;

    if (this._deleteButton) {
      this._deleteButton = null;
    }
  }

  _onDeleteButtonClick() {
    this._beforeDeleteHandle(this._cardData._id, this._deleteSelf);
  }

  _setCardName() {
    this._element.querySelector('.card__name').textContent = this._cardData.name;
  }

  _setCardLikesCount() {
    this._element.querySelector('.card__likes-count').textContent = this._cardData.likes.length;
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__like')
      .addEventListener('click', this._onLikeButtonClick);

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', this._onDeleteButtonClick);
    }
  }

  _setCardImage() {
    const cardImage = this._element.querySelector('.card__image');

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  _setDeleteButton() {
    if (this._beforeDeleteHandle) {
      this._deleteButton = this._element.querySelector('.card__delete');
    } else {
      this._element.querySelector('.card__delete').remove();
      this._deleteButton = null;
    }
  }

  getElement() {
    this._element = this._template.querySelector('.gallery__grid-item').cloneNode(true);

    this._setCardName();
    this._setDeleteButton();
    this._setEventListeners();
    this._setCardImage();
    this._setCardLikesCount();

    return this._element;
  }
}
