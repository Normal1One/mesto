export class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._infoValue = document.querySelector(infoSelector);
    this._nameValue = document.querySelector(nameSelector);
  }

  getUserInfo() {
    return {
      name: this._nameValue.textContent,
      info: this._infoValue.textContent,
    }
  }

  setUserInfo(data) {
    this._infoValue.textContent = data.info;
    this._nameValue.textContent = data.name;
  }
}
