import Popup from '~src/components/Popup';

export default class CardRemovingPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._handleSubmit = null;
    this._formElement = this._element.querySelector('.edit-form');
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._handleSubmit();
    this.close();
  }

  open(handleSubmit) {
    this._handleSubmit = handleSubmit;
    this._formElement.addEventListener('submit', this._onSubmit);
    super.open();
  }

  close() {
    super.close();
    this._formElement.removeEventListener('submit', this._onSubmit);
    this._handleSubmit = null;
  }
}
