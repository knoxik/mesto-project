import '../pages/index.css';
import { openPopup, closePopup } from './modal.js';
import { createPlace, addPlace, deletePlace, createAndAddInitialCards } from './card.js';
import { initialCardsArray } from './initialCards.js';
import { enableValidation, toggleButtonState } from './validate.js';
import { saveProfileInfo, editProfileInfo, updateAvatar,
         editProfileForm, updateAvatarForm } from './profile.js';

const content = document.querySelector('.content');
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
  createAndAddInitialCards(initialCardsArray, cardContainer);

  cardContainer.addEventListener('click', ({target}) => {
    if (target.classList.contains('card-grid__like-button')) {
      target.classList.toggle('card-grid__like-button_active');
    }
    else if (target.classList.contains('card-grid__trash-btn')) {
      const placeItem = target.closest('.card-grid__item');
      deletePlace(placeItem);
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

  profileEditButton.addEventListener('click', function(evt) {
    editProfileInfo();
    openPopup(editProfilePopup);
  });
  placeAddButton.addEventListener('click', function() {
    openPopup(addPlacePopup);
  });

  editProfileForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    saveProfileInfo();
    closePopup(editProfilePopup);
  });

  updateAvatarButton.addEventListener('click', () => {
    openPopup(updateAvatarPopup);
  });
  updateAvatarForm.addEventListener('submit', updateAvatar)


  addPlaceForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    toggleButtonState([], evt.submitter, validateConfig);
    closePopup(addPlacePopup);
    const place = createPlace(placeName.value, placeLink.value);
    addPlace(place, cardContainer);
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

  enableValidation(validateConfig);
}

main();
