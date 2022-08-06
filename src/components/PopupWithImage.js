import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupCaption = this._popupSelector.querySelector('.popup__caption');
    this._popupImage = this._popupSelector.querySelector('.popup__image');
  }

  open({title, link}) {
    this._popupCaption.textContent = title;
    this._popupImage.src = link;
    this._popupImage.alt = title;
    super.open();
  }
}
