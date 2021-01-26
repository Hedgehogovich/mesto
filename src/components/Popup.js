export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._rootElement = document.querySelector('.root');

    this._escapeMethodBinding = this._handleEscClose.bind(this);
  }

  open() {
    this._rootElement.classList.add('root_opened');
    this._element.classList.add('popup_opened');
    document.addEventListener('keyup', this._escapeMethodBinding);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._escapeMethodBinding);
    this._rootElement.classList.remove('root_opened');
  }

  _handleEscClose({key}) {
    if (key === 'Escape') {
      this.close();
    }
  }

  _handleBackgroundClick({target}) {
    if (target === this._element) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', this._handleBackgroundClick.bind(this));
  }
}
