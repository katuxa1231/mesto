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
const popupViewImage = popupView.querySelector('.popup__image');
const popupCaption = popupView.querySelector('.popup__caption');
const popupViewCloseButton = popupView.querySelector('.popup__close-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addOverlayListeners(popup);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeOverlayListeners(popup);
};

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function init(container, cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    container.append(cardElement);
  });
}

function createCard(title, link) {
  const cardElement = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const image = cardElement.querySelector('.photo-card__image');
  const likeButton = cardElement.querySelector('.photo-card__like-button');
  const deleteButton = cardElement.querySelector('.photo-card__delete-button');

  cardElement.querySelector('.photo-card__title').textContent = title;
  image.src = link;
  image.alt = title;

  image.addEventListener('click', () => {
    popupViewImage.src = link;
    popupViewImage.alt = title;
    popupCaption.textContent = title;
    openPopup(popupView);
  });

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-card__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}

function clearError(formElement) {
  const inputErrorList = formElement.querySelectorAll('.form__input_type_error');
  if (inputErrorList.length) {
    inputErrorList.forEach((inputErrorElement) => {
      inputErrorElement.classList.remove('form__input_type_error');
      const errorElement = formElement.querySelector(`.${inputErrorElement.id}-error`);
      errorElement.classList.remove('form__input-error_active');
      errorElement.textContent = '';
    });
  }
}

function disabledButton(button) {
  button.classList.add('form__submit-button_inactive');
  button.disabled = true;
}

function addOverlayListeners(overlay) {
  overlay.addEventListener('click', handleOverlayClick);
}

function removeOverlayListeners(overlay) {
  overlay.removeEventListener('click', handleOverlayClick);
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
  clearError(formEdit);
  fillProfileForm();
  disabledButton(saveButtonEdit);
  openPopup(popupEdit);
}

function handleAddButtonClick() {
  formAdd.reset();
  clearError(formAdd);
  disabledButton(saveButtonAdd);
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
  closePopup(evt.target);
}

buttonEdit.addEventListener('click', handleEditButtonClick);
buttonAdd.addEventListener('click', handleAddButtonClick);
popupEditCloseButton.addEventListener('click', handlePopupEditCloseButtonClick);
popupAddCloseButton.addEventListener('click', handlePopupAddCloseButtonClick);
popupViewCloseButton.addEventListener('click', handlePopupViewCloseButtonClick);
formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);
document.addEventListener('keydown', handleKeyDown);

init(cardContainer, initialCards);
