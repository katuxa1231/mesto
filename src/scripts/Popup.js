export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  }

  _handleOverviewClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._handleOverviewClick.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleOverviewClick.bind(this))
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
  }
}
