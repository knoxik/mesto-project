import '../pages/index.css';
import { addButtonLoader, removeButtonLoader } from './modal.js';
import { api } from './Api.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { UserInfo } from './UserInfo';
import { user, cardForDelete, validateConfig, pageLoader, profileEditButton,
         placeAddButton, deleteCardButton, updateAvatarButton } from '../utils/constants.js'
import { cardList } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';

const deleteCardPopup = new Popup('#deleCardPopup');
const fullImagePopup = new PopupWithImage('#fullImagePopup');

const profilePopup = new PopupWithForm('#editProfilePopup', (evt) => {
  evt.preventDefault();
  addButtonLoader(evt.submitter);
  const { profileName, profileDescription } = profilePopup.getInputValues();
  api.updateUserInfo(profileName, profileDescription)
  .then(() => {
    userInfo.setUserInfo(profileName, profileDescription);
    profilePopup.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    removeButtonLoader(evt.submitter);
  })
})

const addPlacePopup = new PopupWithForm('#addPlacePopup', (evt) => {
  evt.preventDefault();
  addButtonLoader(evt.submitter);
  const { placeName, placeLink } = addPlacePopup.getInputValues();
  api.createCard(placeName, placeLink)
    .then(card => {
      const cardItem = createCard(card, '#card-grid__item')
      const cardElement = cardItem.generate();
      cardList.addItemPrepend(cardElement);
      addPlacePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      removeButtonLoader(evt.submitter);
    })
})

const updateAvatarPopup = new PopupWithForm('#updateAvatarPopup', (evt) => { 
  evt.preventDefault();
  addButtonLoader(evt.submitter)
  const { avatarLink } = updateAvatarPopup.getInputValues();
  api.updateUserAvatar(avatarLink)
    .then(data => {
      userInfo.setUserAvatar(avatarLink);
      updateAvatarPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => removeButtonLoader(evt.submitter));
})

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

function createCard(item, selector) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      fullImagePopup.open({title: card.title, link: card.link});
    },
    handleCardLike: () => {
      const cardId = card.id;

      if (card.liked) {
        api.dislikeCard(cardId)
          .then((data) => {
            card.renderLike(data);
            card.liked = false;
          })
          .catch(err => console.log(err));
      } else {
        api.likeCard(cardId)
          .then((data) => {
            card.renderLike(data)
            card.liked = true;
          })
          .catch(err => console.log(err));
      }
    },
    handleCardDelete: () => {
      cardForDelete.node = card.cardNode;
      cardForDelete.id = card.id;
      cardForDelete.card = card;
      deleteCardPopup.open();
    }
  }, selector)

  return card;
}

function initApp() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      user.id = userData._id;

      cardList.renderedItems = cards;
      cardList.renderer = (item) => {
        const card = createCard(item, '#card-grid__item');
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      }
      cardList.renderItems();
      userInfo.setUserInfo(userData.name, userData.about);
      userInfo.setUserAvatar(userData.avatar);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => pageLoader.remove());

  deleteCardButton.addEventListener('click', (evt) => {
    addButtonLoader(evt.target);
    api.deleteCard(cardForDelete.id)
      .then(() => {
        cardForDelete.card.deleteCard()
        deleteCardPopup.close()
      })
      .catch(err => console.log(err))
      .finally(() => removeButtonLoader(evt.target))
  });

  profileEditButton.addEventListener('click', function(evt) {
    for (const form of document.forms) {
      const formValidatorProfile = new FormValidator(validateConfig, form);
      formValidatorProfile.enableValidation();
    }
    const { userName, userDesctiption } = userInfo.getUserInfo();
    profilePopup.formEl.elements.profileName.value = userName;
    profilePopup.formEl.elements.profileDescription.value = userDesctiption;
    profilePopup.open();
  });

  placeAddButton.addEventListener('click', function() {
    for (const form of document.forms) {
      const formValidatorPlace = new FormValidator(validateConfig, form);
      formValidatorPlace.enableValidation();
    }
    addPlacePopup.open();
  });

  updateAvatarButton.addEventListener('click', () => {
    for (const form of document.forms) {
      const formValidatorAvatar = new FormValidator(validateConfig, form);
      formValidatorAvatar.enableValidation();
    }
    updateAvatarPopup.open();
  });
}

initApp();
