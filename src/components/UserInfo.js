export class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._avatarSelector = avatarSelector;
    this._userName = document.querySelector(nameSelector);
    this._userDesctiption = document.querySelector(descriptionSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { userName: this._userName.textContent, userDesctiption:  this._userDesctiption.textContent };
  }

  setUserInfo(userName, userDescription) {
    this._userName.textContent = userName;
    this._userDesctiption.textContent = userDescription;
  }

  getUserAvatar() {
    return { userAvatar: this._userAvatar.src };
  }

  setUserAvatar(userAvatarLink) {
    this._userAvatar.src = userAvatarLink;
  }
}
