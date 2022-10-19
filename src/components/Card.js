export class Card {
  constructor(data, cardSelector, handleCardClick, deletePopup, handleImageLike, handleImageUnlike, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name + ' фото';
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._elementTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleImageLike = handleImageLike;
    this._handleImageUnlike = handleImageUnlike;
    this._handleDeleteCard = handleDeleteCard;
    this._deletePopupButton = document.querySelector('.delete-popup-button');
    this._deletePopup = deletePopup;
  }

  _getTemplate() {
    return this._elementTemplate.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.like-button');
    this._deleteButton = this._element.querySelector('.delete-button');
    this._likeCountElement = this._element.querySelector('.like-count');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._likeCountElement.textContent = this._likes.length;
    const isLiked = this._likes.some(elem => {
      return elem._id === 'cab7cb74084638a0029ce303';
    });
    if (isLiked === true) {
      this._likeButton.classList.add('like-button_active');
    }
    if (this._owner._id !== 'cab7cb74084638a0029ce303') {
      this._deleteButton.classList.add('delete-button-disable');
    }

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeIcon(evt);
    });
    this._deleteButton.addEventListener('click', (evt) => {
      this._handleDeleteIcon(evt);
    });
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle('like-button_active');
    if (evt.target.classList.contains('like-button_active')) {
      this._handleImageLike(this._id, this._likeCountElement);
    } else {
      this._handleImageUnlike(this._id, this._likeCountElement);
    }
  }

  _handleDeleteIcon(evt) {
    this._deletePopup.open();
    this._deletePopupButton.addEventListener('click', () => {
      this._handleDeleteCard(this._id, evt, this._deletePopup);
    });
  }
}
