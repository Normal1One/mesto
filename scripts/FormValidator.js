export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  resetError(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    inputList.forEach(inputElement => {
      this._hideInputError(formElement, inputElement);
    });
    this._toggleButtonState(inputList, formElement.querySelector(this._config.submitButtonSelector));
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
