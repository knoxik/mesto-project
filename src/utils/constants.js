export let user = {
  id: ''
}
export let cardForDelete = {
  node: '',
  id: '',
  card: ''
};

export const validateConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

export const pageLoader = document.querySelector('.page__loader')
export const profileEditButton = document.querySelector('.profile__edit-button');
export const placeAddButton = document.querySelector('.profile__add-button');
export const deleteCardButton = document.querySelector('.popup__button_delete-card');
export const updateAvatarButton = document.querySelector('.profile__avatar-btn');
export const editProfileForm = document.forms.editProfile;
export const addPlaceForm = document.forms.addPlace;
export const updateAvatarForm = document.forms.updateAvatar;
