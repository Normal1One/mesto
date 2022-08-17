const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

const formElementAdd = document.getElementById('add-element');
const formElementEdit = document.getElementById('edit-profile');

const popupImage = document.querySelector('#popup-image');
const popupProfile = document.querySelector('#popup-edit');
const popupCard = document.querySelector('#popup-add');

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
  elementElement.querySelector('.element__image-button').addEventListener('click', handlePreviewPicture);
  elementElement.querySelector('.like-button').addEventListener('click', handleLikeIcon);
  elementElement.querySelector('.delete-button').addEventListener('click', handleDeleteIcon);
  return elementElement;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  jobValue.textContent = jobInput.value;
  nameValue.textContent = nameInput.value;
  closePopup(evt);
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let data = [{name: titleInput.value, link: urlInput.value}];
  data.forEach( element => {
    elementsList.prepend(addElements(element));
  });
  formElementAdd.reset()
  closePopup(evt);
};

function handleLikeIcon(evt) {
  evt.target.classList.toggle('like-button_active');
};

function handleDeleteIcon(evt) {
  evt.target.parentNode.remove();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function handlePreviewPicture(data) {
  document.querySelector('.popup__image-title').textContent = data.target.closest('.element').querySelector('.element__title').textContent;
  document.querySelector('.popup__image').src = data.target.src;
  openPopup(popupImage);
};

function openProfilePopup() {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  openPopup(popupProfile);
};

function closePopup(popup) {
  popup.target.closest('.popup').classList.remove('popup_opened');
};

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleCardFormSubmit);
buttonClose.forEach( element => {
  element.addEventListener('click', closePopup);
});
buttonAdd.addEventListener('click', function () {
  openPopup(popupCard)
});
buttonEdit.addEventListener('click', openProfilePopup);

initialCards.forEach( element => {
  elementsList.append(addElements(element));
});
