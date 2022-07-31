import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open({title, link}) {
    this._popupSelector.querySelector('.popup__caption').textContent = title;
    this._popupSelector.querySelector('.popup__image').src = link;
    super.open();
  }
}
