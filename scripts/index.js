const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

const formElementAdd = document.getElementById('add-element');
const formElementEdit = document.getElementById('edit-profile');

const popupImageContent = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title');

const popupList = document.querySelectorAll('.popup');
const popupImage = document.querySelector('#popup-image');
const popupProfile = document.querySelector('#popup-edit');
const popupCard = document.querySelector('#popup-add');

const buttonClose = document.querySelectorAll('.popup__close-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const nameValue = document.querySelector('.profile__info-name');
const jobValue = document.querySelector('.profile__info-job');

const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const titleInput = document.querySelector('#title-input');
const urlInput = document.querySelector('#url-input');

function addElements(data) {
  const elementElement = elementTemplate.cloneNode(true);
  elementElement.querySelector('.element__title').textContent = data.name;
  elementElement.querySelector('.element__image').src = data.link;
  elementElement.querySelector('.element__image').alt = data.name + ' фото';
  elementElement.querySelector('.element__image-button').addEventListener('click', () => {
    handlePreviewPicture(data);
  });
  elementElement.querySelector('.like-button').addEventListener('click', handleLikeIcon);
  elementElement.querySelector('.delete-button').addEventListener('click', handleDeleteIcon);
  return elementElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  jobValue.textContent = jobInput.value;
  nameValue.textContent = nameInput.value;
  closePopup(popupProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {name: titleInput.value, link: urlInput.value};
  elementsList.prepend(addElements(data));
  formElementAdd.reset();
  closePopup(popupCard);
}

function handleLikeIcon(evt) {
  evt.target.classList.toggle('like-button_active');
}

function handleDeleteIcon(evt) {
  evt.target.closest('.element').remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupHandler);
}

function openFormPopup(popup) {
  resetError(popup.querySelector(config.formSelector), config);
  openPopup(popup);
}

function handlePreviewPicture(data) {
  popupImageTitle.textContent = data.name;
  popupImageContent.src = data.link;
  popupImageContent.alt = data.name;
  openPopup(popupImage);
}

function openProfilePopup() {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  openFormPopup(popupProfile);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupHandler);
}

function closePopupHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleCardFormSubmit);
buttonAdd.addEventListener('click', function () {
  openFormPopup(popupCard);
});
buttonEdit.addEventListener('click', openProfilePopup);
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
    evt.stopImmediatePropagation();
  });
});

initialCards.forEach( element => {
  elementsList.append(addElements(element));
});
