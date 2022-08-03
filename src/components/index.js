import '../pages/index.css';
import { addButtonLoader, removeButtonLoader } from './modal.js';
import { api } from './Api.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo';
import { user, cardForDelete, validateConfig, pageLoader, profileEditButton,
         placeAddButton, deleteCardButton, updateAvatarButton } from '../utils/constants.js'
import Section from './Section.js';


function initApp() {
  for (const form of document.forms) {
    const formValidator = new FormValidator(validateConfig, form);
    formValidator.enableValidation();
  }

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      user.id = userData._id;
      const cardList = new Section({
        items: cards,
        renderer: (item) => {
          const card = new Card({
            data: item,
            handleCardClick: () => {
              const fullImagePopup = new PopupWithImage('#fullImagePopup');
              fullImagePopup.open({title: card.title, link: card.link});
            }
          }, '#card-grid__item')
          const cardElement = card.generate();
          cardList.addItem(cardElement);
        }
      }, '.card-grid')
      cardList.renderItems();
      const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__avatar'});
      userInfo.setUserInfo(userData.name, userData.about);
      userInfo.setUserAvatar(userData.avatar);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => pageLoader.remove());

  deleteCardButton.addEventListener('click', (evt) => {
    const deleteCardPopup = new Popup('#deleCardPopup');
    addButtonLoader(evt.target);
    cardForDelete.card.deletePlace(cardForDelete)
      .then(() => deleteCardPopup.close())
      .catch(err => console.log(err))
      .finally(() => removeButtonLoader(evt.target))
  });

  profileEditButton.addEventListener('click', function(evt) {
    const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__avatar'});

    const { userName, userDesctiption } = userInfo.getUserInfo();
    const profilePopup = new PopupWithForm('#editProfilePopup', (evt) => {
      evt.preventDefault();
      addButtonLoader(evt.submitter);
      const { profileName, profileDescription } = profilePopup._getInputValues();
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
    profilePopup.formEl.elements.profileName.value = userName;
    profilePopup.formEl.elements.profileDescription.value = userDesctiption;
    profilePopup.open();
  });

  placeAddButton.addEventListener('click', function() {
    const addPlacePopup = new PopupWithForm('#addPlacePopup', (evt) => {
      evt.preventDefault();
      addButtonLoader(evt.submitter);

      const { placeName, placeLink } = addPlacePopup._getInputValues();

      api.createCard(placeName, placeLink)
        .then(card => {
          const cardItem = new Card({
            data: card,
            handleCardClick: () => {
              const fullImagePopup = new PopupWithImage('#fullImagePopup');
              fullImagePopup.open({title: card.name, link: card.link});
            }
          }, '#card-grid__item')
          const cardElement = cardItem.generate();
          const cardList = new Section({}, '.card-grid')
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
    addPlacePopup.open();
  });

  updateAvatarButton.addEventListener('click', () => {
    const updateAvatarPopup = new PopupWithForm('#updateAvatarPopup', (evt) => {
      evt.preventDefault();
      addButtonLoader(evt.submitter)
      const { avatarLink } = updateAvatarPopup._getInputValues();
      api.updateUserAvatar(avatarLink)
        .then(data => {
          const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__avatar'});
          userInfo.setUserAvatar(avatarLink);
          updateAvatarPopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => removeButtonLoader(evt.submitter));
    })
    updateAvatarPopup.open();
  });
}

initApp();
