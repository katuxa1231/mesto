import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const popupEdit = document.querySelector('.popup_edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');

const popupAdd = document.querySelector('.popup_add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');

const formEdit = document.querySelector('.form_edit');
const nameInput = formEdit.querySelector('.form__input-name');
const jobInput = formEdit.querySelector('.form__input-job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const saveButtonEdit = formEdit.querySelector('.form__submit-button');

const formAdd = document.querySelector('.form_add');
const placeInput = formAdd.querySelector('.form__input-place');
const urlInput = formAdd.querySelector('.form__input-url');
const saveButtonAdd = formAdd.querySelector('.form__submit-button');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.photo-cards');

const popupView = document.querySelector('.popup_view-image');
const popupViewCloseButton = popupView.querySelector('.popup__close-button');

const formValidators = {};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupListeners(popup);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupListeners(popup);
};

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function init(container, cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    container.append(cardElement);
  });
}

function addPopupListeners(overlay) {
  overlay.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeyDown);
}

function removePopupListeners(overlay) {
  overlay.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleKeyDown);
}

function enableValidation(params) {
  const formList = document.querySelectorAll('.form');
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(params, formElement);
    const formName = formElement.getAttribute('name')
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

function createCard(name, link) {
  const card = new Card(name, link, cardTemplate);
  return card.createCard();
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(placeInput.value, urlInput.value);
  cardContainer.prepend(newCard);
  closePopup(popupAdd);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleEditButtonClick() {
  formValidators[formEdit.getAttribute('name')].resetValidation();
  fillProfileForm();
  openPopup(popupEdit);
}

function handleAddButtonClick() {
  formAdd.reset();
  formValidators[formAdd.getAttribute('name')].resetValidation();
  openPopup(popupAdd);
}

function handlePopupEditCloseButtonClick() {
  closePopup(popupEdit);
}

function handlePopupAddCloseButtonClick() {
  closePopup(popupAdd);
}

function handlePopupViewCloseButtonClick() {
  closePopup(popupView);
}

function handleKeyDown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

buttonEdit.addEventListener('click', handleEditButtonClick);
buttonAdd.addEventListener('click', handleAddButtonClick);
popupEditCloseButton.addEventListener('click', handlePopupEditCloseButtonClick);
popupAddCloseButton.addEventListener('click', handlePopupAddCloseButtonClick);
popupViewCloseButton.addEventListener('click', handlePopupViewCloseButtonClick);
formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

init(cardContainer, initialCards);

enableValidation({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

export { openPopup };
