import { Popup } from './Popup.js';
import { validateConfig } from '../utils/constants.js';
import { addButtonLoader, removeButtonLoader } from './modal.js';
import { api } from './Api.js';
import { userInfo } from './UserInfo.js';
import { Card, createCard } from './Card.js';
import { cardList } from './Section.js';

export class PopupWithForm extends Popup{
    constructor (popupSelector, formSubmitCallback) {
        super (popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this.formEl = this._popupSelector.querySelector(validateConfig.formSelector);
        this._submitButton = this._popupSelector.querySelector(validateConfig.submitButtonSelector);
        this._inputList = this.formEl.querySelectorAll(validateConfig.inputSelector);
    }

    _getInputValues () {
        this._inputValues = {};
        this._inputList.forEach( input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners () {
        super.setEventListeners();
        this.formEl.addEventListener('submit',this._formSubmitCallback);
    }

    close () {
        super.close();
        this.formEl.removeEventListener('submit',  this._formSubmitCallback);
        this._submitButton.setAttribute('disabled', '');
        this._submitButton.classList.add(validateConfig.inactiveButtonClass);
        this.formEl.reset();
        this._inputList.forEach(input => {
            input.classList.remove(validateConfig.inputErrorClass);
            this.formEl.querySelector(`.${input.id}-error`).classList.remove(validateConfig.errorClass);
        })
    }
}

export const profilePopup = new PopupWithForm('#editProfilePopup', (evt) => {
  evt.preventDefault();
  addButtonLoader(evt.submitter);
  const { profileName, profileDescription } = profilePopup._getInputValues();
  api.updateUserInfo(profileName, profileDescription)
  .then(() => {
    userInfo.setUserInfo(profileName, profileDescription);
    profilePopup.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    removeButtonLoader(evt.submitter);
  })
})

export const addPlacePopup = new PopupWithForm('#addPlacePopup', (evt) => {
  evt.preventDefault();
  addButtonLoader(evt.submitter);

  const { placeName, placeLink } = addPlacePopup._getInputValues();

  api.createCard(placeName, placeLink)
    .then(card => {
      const cardItem = createCard(card, '#card-grid__item')
      const cardElement = cardItem.generate();
      cardList.addItemPrepend(cardElement);
      addPlacePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      removeButtonLoader(evt.submitter);
    })
})

export const updateAvatarPopup = new PopupWithForm('#updateAvatarPopup', (evt) => {
  evt.preventDefault();
  addButtonLoader(evt.submitter)
  const { avatarLink } = updateAvatarPopup._getInputValues();
  api.updateUserAvatar(avatarLink)
    .then(data => {
      userInfo.setUserAvatar(avatarLink);
      updateAvatarPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => removeButtonLoader(evt.submitter));
})
