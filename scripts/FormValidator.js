export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._submitButton = config.submitButtonSelector;
    this._inputError = config.inputErrorClass;
    this._error = config.errorClass;
    this._input = config.inputSelector;
    this._inactiveButton = config.inactiveButtonClass;
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

  _setEventListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._input));
    const buttonElement = formElement.querySelector(this._submitButton);
    this._toggleButtonState(this._inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(this._inputList, buttonElement);
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

  resetError(formElement) {
    this._inputList.forEach(inputElement => {
      this._hideInputError(formElement, inputElement);
    });
    this._toggleButtonState(this._inputList, formElement.querySelector(this._submitButton));
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
    this._setEventListeners(this._formElement);
  }
}
