import { deleteCard, likeCard, dislikeCard } from './api.js';
import { cardTemplate, deleteCardPopup, fullImageCaption,
         fullImageElement, fullImagePopup } from './index.js';
import { openPopup } from './modal.js';

export let cardForDelete = {
  node: '',
  id: ''
};


export function createAndAddInitialCards(initialCardsArray, cardContainer, userId) {
  for (let i = initialCardsArray.length - 1; i !== -1; i--) {
    const card = initialCardsArray[i];
    addPlace(createPlace(card, isOwner(userId, card.owner._id), isLiked(userId, card)), cardContainer);
  }
}

function isOwner(userId, ownerId) {
  return userId == ownerId;
}

function isLiked(userId, card) {
  let res = false;
  card.likes.forEach((like) => {
    if (like._id == userId) {
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

  if (isLiked) {
    likeButton.classList.add('card-grid__like-button_active');
  }
  likeCounter.textContent = card.likes.length;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card-grid__title').textContent = card.name;

  likeButton.addEventListener('click', () => {
    const cardId = card._id;

    if (isLiked) {
      dislikeCard(cardId)
        .then((data) => {
          renderLike(cardElement, data)
          isLiked = false;
        })
        .catch(err => console.log(err));
    } else {
      likeCard(cardId)
        .then((data) => {
          renderLike(cardElement, data)
          isLiked = true;
        })
        .catch(err => console.log(err));
    }
  });

  if (isOwner) {
    trashButton.addEventListener('click', () => {
      cardForDelete.node = cardElement;
      cardForDelete.id = card._id;
      openPopup(deleteCardPopup);
    });
  } else {
    trashButton.remove()
  }

  cardImage.addEventListener('click', () => {
    fullImageCaption.textContent = card.name;
    fullImageElement.src = card.link;
    fullImageElement.alt = card.name;
    openPopup(fullImagePopup);
  });

  return cardElement;
}

export function addPlace(card, container) {
  container.prepend(card);
}

export function deletePlace(placeData) {
  return deleteCard(placeData.id)
    .then(() => placeData.node.remove())
    .catch(err => {
      console.log(err);
    })
}

export function renderLike(card, data) {
  const likeButton = card.querySelector('.card-grid__like-button');
  const likeCounter = card.querySelector('.card-grid__like-counter');
  likeButton.classList.toggle('card-grid__like-button_active');
  likeCounter.textContent = data.likes.length;
}

