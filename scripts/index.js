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

const formAdd = document.querySelector('.form_add');
const placeInput = formAdd.querySelector('.form__input-place');
const urlInput = formAdd.querySelector('.form__input-url');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.photo-cards');

const popupView = document.querySelector('.popup_view-image');
const popupViewImage = popupView.querySelector('.popup__image');
const popupCaption = popupView.querySelector('.popup__caption');
const popupViewCloseButton = popupView.querySelector('.popup__close-button');

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

  image.addEventListener('click', () => {
    popupViewImage.src = link;
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

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(placeInput.value, urlInput.value);
  cardContainer.prepend(newCard);
  formAdd.reset();
  closePopup(popupAdd);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleEditButtonClick() {
  openPopup(popupEdit);
  fillProfileForm();
}

function handleAddButtonClick() {
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

buttonEdit.addEventListener('click', handleEditButtonClick);
buttonAdd.addEventListener('click', handleAddButtonClick);
popupEditCloseButton.addEventListener('click', handlePopupEditCloseButtonClick);
popupAddCloseButton.addEventListener('click', handlePopupAddCloseButtonClick);
popupViewCloseButton.addEventListener('click', handlePopupViewCloseButtonClick);
formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

init(cardContainer, initialCards);


