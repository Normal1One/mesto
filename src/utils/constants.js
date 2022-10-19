const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

const elementTemplate = document.querySelector('.element-template').content;
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar-content');
const avatar = document.querySelector('.profile__avatar');
const name = document.querySelector('.profile__info-name');
const info = document.querySelector('.profile__info-job');
const avatarSubmitButton = document.querySelector('#avatar-submit');
const profileSubmitButton = document.querySelector('#profile-submit');
const imageSubmitButton = document.querySelector('#image-submit');

export { config, elementTemplate, buttonEdit, buttonAdd, buttonAvatar, avatar, name, info, avatarSubmitButton, profileSubmitButton, imageSubmitButton };
