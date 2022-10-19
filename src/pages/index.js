import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import Popup from "../components/Popup";
import {
  config,
  elementTemplate,
  buttonAdd,
  buttonEdit,
  buttonAvatar,
  avatar,
  name,
  info,
  avatarSubmitButton,
  profileSubmitButton,
  imageSubmitButton
} from "../utils/constants.js";
import './index.css';

const popupWithImage = new PopupWithImage('#popup-image');
const deletePopup = new Popup('#popup-delete');
const userInfo = new UserInfo('.profile__info-name', '.profile__info-job');
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'fec95476-65d9-4fdf-85cc-c952cc17e6d7',
    'Content-Type': 'application/json'
  }
});

function renderProfileInfo() {
  api.getProfileInfo()
    .then((result) => {
      name.textContent = result.name;
      info.textContent = result.about;
      avatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
}

renderProfileInfo();

function renderAvatarLoading(isLoading) {
  if (isLoading) {
    avatarSubmitButton.textContent = 'Сохранение...';
  } else {
    avatarSubmitButton.textContent = 'Сохранить';
  }
}

function renderProfileLoading(isLoading) {
  if (isLoading) {
    profileSubmitButton.textContent = 'Сохранение...';
  } else {
    profileSubmitButton.textContent = 'Сохранить';
  }
}

function renderImageLoading(isLoading) {
  if (isLoading) {
    imageSubmitButton.textContent = 'Создание...';
  } else {
    imageSubmitButton.textContent = 'Создать';
  }
}

const cardClickHandler = (item) => {
  popupWithImage.open(item);
}

function openAvatarPopup() {
  formValidators['edit-avatar'].resetValidation();
  avatarPopup.open();
}

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

function renderLikesCount(result, element) {
  element.textContent = result.likes.length;
}

const deleteCardHandler = (id, evt, popup) => {
  api.deleteCard(id)
    .then(() => {
      evt.target.closest('.element').remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popup.close();
    })
}

const unlikeImageHandler = (id, element) => {
  api.unlikeImage(id)
    .then((res) => {
      renderLikesCount(res, element);
    })
    .catch((err) => {
      console.log(err);
    })
}

const likeImageHandler = (id, element) => {
  api.likeImage(id)
    .then((res) => {
      renderLikesCount(res, element);
    })
    .catch((err) => {
      console.log(err);
    })
}

function createCard(item) {
  const card = new Card(item, elementTemplate, cardClickHandler, deletePopup, likeImageHandler, unlikeImageHandler, deleteCardHandler);
  return card.generateCard();
}

api.getInitialCards()
  .then((res) => {
    const sectionElements = new Section({ items: res, renderer: (item) => {
        const cardElement = createCard(item);
        sectionElements.addItem(cardElement);
      }
    }, '.elements');
    sectionElements.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })

const avatarPopup = new PopupWithForm('#popup-avatar', {
  handleFormSubmit: (data) => {
    renderAvatarLoading(true);
    api.changeProfilePhoto(data.link)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderAvatarLoading(false);
        renderProfileInfo();
      })
  }
});

const profilePopup = new PopupWithForm('#popup-edit', {
  handleFormSubmit: (data) => {
    renderProfileLoading(true);
    api.changeProfileInfo(data.name, data.info)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderProfileLoading(false);
        renderProfileInfo();
      })
  }
});

const elementPopup = new PopupWithForm('#popup-add', {
  handleFormSubmit: (data) => {
    renderImageLoading(true);
    api.createCard(data.name, data.link)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderImageLoading(false);
      })
  }
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

buttonAdd.addEventListener('click', function () {
  openAddPopup();
});
buttonEdit.addEventListener('click', openProfilePopup);
buttonAvatar.addEventListener('click', openAvatarPopup);

deletePopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
elementPopup.setEventListeners();
popupWithImage.setEventListeners();
