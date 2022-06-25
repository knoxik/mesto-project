export function createAndAddInitialCards(initialCardsArray, cardContainer) {
  for (let i = 0; i < initialCardsArray.length; i++) {
    const card = createPlace(initialCardsArray[i].name, initialCardsArray[i].link);
    addPlace(card, cardContainer);
  }
}

export function createPlace(placeNameValue, placeLinkValue) {
  const cardTemplate = document.querySelector('#card-grid__item').content;
  const cardElement = cardTemplate.querySelector('.card-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card-grid__image');

  cardImage.src = placeLinkValue;
  cardImage.alt = placeNameValue;
  cardElement.querySelector('.card-grid__title').textContent = placeNameValue;

  return cardElement;
}

export function addPlace(card, container) {
  container.prepend(card);
}

export function deletePlace(placeItem) {
  placeItem.remove();
}
