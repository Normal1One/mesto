export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector, response) {
    this._infoElement = document.querySelector(infoSelector);
    this._nameElement = document.querySelector(nameSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = response._id;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
      avatar: this._avatarElement.textContent,
      _id: this._userId,
    }
  }

  setUserInfo( { name, about, avatar, _id } ) {
    this._infoElement.textContent = about;
    this._nameElement.textContent = name;
    this._avatarElement.src = avatar;
    this._userId = _id;
  }
}
