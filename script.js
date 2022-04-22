const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupSubmitButton = document.querySelector('.popup__button');

const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_name');
const popupDescription = document.querySelector('.popup__input_description');

const editProfileForm = document.getElementsByName('editProfile')[0];
const addPlaceForm = document.getElementsByName('addPlace')[0];
const placeAddButton = content.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector('#editProfilePopup');
const addPlacePopup = document.querySelector('#addPlacePopup');
const fullImagePopup = document.querySelector('#fullImagePopup');
const placeName = document.querySelector('.popup__input_place-name');
const placeLink = document.querySelector('.popup__input_place-img');
const cardContainer = content.querySelector('.card-grid');

function createPlace(placeNameValue, placeLinkValue) {
  const cardTemplate = document.querySelector('#card-grid__item').content;
  const cardElement = cardTemplate.querySelector('.card-grid__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card-grid__like-button');
  const trashButton = cardElement.querySelector('.card-grid__trash-btn');
  const cardImage = cardElement.querySelector('.card-grid__image');
  const cardTitle = placeNameValue;

  cardImage.src = placeLinkValue;
  cardImage.alt = cardTitle;
  cardElement.querySelector('.card-grid__title').textContent = placeNameValue;

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card-grid__like-button_active');
  });

  trashButton.addEventListener('click', function(evt) {
    placeItem = evt.target.closest('.card-grid__item');
    deletePlace(placeItem);
  });

  cardImage.addEventListener('click', function(evt) {
    fullImagePopup.querySelector('.popup__caption').textContent = cardTitle;
    const image = fullImagePopup.querySelector('.popup__image');
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    showOrClosePopup(fullImagePopup);
  });

  return cardElement;
}

function addPlace(card, container) {
  container.prepend(card);
}

function saveProfileInfo() {
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

function editProfileInfo() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function showOrClosePopup(obj) {
  obj.classList.toggle('popup_opened');
}

function deletePlace(placeItem) {
  placeItem.remove();
}

function createAndAddInitialCards(initialCardsArray) {
  for (let i = 0; i < initialCardsArray.length; i++) {
    const card = createPlace(initialCardsArray[i].name, initialCardsArray[i].link);
    addPlace(card, cardContainer);
  }

}

function main() {
  import('./initialCards.js')
  .then((module) => {
    initialCardsArray = module.initialCardsArray;
    createAndAddInitialCards(initialCardsArray);
  });

  profileEditButton.addEventListener('click', function(evt) {
    showOrClosePopup(editProfilePopup);
    editProfileInfo();
  });
  placeAddButton.addEventListener('click', function() {
    showOrClosePopup(addPlacePopup);
  });

  editProfileForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    showOrClosePopup(editProfilePopup);
    saveProfileInfo();
  });

  addPlaceForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    showOrClosePopup(addPlacePopup);
    const place = createPlace(placeName.value, placeLink.value);
    addPlace(place, cardContainer);
    placeName.value = '';
    placeLink.value = '';
  });

  popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
      showOrClosePopup(evt.target.closest('.popup'));
    });
  });
}

main();
