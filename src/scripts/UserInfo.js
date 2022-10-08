export class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      info: document.querySelector(this._infoSelector).textContent,
    }
  }

  setUserInfo(data) {
    document.querySelector(this._infoSelector).textContent = data.info;
    document.querySelector(this._nameSelector).textContent = data.name;
  }
}
