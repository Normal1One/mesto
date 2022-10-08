import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super();
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.form');
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners(evt) {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
      evt.stopImmediatePropagation();
    });
  }

  close() {
    super.close();
    this._element.reset();
  }
}
