import { getUserInfo, deleteCard } from './api.js';
import {cardTemplate} from './index.js';


export function createAndAddInitialCards(initialCardsArray, cardContainer) {
  return getUserInfo()
    .then(user => {
      for (let i = initialCardsArray.length - 1; i !== -1; i--) {
        const card = initialCardsArray[i];
        addPlace(createPlace(card, isOwner(user, card), isLiked(user, card)), cardContainer);
      }
      return user;
    });
}

function isOwner(user, card) {
  return card.owner._id == user._id;
}

function isLiked(user, card) {
  let res = false;
  card.likes.forEach((like) => {
    if (like._id == user._id) {
      res = true;
      return;
    };
  })
  return res;
}

export function createPlace(card, isOwner, isLiked) {
  const cardElement = cardTemplate.querySelector('.card-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card-grid__image');
  const likeCounter = cardElement.querySelector('.card-grid__like-counter');
  const likeButton = cardElement.querySelector('.card-grid__like-button');
  const trashButton = cardElement.querySelector('.card-grid__trash-btn');

  if (!isOwner) trashButton.remove();
  cardElement.dataset.like = false;
  if (isLiked) {
    cardElement.dataset.like = true;
    likeButton.classList.add('card-grid__like-button_active');
  }
  likeCounter.textContent = card.likes.length;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.dataset.id = card._id;
  cardElement.querySelector('.card-grid__title').textContent = card.name;

  return cardElement;
}

export function addPlace(card, container) {
  container.prepend(card);
}

export function deletePlace(placeItem) {
  return deleteCard(placeItem.dataset.id)
    .then(() => {
      placeItem.remove();
    });
}

export function renderLike(card, data) {
  const likeButton = card.querySelector('.card-grid__like-button');
  const likeCounter = card.querySelector('.card-grid__like-counter');
  likeButton.classList.toggle('card-grid__like-button_active');
  likeCounter.textContent = data.likes.length;
}

