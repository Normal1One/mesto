let formElement = document.querySelector('.popup__form');
let profileInfoElement = document.querySelector('.profile__info');
let popUp = document.querySelector('.popup');

let closeButton = popUp.querySelector('.popup__close-button');
let editButton = profileInfoElement.querySelector('.profile__edit-button');

let nameValue = profileInfoElement.querySelector('.profile__info_name');
let jobValue = profileInfoElement.querySelector('.profile__info_job');

let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  jobValue.textContent = jobInput.value;
  nameValue.textContent = nameInput.value;
  closePopUp();
}

function openPopUp() {
  popUp.classList.add('popup_opened');
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);
