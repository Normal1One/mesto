import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

const formElementAdd = document.getElementById('add-element');
const formElementEdit = document.getElementById('edit-profile');

const popupImageContent = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-edit');
const popupCard = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-image');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const nameValue = document.querySelector('.profile__info-name');
const jobValue = document.querySelector('.profile__info-job');

const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const titleInput = document.querySelector('#title-input');
const urlInput = document.querySelector('#url-input');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  jobValue.textContent = jobInput.value;
  nameValue.textContent = nameInput.value;
  closePopup(popupProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: urlInput.value,
  };
  elementsList.prepend(createCard(data));
  formElementAdd.reset();
  closePopup(popupCard);
}

function createCard(item) {
  const card = new Card(item, elementTemplate, handleCardClick);
  return card.generateCard();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupHandler);
}

function openFormPopup(popup) {
  if (popup.querySelector(config.formSelector).getAttribute('id') === 'add-element') {
    formValidators['add-element'].resetError(popup.querySelector(config.formSelector));
  } else if (popup.querySelector(config.formSelector).getAttribute('id') === 'edit-profile') {
    formValidators['edit-profile'].resetError(popup.querySelector(config.formSelector));
  }
  openPopup(popup);
}

function openProfilePopup() {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  openFormPopup(popupProfile);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupHandler);
}

function closePopupHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleCardClick(name, link) {
  popupImageTitle.textContent = name;
  popupImageContent.src = link;
  popupImageContent.alt = name + ' фото';
  openPopup(popupImage);
}

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleCardFormSubmit);
buttonAdd.addEventListener('click', function () {
  openFormPopup(popupCard);
});
buttonEdit.addEventListener('click', openProfilePopup);
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
    evt.stopImmediatePropagation();
  });
});

initialCards.forEach( element => {
  elementsList.append(createCard(element));
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('id');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);
