let formElement = document.querySelector('.popup__form');
let profileInfoElement = document.querySelector('.profile__info');
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close-button');
let editButton = profileInfoElement.querySelector('.profile__edit-button');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');


function formSubmitHandler (evt) {
    evt.preventDefault();

    let jobInputValue = jobInput.value;
    let nameInputValue = nameInput.value;

    let jobValue = profileInfoElement.querySelector('.profile__info-job');
    let nameValue = profileInfoElement.querySelector('.profile__info-name');

    jobValue.textContent = jobInputValue;
    nameValue.textContent = nameInputValue;
    closePopUp();
}

function openPopUp() {
  popUp.classList.add('popup_opened');
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);
