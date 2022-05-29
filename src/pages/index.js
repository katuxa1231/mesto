import './../pages/index.css';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const formAdd = document.querySelector('.form_add');
const formEdit = document.querySelector('.form_edit');
const nameInput = formEdit.querySelector('.form__input-name');
const jobInput = formEdit.querySelector('.form__input-job');

const templateSelector = '#card-template';
const cardContainer = new Section({ items: initialCards, renderer: renderCards }, '.photo-cards');
const userInfo = new UserInfo({ userNameSelector: '.profile__title', userInfoSelector: '.profile__subtitle' })
const popupEdit = new PopupWithForm('.popup_edit', handleFormEditSubmit);
const popupAdd = new PopupWithForm('.popup_add', handleFormAddSubmit);
const popupView = new PopupWithImage('.popup_view-image');
const formValidators = {};
const validationParams = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

function fillProfileForm() {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.info;
}

function renderCards(card) {
    const cardElement = createCard(card.name, card.link);
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

function createCard(name, link) {
  const card = new Card(name, link, templateSelector, popupView.open.bind(popupView));
  return card.createCard();
}

function handleFormAddSubmit({name, link}) {
  const newCard = createCard(name, link);
  cardContainer.addItem(newCard);
}

function handleFormEditSubmit({name, info}) {
  userInfo.setUserInfo(name, info)
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

buttonEdit.addEventListener('click', handleEditButtonClick);
buttonAdd.addEventListener('click', handleAddButtonClick);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupView.setEventListeners();

cardContainer.renderElements();
enableValidation(validationParams);
