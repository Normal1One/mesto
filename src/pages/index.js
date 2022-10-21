import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  config,
  elementTemplate,
  buttonAdd,
  buttonEdit,
  buttonAvatar,
} from "../utils/constants.js";
import './index.css';

const popupWithConfirmation = new PopupWithConfirmation('#popup-delete');
const popupWithImage = new PopupWithImage('#popup-image');
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'fec95476-65d9-4fdf-85cc-c952cc17e6d7',
    'Content-Type': 'application/json'
  }
});

let userInfo = new UserInfo('.profile__info-name', '.profile__info-job', '.profile__avatar');
let sectionElements = new Section({ renderer: (item) => {
    const card = new Card(
      item,
      elementTemplate,
      handleCardClick,
      handleLikeClick,
      handleDeleteClick,
      userInfo._userId,
    );
    return card.generateCard();
  }
}, '.elements');

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    userInfo.setUserInfo(profileData);
    sectionElements.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })

const handleCardClick = (item) => {
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

function removeLike(data) {
  api.unlikeImage(data._id)
    .then((res) => {
      data.removeLike(res);
    })
    .catch((err) => {
      console.log(err);
    })
}

function addLike(data) {
  api.likeImage(data._id)
    .then((res) => {
      data.addLike(res);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleLikeClick(data) {
  if (data._likeButton.classList.contains('like-button_active')) {
    removeLike(data);
  } else {
    addLike(data);
  }
}

function handleDeleteClick(card, evt) {
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmitAction(() => {
    api.deleteCard(card._id)
      .then(() => {
        evt.target.closest('.element').remove();
      })
      .then(() => {
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
  })
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
        sectionElements.prependItem(res);
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

buttonAdd.addEventListener('click', openAddPopup);
buttonEdit.addEventListener('click', openProfilePopup);
buttonAvatar.addEventListener('click', openAvatarPopup);

popupWithConfirmation.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
elementPopup.setEventListeners();
popupWithImage.setEventListeners();
