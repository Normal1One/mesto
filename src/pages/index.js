import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { config, elementTemplate, buttonAdd, buttonEdit } from "../utils/constants.js";
import initialCards from "../utils/cards.js";
import './index.css';

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

const elementPopup = new PopupWithForm('#popup-add', {
  handleFormSubmit: () => {
    const data = elementPopup._getInputValues();
    const card = new Card(data, elementTemplate, cardClickHandler)
    const cardElement = card.generateCard();
    sectionElements.addItem(cardElement);
  }
});

function openAddPopup() {
  formValidators['add-element'].resetValidation();
  elementPopup.open();
}

function openEditPopup() {
  formValidators['edit-profile'].resetValidation();
  profilePopup.open();
}

function openProfilePopup() {
  const data = userInfo.getUserInfo();
  profilePopup.setInputValues(data);
  openEditPopup();
}

buttonAdd.addEventListener('click', function () {
  openAddPopup();
});
buttonEdit.addEventListener('click', openProfilePopup);

const sectionElements = new Section({ items: initialCards, renderer: (item) => {
    const card = new Card(item, elementTemplate, cardClickHandler)
    const cardElement = card.generateCard();
    sectionElements.prependItem(cardElement);
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
