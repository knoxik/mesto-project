import { user, cardForDelete } from '../utils/constants.js';
import { api } from './Api.js';
import { Popup, deleteCardPopup } from './Popup.js';

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

  _renderLike(data) {
    const likeButton = this._cardElement.querySelector('.card-grid__like-button');
    const likeCounter = this._cardElement.querySelector('.card-grid__like-counter');
    likeButton.classList.toggle('card-grid__like-button_active');
    likeCounter.textContent = data.likes.length;
  }

  generate() {
    this._cardElement = this._getElement();
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

  deletePlace(placeData) {
    return api.deleteCard(placeData.id)
      .then(() => placeData.node.remove())
      .catch(err => {
        console.log(err);
      })
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
        cardForDelete.card = this;
        deleteCardPopup.open();
      });
    } else {
      trashButton.remove()
    }

    likeButton.addEventListener('click', () => {
      const cardId = this._id;

      if (this.liked) {
        api.dislikeCard(cardId)
          .then((data) => {
            this._renderLike(data);
            this.liked = false;
          })
          .catch(err => console.log(err));
      } else {
        api.likeCard(cardId)
          .then((data) => {
            this._renderLike(data)
            this.liked = true;
          })
          .catch(err => console.log(err));
      }
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
