import { openPopup } from './index.js';

export class Card {
  constructor(title, link, template) {
    this._title = title;
    this._link = link;
    this._template = template;
  }

  _handleImageClick(title, link) {
    return () => {
      const popupView = document.querySelector('.popup_view-image');
      const popupViewImage = popupView.querySelector('.popup__image');
      const popupCaption = popupView.querySelector('.popup__caption');
      popupViewImage.src = link;
      popupViewImage.alt = title;
      popupCaption.textContent = title;
      openPopup(popupView);
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

  createCard() {
    const cardElement = this._template.querySelector('.photo-card').cloneNode(true);
    const image = cardElement.querySelector('.photo-card__image');
    const likeButton = cardElement.querySelector('.photo-card__like-button');
    const deleteButton = cardElement.querySelector('.photo-card__delete-button');

    cardElement.querySelector('.photo-card__title').textContent = this._title;
    image.src = this._link;
    image.alt = this._title;

    image.addEventListener('click', this._handleImageClick(this._title, this._link));
    likeButton.addEventListener('click', this._handleLikeButtonClick);
    deleteButton.addEventListener('click', this._handleDeleteButtonClick(cardElement));

    return cardElement;
  }
}
