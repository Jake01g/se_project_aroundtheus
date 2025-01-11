import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
  }
  setSubmitFunction(submitFnc) {
    this._submitFunction = submitFnc;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this_popupElement, this_form);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }

  renderLoadingModal(isLoading) {
    const submitButton = this._form.querySelector(".modal__button");
    if (isLoading) {
      submitButton.textContent = "Deleting...";
    } else {
      submitButton.textContent = "Yes";
    }
  }
}
