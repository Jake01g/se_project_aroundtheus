import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
  }

  setDeleteFunction(submitDelete) {
    this._submitFunction = submitDelete;
  }

  renderLoadingModal(isLoading) {
    const submitButton = this._form.querySelector(".modal__button");
    if (isLoading) {
      submitButton.textContent = "Deleting...";
    } else {
      submitButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }
}
