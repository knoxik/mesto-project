const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
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

const initialCardsArray = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  ];

const cardContainer = content.querySelector('.card-grid');
function savePlace(placeName, placeLink) {
  const cardTemplate = document.querySelector('#card-grid__item').content;
  const cardElement = cardTemplate.querySelector('.card-grid__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card-grid__like-button');
  const trashButton = cardElement.querySelector('.card-grid__trash-btn');
  const cardImage = cardElement.querySelector('.card-grid__image');
  const cardTitle = placeName;

  cardImage.src = placeLink;
  cardElement.querySelector('.card-grid__title').textContent = placeName;

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card-grid__like-button_active');
  });

  trashButton.addEventListener('click', function(evt) {
    placeItem = evt.target.closest('.card-grid__item');
    deletePlace(placeItem);
  });

  cardImage.addEventListener('click', function(evt) {
    fullImagePopup.querySelector('.popup__caption').textContent = cardTitle;
    fullImagePopup.querySelector('.popup__image').src = cardImage.src;
    showOrClosePopup(fullImagePopup);
  });


  cardContainer.append(cardElement);

  placeName = '';
  placeLink = '';
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
  const popupCloseButton = obj.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', function() {
    showOrClosePopup(obj);
  });
}

function deletePlace(placeItem) {
  placeItem.remove();
}

function createInitialCards(initialCardsArray) {
  for (let i = 0; i < initialCardsArray.length; i++) {
    savePlace(initialCardsArray[i].name, initialCardsArray[i].link);
  }
}

function main() {
  createInitialCards(initialCardsArray);

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
    const placeName = document.querySelector('.popup__input_place-name').value;
    const placeLink = document.querySelector('.popup__input_place-img').value;
    savePlace(placeName, placeLink);
  });
}

main();
