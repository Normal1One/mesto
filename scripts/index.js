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

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-edit');
const popupCard = document.querySelector('#popup-add');

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
  const card = new Card(data, elementTemplate);
  const cardElement = card.generateCard();

  elementsList.prepend(cardElement);
  formElementAdd.reset();
  closePopup(popupCard);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupHandler);
}

function openFormPopup(popup) {
  const form = new FormValidator(config, popup.querySelector(config.formSelector));
  form.resetError(popup.querySelector(config.formSelector));
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
  const card = new Card(element, elementTemplate);
  const cardElement = card.generateCard();

  elementsList.append(cardElement);
});

document.querySelectorAll(config.formSelector).forEach( item => {
  const form = new FormValidator(config, item);
  form.enableValidation();
})
