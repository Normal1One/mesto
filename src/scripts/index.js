import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import initialCards from "./cards.js";
import '../pages/index.css';

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

const popupProfile = document.querySelector('#popup-edit');
const popupCard = document.querySelector('#popup-add');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const titleInput = document.querySelector('#title-input');
const urlInput = document.querySelector('#url-input');

const popupWithImage = new PopupWithImage('#popup-image');

const userInfo = new UserInfo('.profile__info-name', '.profile__info-job');

const profilePopup = new PopupWithForm('#popup-edit', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

const cardClickHandler = (item) => {
  popupWithImage.open(item);
}

function createCard(item) {
  const card = new Card(item, elementTemplate, cardClickHandler);
  return card.generateCard();
}

const elementPopup = new PopupWithForm('#popup-add', {
  handleFormSubmit: () => {
    const data = {
      name: titleInput.value,
      link: urlInput.value,
    };
    elementsList.prepend(createCard(data));
  }
});

function openFormPopup(popup) {
  if (popup.querySelector(config.formSelector).getAttribute('id') === 'add-element') {
    formValidators['add-element'].resetError(popup.querySelector(config.formSelector));
    elementPopup.open();
  } else if (popup.querySelector(config.formSelector).getAttribute('id') === 'edit-profile') {
    formValidators['edit-profile'].resetError(popup.querySelector(config.formSelector));
    profilePopup.open();
  }
}

function openProfilePopup() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
  openFormPopup(popupProfile);
}

buttonAdd.addEventListener('click', function () {
  openFormPopup(popupCard);
});
buttonEdit.addEventListener('click', openProfilePopup);

const sectionElements = new Section({ items: initialCards, renderer: (item) => {
    sectionElements.addItem(createCard(item));
  }
}, '.elements');

sectionElements.renderItems();

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

profilePopup.setEventListeners();
elementPopup.setEventListeners();
popupWithImage.setEventListeners();
