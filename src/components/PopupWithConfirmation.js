import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = this._popup.querySelector('.delete-popup-button');
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  setSubmitAction(callback) {
    this._submitAction = callback;
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    this._confirmationButton.addEventListener('click', () => {
      this._submitAction();
    })
    super.setEventListeners();
  }
}
