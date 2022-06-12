export class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeButtonClick, handleDeleteButtonClick) {
    this._cardId = data.cardId;
    this._title = data.title;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.ownerId;
    this._currentUserId = data.currentUserId;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._likeButtonActiveClass = 'photo-card__like-button_active';
  }

  set likes(likes){
    this._likes = likes;
  }

  _setDeleteButtonVisibility() {
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.classList.add('photo-card__delete-button_hidden');
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick(this._title, this._link));
    this._likeButton.addEventListener('click', () => this._handleLikeButtonClick(this));
    this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick(this));
  }

  getId() {
    return this._cardId;
  }

  remove() {
    this._cardElement.remove();
  }

  isLiked() {
    return this._likes.findIndex((like) => like._id === this._currentUserId) > -1;
  }

  setLikeState() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add(this._likeButtonActiveClass);
    } else {
      this._likeButton.classList.remove(this._likeButtonActiveClass);
    }
  }

  createCard() {
    this._cardElement = this._template.querySelector('.photo-card').cloneNode(true);
    this._deleteButton = this._cardElement.querySelector('.photo-card__delete-button');
    this._likeButton = this._cardElement.querySelector('.photo-card__like-button');
    this._likeCounter = this._cardElement.querySelector('.photo-card__like-counter');
    this.setLikeState();
    this._setDeleteButtonVisibility();
    this._image = this._cardElement.querySelector('.photo-card__image');
    this._cardElement.querySelector('.photo-card__title').textContent = this._title;
    this._image.src = this._link;
    this._image.alt = this._title;
    this._setEventListeners();

    return this._cardElement;
  }
}
