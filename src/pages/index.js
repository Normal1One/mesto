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
} from "../utils/constants.js";
import './index.css';

const popupWithImage = new PopupWithImage('#popup-image');
const deletePopup = new Popup('#popup-delete');
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'fec95476-65d9-4fdf-85cc-c952cc17e6d7',
    'Content-Type': 'application/json'
  }
});

let userInfo;
let sectionElements;

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    userInfo = new UserInfo('.profile__info-name', '.profile__info-job', '.profile__avatar', profileData);
    userInfo.setUserInfo(profileData);
    sectionElements = new Section({ renderer: (item) => {
        const cardElement = createCard(item);
        sectionElements.addItem(cardElement);
      }
    }, '.elements');
    sectionElements.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })

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
    .then(() => {
      popup.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

const unlikeImageHandler = (id, element, evt) => {
  api.unlikeImage(id)
    .then((res) => {
      renderLikesCount(res, element);
    })
    .then(() => {
      evt.target.classList.remove('like-button_active');
    })
    .catch((err) => {
      console.log(err);
    })
}

const likeImageHandler = (id, element, evt) => {
  api.likeImage(id)
    .then((res) => {
      renderLikesCount(res, element);
    })
    .then(() => {
      evt.target.classList.add('like-button_active');
    })
    .catch((err) => {
      console.log(err);
    })
}

function createCard(item) {
  const card = new Card(item, elementTemplate, cardClickHandler, deletePopup, likeImageHandler, unlikeImageHandler, deleteCardHandler, userInfo._userId);
  return card.generateCard();
}

const avatarPopup = new PopupWithForm('#popup-avatar', {
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.changeProfilePhoto(data.link)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .then(() => {
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      })
  }
});

const profilePopup = new PopupWithForm('#popup-edit', {
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.changeProfileInfo(data.name, data.info)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .then(() => {
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      })
  }
});

const elementPopup = new PopupWithForm('#popup-add', {
  handleFormSubmit: (data) => {
    elementPopup.renderLoading(true);
    api.createCard(data.name, data.link)
      .then((res) => {
        const cardElement = createCard(res);
        sectionElements.prependItem(cardElement);
      })
      .then(() => {
        elementPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        elementPopup.renderLoading(false);
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
