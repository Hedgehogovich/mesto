import {showPopup} from './popupMethods.js';

export class Card {
  constructor(cardData, template) {
    this._cardData = cardData;
    this._template = template;
  }

  _onLikeButtonClick({target}) {
    target.classList.toggle('gallery__card-like_active');
  }

  _onDeleteButtonClick({target}) {
    target.closest('.gallery__grid-item').remove();
  }

  _onPictureClick(evt) {
    const {target: img} = evt;

    const zoomPreviewPopup = document.querySelector('.zoom-preview');
    const zoomPreviewPopupImage = zoomPreviewPopup.querySelector('.zoom-preview__image');
    const zoomPreviewPopupCaption = zoomPreviewPopup.querySelector('.zoom-preview__caption');

    zoomPreviewPopupImage.src = img.src;
    zoomPreviewPopupImage.alt = img.alt;
    zoomPreviewPopupCaption.textContent = img.alt;

    showPopup(zoomPreviewPopup);
  }

  _setCardName() {
    this._element.querySelector('.gallery__card-name').textContent = this._cardData.name;
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__card-like').addEventListener('click', evt => {
      this._onLikeButtonClick(evt);
    });
    this._element.querySelector('.gallery__card-delete').addEventListener('click', evt => {
      this._onDeleteButtonClick(evt);
    });
  }

  _setCardImage() {
    const cardImage = this._element.querySelector('.gallery__card-image');

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardImage.addEventListener('click', evt => {
      this._onPictureClick(evt);
    });
  }

  getElement() {
    this._element = this._template.cloneNode(true);

    this._setCardName();
    this._setEventListeners();
    this._setCardImage();

    const gridElement = document.createElement('li');
    gridElement.classList.add('gallery__grid-item');
    gridElement.append(this._element);

    return gridElement;
  }
}
