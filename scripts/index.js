const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

const formElement = document.querySelectorAll('.popup__form');

const buttonClose = document.querySelectorAll('.popup__close-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const nameValue = document.querySelector('.profile__info-name');
const jobValue = document.querySelector('.profile__info-job');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#url');

function addElements(data) {
  const elementElement = elementTemplate.cloneNode(true);
  elementElement.querySelector('.element__title').textContent = data.name;
  elementElement.querySelector('.element__image').src = data.link;
  elementElement.querySelector('.element__image').alt = data.name + ' фото';
  elementElement.querySelector('.element__image-button').addEventListener('click', handlePreviewPicture)
  elementElement.querySelector('.like-button').addEventListener('click', handleLikeIcon);
  elementElement.querySelector('.delete-button').addEventListener('click', handleDeleteIcon);
  return elementElement;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target.closest('#popup-edit') !== null) {
    jobValue.textContent = jobInput.value;
    nameValue.textContent = nameInput.value;
  } else {
    let data = [{name: titleInput.value, link: urlInput.value}]
    data.forEach( element => {
      elementsList.prepend(addElements(element))
    });
    titleInput.value = '';
    urlInput.value = '';
  }
  closePopup(evt);
};

function handleLikeIcon(evt) {
  evt.target.classList.toggle('like-button_active');
};

function handleDeleteIcon(evt) {
  evt.target.parentNode.remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function openElementPopup() {
  openPopup(document.querySelector('#popup-add'))
}

function handlePreviewPicture(data) {
  document.querySelector('.popup__image-title').textContent = data.target.closest('.element').querySelector('.element__title').textContent;
  document.querySelector('.popup__image').src = data.target.src;
  openPopup(document.querySelector('#popup-image'))
};

function openProfilePopup() {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  openPopup(document.querySelector('#popup-edit'));
}

function closePopup(popup) {
  popup.target.closest('.popup').classList.remove('popup_opened');
};

formElement.forEach( element => {
  element.addEventListener('submit', handleProfileFormSubmit);
});
buttonClose.forEach( element => {
  element.addEventListener('click', closePopup);
});
buttonEdit.addEventListener('click', openProfilePopup);
buttonAdd.addEventListener('click', openElementPopup);

initialCards.forEach( element => {
  elementsList.append(addElements(element))
})
