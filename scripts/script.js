const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

const formElement = document.querySelectorAll('.popup__form');

const popUp = document.querySelector('.popup');

const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const nameValue = document.querySelector('.profile__info-name');
const jobValue = document.querySelector('.profile__info-job');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#url');

initialCards.forEach(function (element) {
  const elementElement = elementTemplate.cloneNode(true);

  elementElement.querySelector('.element__title').textContent = element.name;
  elementElement.querySelector('.element__image').src = element.link;
  elementElement.querySelector('.like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('like-button_active');
  });
  elementElement.querySelector('.delete-button').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });

  elementsList.append(elementElement);
})

let imageButton = document.querySelectorAll('.element__image-button');

function formSubmitHandler (evt) {
  evt.preventDefault();
  if (evt.target.parentNode.parentNode.id === 'popup-edit') {
    jobValue.textContent = jobInput.value;
    nameValue.textContent = nameInput.value;
  } else {
    const elementElement = elementTemplate.cloneNode(true);

    elementElement.querySelector('.element__title').textContent = titleInput.value;
    elementElement.querySelector('.element__image').src = urlInput.value;
    elementElement.querySelector('.like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('like-button_active');
    });
    elementElement.querySelector('.delete-button').addEventListener('click', function (evt) {
      evt.target.parentNode.remove();
    });
    elementsList.prepend(elementElement);
  }
  imageButton = document.querySelectorAll('.element__image-button');
  imageButton.forEach (element => {
    element.addEventListener('click', openPopUp);
  });
  closePopUp(evt);
}

function openPopUp(evt) {
  if (evt.target.classList[0] === 'profile__add-button') {
    document.getElementById('popup-add').classList.add('popup_opened');
  } else if (evt.target.classList[0] === 'profile__edit-button') {
    document.getElementById('popup-edit').classList.add('popup_opened');
  } else {
    document.getElementById('popup-image').classList.add('popup_opened');
    document.querySelector('.popup__image-title').textContent = evt.target.parentNode.parentNode.querySelector('.element__title').textContent;
    document.querySelector('.popup__image').src = evt.target.src;
  }
}

function closePopUp(evt) {
  if (evt.target.parentNode.parentNode.id === 'popup-edit') {
    document.getElementById('popup-edit').classList.remove('popup_opened');
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  } else if (evt.target.parentNode.parentNode.id === 'popup-add') {
    document.getElementById('popup-add').classList.remove('popup_opened');
    titleInput.value = '';
    urlInput.value = '';
  } else {
    document.getElementById('popup-image').classList.remove('popup_opened');
  }
}

formElement.forEach( element => {
  element.addEventListener('submit', formSubmitHandler);
});
closeButton.forEach( element => {
  element.addEventListener('click', closePopUp);
});
imageButton.forEach (element => {
  element.addEventListener('click', openPopUp);
});
editButton.addEventListener('click', openPopUp);
addButton.addEventListener('click', openPopUp);
