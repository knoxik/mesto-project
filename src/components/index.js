import '../pages/index.css';
import { openPopup, closePopup, addButtonLoader, removeButtonLoader } from './modal.js';
import { createPlace, addPlace, deletePlace, createAndAddInitialCards } from './card.js';
import { enableValidation, toggleButtonState } from './validate.js';
import { saveProfileInfo, editProfileInfo, updateAvatar,
         editProfileForm, updateAvatarForm, renderProfile } from './profile.js';
import { api } from './Api.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './CardClass.js';
import { PopupWithImage } from './PopupWithImage.js';
import Section from './Section.js';

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
// export const fullImagePopup = document.querySelector('#fullImagePopup');
// export const fullImageCaption = fullImagePopup.querySelector('.popup__caption');
// export const fullImageElement = fullImagePopup.querySelector('.popup__image');
const cardContainer = content.querySelector('.card-grid');

export const deleteCardPopup = document.querySelector('#deleCardPopup');
const deleteCardButton = deleteCardPopup.querySelector('.popup__button');

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
import { user, cardForDelete } from '../utils/constants.js'

function initApp() {
  for (const form of document.forms){
    const formValidator = new FormValidator(validateConfig, form);
    formValidator.enableValidation();
  }

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      user.id = userData._id;
      // createAndAddInitialCards(cards, cardContainer, userId);
      const cardList = new Section({
        items: cards,
        renderer: (item) => {
          const card = new Card({
            data: item,
            handleCardClick: () => {
              const fullImagePopup = new PopupWithImage('#fullImagePopup');
              fullImagePopup.open({title: card.title, link: card.link});
            }
          }, '#card-grid__item')
          const cardElement = card.generate();
          cardList.addItem(cardElement);
        }
      }, '.card-grid')
      cardList.renderItems();
      renderProfile(userData);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => pageLoader.remove());

  deleteCardButton.addEventListener('click', (evt) => {
    addButtonLoader(evt.target);
    cardForDelete.card.deletePlace(cardForDelete)
      .then(() => closePopup(deleteCardPopup))
      .catch(err => console.log(err))
      .finally(() => removeButtonLoader(evt.target))
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
        closePopup(editProfilePopup);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        removeButtonLoader(evt.submitter);
      })
  });

  updateAvatarButton.addEventListener('click', () => {
    openPopup(updateAvatarPopup);
  });
  updateAvatarForm.addEventListener('submit', updateAvatar)


  addPlaceForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addButtonLoader(evt.submitter);

    api.createCard(placeName.value, placeLink.value)
      .then(card => {
        addPlaceForm.reset();
        // addPlace(createPlace(card, true, false), cardContainer);
        const cardItem = new Card({
          data: card,
          handleCardClick: () => {
            const fullImagePopup = new PopupWithImage('#fullImagePopup');
            fullImagePopup.open({title: card.name, link: card.link});
          }
        }, '#card-grid__item')
        const cardElement = cardItem.generate();
        const cardList = new Section({}, '.card-grid')
        cardList.addItemPrepend(cardElement);

        closePopup(addPlacePopup);
        toggleButtonState([], evt.submitter, validateConfig);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        removeButtonLoader(evt.submitter);
      })
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

initApp();
