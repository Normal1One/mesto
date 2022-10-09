export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._submitButton = config.submitButtonSelector;
    this._inputError = config.inputErrorClass;
    this._error = config.errorClass;
    this._input = config.inputSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._buttonElement = formElement.querySelector(this._submitButton)
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._error);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._error);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._button = this._formElement.querySelector(this._submitButton);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButton);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._inactiveButton);
      buttonElement.removeAttribute('disabled');
    }
  }

  resetValidation() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(this._formElement, inputElement);
    });
    this._toggleButtonState(this._inputList, this._button);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
