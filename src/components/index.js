import '../pages/index.css';
import { addButtonLoader, removeButtonLoader } from './modal.js';
import { api } from './Api.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { deleteCardPopup } from './Popup.js';
import { fullImagePopup } from './PopupWithImage.js';
import { profilePopup, addPlacePopup, updateAvatarPopup } from './PopupWithForm.js';
import { userInfo } from './UserInfo';
import { user, cardForDelete, validateConfig, pageLoader, profileEditButton,
         placeAddButton, deleteCardButton, updateAvatarButton } from '../utils/constants.js'
import { cardList } from './Section.js';

function initApp() {
  for (const form of document.forms) {
    const formValidator = new FormValidator(validateConfig, form);
    formValidator.enableValidation();
  }

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      user.id = userData._id;

      cardList.renderedItems = cards;
      cardList.renderer = (item) => {
        const card = new Card({
          data: item,
          handleCardClick: () => {
            fullImagePopup.open({title: card.title, link: card.link});
          }
        }, '#card-grid__item')
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
    cardForDelete.card.deletePlace(cardForDelete)
      .then(() => deleteCardPopup.close())
      .catch(err => console.log(err))
      .finally(() => removeButtonLoader(evt.target))
  });

  profileEditButton.addEventListener('click', function(evt) {
    const { userName, userDesctiption } = userInfo.getUserInfo();
    profilePopup.formEl.elements.profileName.value = userName;
    profilePopup.formEl.elements.profileDescription.value = userDesctiption;
    profilePopup.open();
  });

  placeAddButton.addEventListener('click', function() {
    addPlacePopup.open();
  });

  updateAvatarButton.addEventListener('click', () => {
    updateAvatarPopup.open();
  });
}

initApp();
