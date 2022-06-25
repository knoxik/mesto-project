import '../pages/index.css';
import { openPopup, closePopup } from './modal.js';
import { createPlace, addPlace, deletePlace, createAndAddInitialCards } from './card.js';
import { initialCardsArray } from './initialCards.js';
import { enableValidation } from './validate.js';
import { saveProfileInfo, editProfileInfo, updateAvatar,
         editProfileForm, updateAvatarForm } from './profile.js';

const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');
export const popups = document.querySelectorAll('.popup')

const addPlaceForm =  document.forms.addPlace;
const placeAddButton = content.querySelector('.profile__add-button');
const placeName = addPlaceForm.elements.placeName;
const placeLink = addPlaceForm.elements.placeLink;

const editProfilePopup = document.querySelector('#editProfilePopup');
const addPlacePopup = document.querySelector('#addPlacePopup');
const fullImagePopup = document.querySelector('#fullImagePopup');
const cardContainer = content.querySelector('.card-grid');

const updateAvatarButton = content.querySelector('.profile__avatar-btn');
const updateAvatarPopup = document.querySelector('#updateAvatarPopup')

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
      fullImagePopup.querySelector('.popup__caption').textContent = cardTitle.textContent;
      const image = fullImagePopup.querySelector('.popup__image');
      image.src = cardImage.src;
      image.alt = cardImage.alt;
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

  enableValidation();
}

main();
