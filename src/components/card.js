import { user, cardForDelete } from '../utils/constants.js';
import { api } from './Api.js';
import { Popup, deleteCardPopup } from './Popup.js';
import { fullImagePopup } from './PopupWithImage.js';

export class Card {
  constructor({ data, handleCardClick, handleCardLike, handleCardDelete }, cardTemplateSelector) {
    this._selector = cardTemplateSelector;
    this.title = data.name;
    this.link = data.link;
    this.likes = data.likes;
    this._owner = data.owner;
    this.id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  renderLike(data) {
    const likeButton = this._cardElement.querySelector('.card-grid__like-button');
    const likeCounter = this._cardElement.querySelector('.card-grid__like-counter');
    likeButton.classList.toggle('card-grid__like-button_active');
    likeCounter.textContent = data.likes.length;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generate() {
    this._cardElement = this._getElement();
    this.cardNode = this._cardElement;
    this.liked = this.isLiked();
    this._setEventListeners();
    const cardTitle = this._cardElement.querySelector('.card-grid__title');
    const cardImage = this._cardElement.querySelector('.card-grid__image');
    const likeCounter = this._cardElement.querySelector('.card-grid__like-counter');
    const likeButton = this._cardElement.querySelector('.card-grid__like-button');

    if (this.liked) {
      likeButton.classList.add('card-grid__like-button_active');
    }
    likeCounter.textContent = this.likes.length;

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
        this._handleCardDelete();
      });
    } else {
      trashButton.remove()
    }

    likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });
  }

  isOwner() {
    return user.id == this._owner._id;
  }

  isLiked() {
    let res = false;
    this.likes.forEach((like) => {
      if (like._id == user.id) {
        res = true;
        return;
      };
    })
    return res;
  }
}
