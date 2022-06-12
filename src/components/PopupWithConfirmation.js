import { Popup } from './Popup';

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._confirmButton = this._form.querySelector('.form__submit-button');
  }

  setConfirmCallback(callback) {
    this._handleConfirmCallback = callback;
  }

  renderLoading(isLoading, buttonText = null) {
    if (isLoading) {
      this._confirmButton.textContent = buttonText ?? 'Выполняется...';
    } else {
      this._confirmButton.textContent = buttonText ?? 'Да';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmCallback();
    })
  }
}
