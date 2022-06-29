import '../pages/index.css';
import { openPopup, closePopup, addButtonLoader, removeButtonLoader } from './modal.js';
import { createPlace, addPlace, deletePlace, createAndAddInitialCards, renderLike } from './card.js';
import { initialCardsArray } from './initialCards.js';
import { enableValidation, toggleButtonState } from './validate.js';
import { saveProfileInfo, editProfileInfo, updateAvatar,
         editProfileForm, updateAvatarForm, renderProfile } from './profile.js';
import { getUserInfo, getInitialCards, createCard, likeCard, dislikeCard } from './api.js';

const content = document.querySelector('.content');
const pageLoader = document.querySelector('.page__loader')
const profileEditButton = content.querySelector('.profile__edit-button');
export const popups = document.querySelectorAll('.popup')
export const cardTemplate = document.querySelector('#card-grid__item').content;

const addPlaceForm =  document.forms.addPlace;
const placeAddButton = content.querySelector('.profile__add-button');
const placeName = addPlaceForm.elements.placeName;
const placeLink = addPlaceForm.elements.placeLink;

const editProfilePopup = document.querySelector('#editProfilePopup');
const addPlacePopup = document.querySelector('#addPlacePopup');
const fullImagePopup = document.querySelector('#fullImagePopup');
const fullImageCaption = fullImagePopup.querySelector('.popup__caption');
const fullImageElement = fullImagePopup.querySelector('.popup__image');
const cardContainer = content.querySelector('.card-grid');

const deleteCardPopup = document.querySelector('#deleCardPopup');
const deleteCardButton = deleteCardPopup.querySelector('.popup__button');
let cardForDelete = undefined;

const updateAvatarButton = content.querySelector('.profile__avatar-btn');
const updateAvatarPopup = document.querySelector('#updateAvatarPopup');
export const validateConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

function main() {
  enableValidation(validateConfig);

  getInitialCards()
    .then(cardsArray => createAndAddInitialCards(cardsArray, cardContainer))
    .then(user => renderProfile(user))
    .then(() => pageLoader.remove());

  cardContainer.addEventListener('click', ({target}) => {
    if (target.classList.contains('card-grid__like-button')) {
      const card = target.closest('.card-grid__item');
      const cardId = card.dataset.id;
      const isLiked = card.dataset.like;

      if (isLiked == 'true') {
        dislikeCard(cardId)
          .then((data) => {
            renderLike(card, data)
            card.dataset.like = false;
          });
      } else {
        likeCard(cardId)
          .then((data) => {
            renderLike(card, data)
            card.dataset.like = true;
          });
      }
    }
    else if (target.classList.contains('card-grid__trash-btn')) {
      cardForDelete = target.closest('.card-grid__item');
      openPopup(deleteCardPopup);
    }
    else if (target.classList.contains('card-grid__image')) {
      const cardTitle = target.closest('.card-grid__item').querySelector('.card-grid__title');
      const cardImage = target.closest('.card-grid__image');
      fullImageCaption.textContent = cardTitle.textContent;
      fullImageElement.src = cardImage.src;
      fullImageElement.alt = cardImage.alt;
      openPopup(fullImagePopup);
    }
  });

  deleteCardButton.addEventListener('click', (evt) => {
    addButtonLoader(evt.target);
    deletePlace(cardForDelete)
      .then(() => removeButtonLoader(evt.target))
      .then(() => closePopup(deleteCardPopup));
  });

  profileEditButton.addEventListener('click', function(evt) {
    editProfileInfo();
    openPopup(editProfilePopup);
  });
  placeAddButton.addEventListener('click', function() {
    openPopup(addPlacePopup);
  });

  editProfileForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addButtonLoader(evt.submitter);
    saveProfileInfo()
      .then(() => {
        removeButtonLoader(evt.submitter);
        closePopup(editProfilePopup);
      });
  });

  updateAvatarButton.addEventListener('click', () => {
    openPopup(updateAvatarPopup);
  });
  updateAvatarForm.addEventListener('submit', updateAvatar)


  addPlaceForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addButtonLoader(evt.submitter);
    toggleButtonState([], evt.submitter, validateConfig);
    createCard(placeName.value, placeLink.value)
      .then(card => {
        addPlace(createPlace(card, true, false), cardContainer);
        removeButtonLoader(evt.submitter);
        closePopup(addPlacePopup);
      });
    addPlaceForm.reset();
  });

  popups.forEach(function(popup) {
    popup.addEventListener('click', ({target}) => {
      if (target.classList.contains('popup__close-icon')
          || target.classList.contains('popup')) {
        closePopup(target.closest('.popup'));
      }
    });
  });
}

main();
