import { popups } from './index.js'

export function openPopup(obj) {
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
