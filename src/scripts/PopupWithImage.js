import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupView = document.querySelector('.popup_view-image');
    this._popupViewImage = this._popupView.querySelector('.popup__image');
    this._popupCaption = this._popupView.querySelector('.popup__caption');
  }

  open(title, link) {
    super.open();
    this._popupViewImage.src = link;
    this._popupViewImage.alt = title;
    this._popupCaption.textContent = title;
  }
}
