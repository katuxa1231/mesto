export class Card {
  constructor(title, link, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('photo-card__like-button_active');
  }

  _handleDeleteButtonClick() {
      this._cardElement.remove();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.photo-card__like-button');
    const deleteButton = this._cardElement.querySelector('.photo-card__delete-button');
    this._image.addEventListener('click', () => this._handleCardClick(this._title, this._link));
    this._likeButton.addEventListener('click', () => this._handleLikeButtonClick());
    deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
  }

  createCard() {
    this._cardElement = this._template.querySelector('.photo-card').cloneNode(true);
    this._image = this._cardElement.querySelector('.photo-card__image');
    this._cardElement.querySelector('.photo-card__title').textContent = this._title;
    this._image.src = this._link;
    this._image.alt = this._title;
    this._setEventListeners();

    return this._cardElement;
  }
}
