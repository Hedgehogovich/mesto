export class Card {
  constructor(cardData, template, onPictureClick) {
    this._cardData = cardData;
    this._template = template;
    this._onPictureClick = onPictureClick
  }

  _onLikeButtonClick({target}) {
    target.classList.toggle('gallery__card-like_active');
  }

  _onDeleteButtonClick({target}) {
    target.closest('.gallery__grid-item').remove();
  }

  _setCardName() {
    this._element.querySelector('.gallery__card-name').textContent = this._cardData.name;
  }

  _setEventListeners() {
    this._element
      .querySelector('.gallery__card-like')
      .addEventListener('click', this._onLikeButtonClick);
    this._element
      .querySelector('.gallery__card-delete')
      .addEventListener('click', this._onDeleteButtonClick);
  }

  _setCardImage() {
    const cardImage = this._element.querySelector('.gallery__card-image');

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardImage.addEventListener('click', () => this._onPictureClick(this._cardData));
  }

  getElement() {
    this._element = this._template.cloneNode(true);

    this._setCardName();
    this._setEventListeners();
    this._setCardImage();

    return this._element;
  }
}
