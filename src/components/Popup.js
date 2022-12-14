export default class Popup {
  constructor(popupSelector) {
    this.bindedMethod = this._handleEscClose.bind(this);
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.bindedMethod);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.bindedMethod);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
      evt.stopImmediatePropagation();
    });
  }
}
