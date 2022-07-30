import { userId, cardForDelete } from '../utils/constants.js';

export class Card {
  constructor({ data, handleCardClick }, cardTemplateSelector) {
    this._selector = cardTemplateSelector;
    this.title = data.name;
    this.link = data.link;
    this.likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._cardElement = this._getElement();
    this._setEventListeners();
    const cardTitle = this._cardElement.querySelector('.card-grid__title');
    const cardImage = this._cardElement.querySelector('.card-grid__image');

    cardTitle.textContent = this.title;
    cardImage.src = this.link;
    cardImage.alt = this.title;

    return this._cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector('.card-grid__like-button');
    const trashButton = this._cardElement.querySelector('.card-grid__trash-btn');
    const cardImage = this._cardElement.querySelector('.card-grid__image');

    cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })

    if (this.isOwner()) {
      trashButton.addEventListener('click', () => {
        cardForDelete.node = this._cardElement;
        cardForDelete.id = this._id;
        // openPopup(deleteCardPopup);
      });
    } else {
      trashButton.remove()
    }
  }

  isOwner() {
    return userId == this._owner._id;
  }

  isLiked() {
    let res = false;
    this.likes.forEach((like) => {
      if (like._id == userId) {
        res = true;
        return;
      };
    })
    return res;
  }
}
