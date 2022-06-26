import { closePopup } from "./modal.js";
import { toggleButtonState } from './validate.js'
import { validateConfig } from './index.js'
export const editProfileForm = document.forms.editProfile;
export const updateAvatarForm = document.forms.updateAvatar;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = editProfileForm.elements.profileName;
const popupDescription = editProfileForm.elements.profileDescription;
const profileAvatar = document.querySelector('.profile__avatar');


export function saveProfileInfo() {
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

export function editProfileInfo() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}


export function updateAvatar(evt) {
  evt.preventDefault();
  toggleButtonState([], evt.submitter, validateConfig);
  const link = updateAvatarForm.elements.avatarLink;
  profileAvatar.src = link.value;
  closePopup(updateAvatarPopup);
  updateAvatarForm.reset();
}
