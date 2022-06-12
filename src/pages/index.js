import './../pages/index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import { Api } from '../components/Api';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { popupsSelectors, templateSelector, validationParams } from '../utils/constants';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar')
const formEditAvatar = document.querySelector('.form_edit-avatar');
const formAdd = document.querySelector('.form_add');
const formEdit = document.querySelector('.form_edit');
const nameInput = formEdit.querySelector('.form__input-name');
const jobInput = formEdit.querySelector('.form__input-job');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '4bb64700-9f18-42f4-ba6b-cae0ce94f4a2',
    'Content-Type': 'application/json'
  }
});
const cardContainer = new Section(renderCards, '.photo-cards');
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
  userInfoAvatarSelector: '.profile__avatar'
})
const popupEdit = new PopupWithForm(popupsSelectors.editPopup, handleFormEditSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(popupsSelectors.addPopup, handleFormAddSubmit);
popupAdd.setEventListeners();
const popupEditAvatar = new PopupWithForm(popupsSelectors.editAvatarPopup, handleFormEditAvatarSubmit);
popupEditAvatar.setEventListeners();
const popupView = new PopupWithImage(popupsSelectors.imagePopup);
popupView.setEventListeners();
const popupConfirm = new PopupWithConfirmation(popupsSelectors.confirmPopup);
popupConfirm.setEventListeners();
const formValidators = {};
let currentUser = null;

function fillProfileForm() {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.info;
}

function renderCards(card) {
  const cardElement = createCard(card);
  cardContainer.addItem(cardElement);
}

function enableValidation(params) {
  const formList = document.querySelectorAll('.form');
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(params, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

function createCard(cardData) {
  const data = {
    cardId: cardData._id,
    title: cardData.name,
    link: cardData.link,
    likes: cardData.likes,
    ownerId: cardData.owner._id,
    currentUserId: currentUser._id
  }
  const card = new Card(data, templateSelector, popupView.open.bind(popupView), handleLikeButtonClick, handleDeleteButtonClick);
  return card.createCard();
}

function handleLikeButtonClick(card) {
  if (card.isLiked()) {
    api.deleteLike(card.getId())
      .then((res) => {
        card.likes = res.likes;
        card.setLikeState();
      })
      .catch((err) => console.log(`Error: ${err}`))
  } else {
    api.addLike(card.getId())
      .then((res) => {
        card.likes = res.likes;
        card.setLikeState();
      })
      .catch((err) => console.log(`Error: ${err}`))
  }
}

function handleDeleteButtonClick(card) {
  popupConfirm.open();
  popupConfirm.setConfirmCallback(() => {
    popupConfirm.renderLoading(true, 'Удаление...');
    api.deleteCard(card.getId())
      .then(() => {
        card.remove();
        popupConfirm.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => popupConfirm.renderLoading(false))
  })
}

function handleFormAddSubmit({ name, link }) {
  popupAdd.renderLoading(true);
  return api.addCard(name, link)
    .then((res) => {
      const newCard = createCard(res);
      cardContainer.addItem(newCard);
      popupAdd.close();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => popupAdd.renderLoading(false, 'Создать'))
}

function handleFormEditSubmit({ name, info }) {
  popupEdit.renderLoading(true);
  return api.updateUserInfo(name, info)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEdit.close();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => popupEdit.renderLoading(false))
}

function handleFormEditAvatarSubmit({ avatar }) {
  popupEditAvatar.renderLoading(true);
  return api.updateUserAvatar(avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar)
      popupEditAvatar.close();
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => popupEditAvatar.renderLoading(false))
}

function handleEditButtonClick() {
  formValidators[formEdit.getAttribute('name')].resetValidation(validationParams);
  fillProfileForm();
  popupEdit.open();
}

function handleAddButtonClick() {
  formValidators[formAdd.getAttribute('name')].resetValidation(validationParams);
  popupAdd.open();
}

function handleAvatarClick() {
  formValidators[formEditAvatar.getAttribute('name')].resetValidation(validationParams);
  popupEditAvatar.open();
}

buttonEdit.addEventListener('click', handleEditButtonClick);
buttonAdd.addEventListener('click', handleAddButtonClick);
avatarButton.addEventListener('click', handleAvatarClick);

enableValidation(validationParams);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    currentUser = userData;
    cardContainer.renderElements(cards);
    userInfo.setUserInfo(currentUser.name, currentUser.about);
    userInfo.setUserAvatar(currentUser.avatar);
  })
  .catch((err) => console.log(`Error: ${err}`))
