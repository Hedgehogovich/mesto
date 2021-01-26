import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._element.querySelector('.zoom-preview__image');
    this._captionElement = this._element.querySelector('.zoom-preview__caption');
  }

  open({link, name}) {
    this._imageElement.src = link;
    this._imageElement.alt = name
    this._captionElement.textContent = name;

    super.open();
  }
}
