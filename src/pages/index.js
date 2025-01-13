import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  config,
  profileEditForm,
  addCardFormElement,
  selectors,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupConfirm.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const addNewCardButton = document.querySelector(".profile__add-button");
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function getCardElement(data) {
  const card = new Card(data, "#card-template", openPreviewModal);
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = createCard(item);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardModal.setEventListeners();

const imageModal = new PopupWithImage("#preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profileModal.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(input) {
  userInfo.setUserInfo(input);
  profileModal.close();
}

function handleAddCardFormSubmit({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = getCardElement(newCardData);
  cardSection.addItem(newCard);
  addCardModal.close();
  addCardFormElement.reset();
  addFormValidator.disableSubmitButton();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
const openProfileEditButton = document.querySelector(".profile__edit-button");
openProfileEditButton.addEventListener("click", () => {
  const input = userInfo.getUserInfo();
  profileModal.setInputValues(input);
  editFormValidator.resetValidation();
  profileModal.open();
});

// add new card
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

const profileName = ".profile__title";
const profileDescription = ".profile__description";
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
});

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

api
  .getUserinfo()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

api
  .saveUserInfo()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

api
  .createCard()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

api
  .handleDeleteCard()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });
