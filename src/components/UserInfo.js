export class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._infoElement = document.querySelector(infoSelector);
    this._nameElement = document.querySelector(nameSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
    }
  }

  setUserInfo(data) {
    this._infoElement.textContent = data.info;
    this._nameElement.textContent = data.name;
  }
}
