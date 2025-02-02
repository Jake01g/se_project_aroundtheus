export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._inputEls = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formSelector = settings.inputSelector;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        console.log("keystroke");
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEL) => {
      return !inputEL.validity.valid;
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputEls.forEach((form) => this._hideInputError(form));
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
