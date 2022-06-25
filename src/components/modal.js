import { validateConfig, toggleButtonState } from "./validate.js";
import { popups } from './index.js'

export function openPopup(obj) {
  const formElement = obj.querySelector(validateConfig.formSelector)
  if (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
    const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
  }
  obj.classList.add('popup_opened');

  document.addEventListener('keyup', closePopupByEsc);
}

export function closePopup(obj) {
  document.removeEventListener('keyup', closePopupByEsc);
  obj.classList.remove('popup_opened');
}

function closePopupByEsc(evt) {
  if (evt.key == 'Escape') {
    popups.forEach((popup) => {closePopup(popup)});
  }
}
