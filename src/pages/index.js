import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  config,
  //profileEditForm,
  addCardFormElement,
  selectors,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import PopupWithConfirm from "../components/PopupConfirm.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const addNewCardButton = document.querySelector(".profile__add-button");
//const editFormValidator = new FormValidator(config, profileEditForm);
//const addFormValidator = new FormValidator(config, addCardFormElement);

//editFormValidator.enableValidation();
//addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function getCardElement(data) {
  console.log(data);
  const card = new Card(
    data,
    "#card-template",
    openPreviewModal,
    handleDeleteModal,
    handleCardLike
  );
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

const addCardModal = new PopupWithForm("#add-card-modal", (data) => {
  addCardModal.renderLoadingModal(true);
  api
    .createCard(data.title, data.url)
    .then((newCard) => {
      cardSection.addItem(getCardElement(newCard));
      addCardModal.close();
      addCardForm.reset();
      formValidators["add-card-form"].disableButton();
    })
    .catch((err) => console.error(err))
    .finally(() => addCardModal.renderLoadingModal(false));
});

addCardModal.setEventListeners();

const formValidators = {};

const imageModal = new PopupWithImage("#preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

const profileModal = new PopupWithForm("#profile-edit-modal", (data) => {
  profileModal.renderLoadingModal(true);
  api
    .editProfile(data.name, data.description)
    .then((updatedUserInfo) => {
      userInfo.setUserInfo({
        userName: updatedUserInfo.name,
        userJob: updatedUserInfo.about,
      });
      profileModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => profileModal.renderLoadingModal(false));
});

const openProfileEditButton = document.querySelector(".profile__edit-button");
openProfileEditButton.addEventListener("click", () => {
  const input = userInfo.getUserInfo();
  profileModal.setInputValues(input);
  editFormValidator.resetValidation();
  profileModal.open();
});

profileModal.setEventListeners();
/*
function handleProfileFormSubmit(input) {
  userInfo.setUserInfo(input);
  profileModal.close();
}
*/
const addCardForm = document.forms["add-card-form"];
addCardForm.reset();
/*
function handleAddCardFormSubmit({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = getCardElement(newCardData);
  cardSection.addItem(newCard);
  addCardModal.close();
  addCardFormElement.reset();
  addFormValidator.disableSubmitButton();
}
*/
const cardSelector = "#card-template";

// add new card
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

const profileName = ".profile__title";
const profileDescription = ".profile__description";
const profileAvatar = ".profile__image";

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
  avatarSelector: profileAvatar,
});

const deleteModal = new PopupWithConfirm("#remove-card-modal");
deleteModal.setEventListeners();

function handleDeleteModal(getCardElement) {
  deleteModal.setSubmitFunction(() => {
    deleteModal.renderLoadingModal(true);
    api
      .handleDeleteCard(getCardElement._id)
      .then(() => {
        getCardElement.removeCard();
        deleteModal.close();
      })
      .catch((err) => console.error(err))
      .finally(() => deleteModal.renderLoadingModal(false));
  });
  deleteModal.open();
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

formValidators["avatar-form"].disableButton();

function handleCardLike(getCardElement, cardId, isLiked) {
  api
    .changeLikeStatus(cardId, isLiked)
    .then((updatedCard) => {
      getCardElement.setIsLiked(updatedCard.isLiked);
    })
    .catch((err) => console.error(err));
}

function renderCardsAfterUserInfo() {
  return Promise.all([api.getInitialCards(), api.getUserinfo()]).then(
    ([cards, userData]) => {
      cardSection.renderItems(cards);
      userInfo.setUserInfo({
        name: userData.name,
      });
    }
  );
}
