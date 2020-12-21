import {showPopup} from './popupMethods.js';

export class Card {
  #cardData;
  #template;

  constructor(cardData, template) {
    this.#cardData = cardData;
    this.#template = template;
  }

  static #onLikeButtonClick({target}) {
    target.classList.toggle('gallery__card-like_active');
  }

  static #onDeleteButtonClick({target}) {
    target.closest('.gallery__grid-item').remove();
  }

  static #onPictureClick(evt) {
    const {target: img} = evt;

    const zoomPreviewPopup = document.querySelector('.zoom-preview');
    const zoomPreviewPopupImage = zoomPreviewPopup.querySelector('.zoom-preview__image');
    const zoomPreviewPopupCaption = zoomPreviewPopup.querySelector('.zoom-preview__caption');

    zoomPreviewPopupImage.src = img.src;
    zoomPreviewPopupImage.alt = img.alt;
    zoomPreviewPopupCaption.textContent = img.alt;

    showPopup(zoomPreviewPopup);
  }

  getElement() {
    const cardElement = this.#template.cloneNode(true);

    cardElement.querySelector('.gallery__card-name').textContent = this.#cardData.name;
    cardElement.querySelector('.gallery__card-like').addEventListener('click', Card.#onLikeButtonClick);
    cardElement.querySelector('.gallery__card-delete').addEventListener('click', Card.#onDeleteButtonClick);

    const cardImage = cardElement.querySelector('.gallery__card-image');
    cardImage.src = this.#cardData.link;
    cardImage.alt = this.#cardData.name;
    cardImage.addEventListener('click', Card.#onPictureClick);

    const gridElement = document.createElement('li');
    gridElement.classList.add('gallery__grid-item');
    gridElement.append(cardElement);

    return gridElement;
  }
}
