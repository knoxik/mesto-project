import { api } from './Api.js'

export class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    this._userName = document.querySelector(this._nameSelector).textContent;
    this._userDesctiption = document.querySelector(this._descriptionSelector).textContent;


    return { userName: this._userName, userDesctiption:  this._userDesctiption };
  }

  setUserInfo(userName, userDescription) {
    document.querySelector(this._nameSelector).textContent = userName;
    document.querySelector(this._descriptionSelector).textContent = userDescription;
  }

  getUserAvatar() {
    this._userAvatar = document.querySelector(this._avatarSelector).src;
    return { userAvatar: this._userAvatar };
  }

  setUserAvatar(userAvatarLink) {
    document.querySelector(this._avatarSelector).src = userAvatarLink;
  }

}
