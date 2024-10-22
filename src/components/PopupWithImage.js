import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    this._imageEl = this._popupElement.querySelector(".modal__image");
    this._titleEl = this._popupElement.querySelector(".modal__title");
  }

  open(card) {
    this._imageEl.src = card.link;
    this._imageEl.alt = card.name;
    this._titleEl.textContent = card.name;

    super.open();
  }
}
