export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      about: this._aboutElement.textContent.trim(),
      avatar: this._avatarElement.src,
      _id: this._id,
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._id = _id;
    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = name;
    }
  }
}
