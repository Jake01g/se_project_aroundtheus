export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._submitBtn = this._form.querySelector(settings.submitButtonSelector);
    this._inputEls = [...this._form.querySelectorAll(settings.inputSelector)];
    this._settings = settings;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
    } else {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEL) {
    const errorMessageEl = this._form.querySelector(`#${inputEL.id}-error`);
    inputEL.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEL) => {
      inputEL.addEventListener("input", () => {
        console.log("keystroke");
        this._checkInputValidity(inputEL);
        this._toggleButtonState();
      });
    });
  }
  _checkInputValidity(inputEL) {
    if (!inputEL.validity.valid) {
      this._showInputError(inputEL);
    } else {
      this._hideInputError(inputEL);
    }
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEL) => {
      return !inputEL.validity.valid;
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputEls.forEach((form) => {
      this._hideInputError(form);
    });
  }

  disableSubmitButton() {
    this._submitBtn.classList.add(this._settings.inactiveButtonClass);
    this._submitBtn.disabled = true;
  }
}
