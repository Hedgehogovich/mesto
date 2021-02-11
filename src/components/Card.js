export default class Card {
  constructor({cardData, template, handleCardClick, beforeDeleteHandle}) {
    this._cardData = cardData;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._beforeDeleteHandle = beforeDeleteHandle;
    this._deleteSelf = this._deleteSelf.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _onLikeButtonClick({target}) {
    target.classList.toggle('card__like_active');
  }

  _deleteSelf() {
    this._element.remove();
    this._element = null;
  }

  _onDeleteButtonClick() {
    this._beforeDeleteHandle(this._deleteSelf);
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
    this._element
      .querySelector('.card__delete')
      .addEventListener('click', this._onDeleteButtonClick);
  }

  _setCardImage() {
    const cardImage = this._element.querySelector('.card__image');

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  getElement() {
    this._element = this._template.querySelector('.gallery__grid-item').cloneNode(true);

    this._setCardName();
    this._setEventListeners();
    this._setCardImage();
    this._setCardLikesCount();

    return this._element;
  }
}
