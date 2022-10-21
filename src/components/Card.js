export class Card {
  constructor(data, cardSelector, handleCardClick, handleImageLike, handleCardDelete, userId) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name + ' фото';
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._userId = userId;
    this._elementTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleImageLike;
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
      return elem._id === this._userId;
    });
    if (isLiked === true) {
      this._likeButton.classList.add('like-button_active');
    }
    if (this._owner._id !== this._userId) {
      this._deleteButton.classList.add('delete-button-disable');
    }

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLike(this);
    });
    this._deleteButton.addEventListener('click', (evt) => {
      this._handleCardDelete(this, evt);
    });
  }

  removeLike(response) {
    this._likeButton.classList.remove('like-button_active');
    this._likeCountElement.textContent = response.likes.length;
  }

  addLike(response) {
    this._likeButton.classList.add('like-button_active');
    this._likeCountElement.textContent = response.likes.length;
  }
}
