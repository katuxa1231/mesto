import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const result = {};
    for(const item of formData.entries()) {
      result[item[0]] = item[1];
    }
    return result;
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._onSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }
}
