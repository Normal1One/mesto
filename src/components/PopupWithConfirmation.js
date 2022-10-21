import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = this._popup.querySelector('.delete-popup-button');
  }

  setSubmitAction(callback) {
    this._submitAction = callback;
  }

  setEventListeners() {
    this._confirmationButton.addEventListener('submit', () => {
      this._submitAction();
    })
    super.setEventListeners();
  }
}
