import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

  setConfirmCallback(callback) {
    this._handleConfirmCallback = callback;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmCallback();
    })
  }
}
