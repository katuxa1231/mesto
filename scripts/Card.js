import { openPopup } from './index.js';

export class Card {
  constructor(title, link, template) {
    this._title = title;
    this._link = link;
    this._template = template;
    this._popupView = document.querySelector('.popup_view-image');
    this._popupViewImage = this._popupView.querySelector('.popup__image');
    this._popupCaption = this._popupView.querySelector('.popup__caption');
  }

  _handleImageClick(title, link) {
    return () => {
      this._popupViewImage.src = link;
      this._popupViewImage.alt = title;
      this._popupCaption.textContent = title;
      openPopup(this._popupView);
    }
  }

  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle('photo-card__like-button_active');
  }

  _handleDeleteButtonClick(cardElement) {
    return () => {
      cardElement.remove();
    }
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector('.photo-card__like-button');
    const deleteButton = cardElement.querySelector('.photo-card__delete-button');
    this._image.addEventListener('click', this._handleImageClick(this._title, this._link));
    likeButton.addEventListener('click', this._handleLikeButtonClick);
    deleteButton.addEventListener('click', this._handleDeleteButtonClick(cardElement));
  }

  createCard() {
    const cardElement = this._template.querySelector('.photo-card').cloneNode(true);
    this._image = cardElement.querySelector('.photo-card__image');

    cardElement.querySelector('.photo-card__title').textContent = this._title;
    this._image.src = this._link;
    this._image.alt = this._title;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
