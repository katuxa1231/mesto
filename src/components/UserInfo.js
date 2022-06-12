export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userInfoAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userInfoAvatarElement = document.querySelector(userInfoAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      info: this._userInfoElement.textContent
    }
  }

  setUserInfo(name, info) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = info;
  }

  setUserAvatar(avatar) {
    this._userInfoAvatarElement.style.backgroundImage = `url(${avatar})`;
  }
}
