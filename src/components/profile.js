import { closePopup, addButtonLoader, removeButtonLoader } from "./modal.js";
import { toggleButtonState } from './validate.js'
import { validateConfig } from './index.js'
import { api } from "./Api.js";
export const editProfileForm = document.forms.editProfile;
export const updateAvatarForm = document.forms.updateAvatar;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = editProfileForm.elements.profileName;
const popupDescription = editProfileForm.elements.profileDescription;
const profileAvatar = document.querySelector('.profile__avatar');

export function renderProfile(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.src = user.avatar;
}

export function saveProfileInfo() {
  return api.updateUserInfo(popupName.value, popupDescription.value)
    .then(data => renderProfile(data))
    .catch(err => console.log(err));
}

export function editProfileInfo() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}


export function updateAvatar(evt) {
  evt.preventDefault();
  addButtonLoader(evt.submitter)
  const link = updateAvatarForm.elements.avatarLink;
  api.updateUserAvatar(link.value)
    .then(data => {
      updateAvatarForm.reset();
      toggleButtonState([], evt.submitter, validateConfig);
      renderProfile(data);
      closePopup(updateAvatarPopup);
    })
    .catch(err => console.log(err))
    .finally(() => removeButtonLoader(evt.submitter));
}
