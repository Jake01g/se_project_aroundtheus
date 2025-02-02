import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name];
      } else {
        console.log(`No data provided for input with name: ${input.name}`);
        input.value = "";
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  getForm() {
    return this._form;
  }

  renderLoadingModal(isLoading) {
    this._submitButton = this._form.querySelector(".modal__button");
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }
}
