import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const result = {};
    for(const item of formData.entries()) {
      result[item[0]] = item[1];
    }
    return result;
  }

  renderLoading(isLoading, buttonText = null) {
    if (isLoading) {
      this._submitButton.textContent = buttonText ?? 'Загрузка...';
    } else {
      this._submitButton.textContent = buttonText ?? 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
