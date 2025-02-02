import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import PopupConfirm from "../components/PopupConfirm.js";

const addNewCardButton = document.querySelector(".profile__add-button");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "00971118-9fba-418f-9a4a-7fa64165e057",
    "Content-Type": "application/json",
  },
});

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
      const cardElement = getCardElement(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
const openProfileEditButton = document.querySelector(".profile__edit-button");

const addCardForm = document.forms["add-card-form"];
addCardForm.reset();

const addCardModal = new PopupWithForm("#add-card-modal", (data) => {
  addCardModal.renderLoadingModal(true);
  api
    .getCardElement(data.title, data.url)
    .then((newCard) => {
      cardSection.addItem(getCardElement(newCard));
      addCardModal.close();
      addCardForm.reset();
      formValidators["add-card-form"].disableSubmitButton();
    })
    .catch((err) => console.error(err))
    .finally(() => addCardModal.renderLoadingModal(false));
});

addCardModal.setEventListeners();

const imageModal = new PopupWithImage("#preview-modal");
imageModal.setEventListeners();

const profileModal = new PopupWithForm("#profile-edit-modal", (data) => {
  console.log(data);
  profileModal.renderLoadingModal(true);
  api
    .editProfile(data.name, data.description)
    .then((updatedUserInfo) => {
      console.log(updatedUserInfo);
      userInfo.setUserInfo({
        name: updatedUserInfo.name,
        about: updatedUserInfo.about,
      });
      profileModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => profileModal.renderLoadingModal(false));
});

openProfileEditButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  profileModal.setInputValues({
    name: currentUserData.name,
    description: currentUserData.about,
  });
  profileModal.open();
});

profileModal.setEventListeners();

// add new card
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

const profileName = ".profile__title";
const profileDescription = ".profile__description";
const profileAvatar = ".profile__image";

const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileDescription,
  avatarSelector: profileAvatar,
});

const deleteModal = new PopupConfirm("#remove-card-modal");
deleteModal.setEventListeners();

function handleDeleteModal(card) {
  deleteModal.setDeleteFunction(() => {
    deleteModal.renderLoadingModal(true);
    api
      .handleDeleteCard(card._id)
      .then(() => {
        card.removeCard();
        deleteModal.close();
      })
      .catch((err) => console.error(err))
      .finally(() => deleteModal.renderLoadingModal(false));
  });
  deleteModal.open();
}
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

enableValidation(config);
formValidators["avatar-form"].disableSubmitButton();

function handleCardLike(card, cardId, isLiked) {
  api
    .changeLikeStatus(cardId, isLiked)
    .then((updatedCard) => {
      card.setIsLiked(updatedCard.isLiked);
    })
    .catch((err) => console.error(err));
}

function renderCardsAfterUserInfo() {
  return Promise.all([api.getInitialCards(), api.getUserinfo()])
    .then(([cards, userData]) => {
      cardSection.renderItems(cards);
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
      });
      userInfo.setAvatar({
        avatar: userData.avatar,
      });
    })
    .catch((err) => console.error(err));
}

renderCardsAfterUserInfo();

const avatarModal = new PopupWithForm("#avatar-modal", (data) => {
  avatarModal.renderLoadingModal(true);
  api
    .editAvatar({
      avatar: data.avatar,
    })
    .then((updatedAvatarInfo) => {
      userInfo.setAvatar(updatedAvatarInfo);
      avatarModal.close();
    })
    .catch((err) => console.error(err))
    .finally(() => avatarModal.renderLoadingModal(false));
});

const avatarButton = document.querySelector(".avatar__edit-button");

avatarButton.addEventListener("click", () => {
  avatarModal.open();
});
avatarModal.setEventListeners();
