class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userАbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const getInfo = {};
    getInfo.name = this._userName.textContent;
    getInfo.job = this._userАbout.textContent;
    getInfo.avatar = this._userAvatar.src;
    return getInfo
  };

  setUserInfo(data) {
    if (data.name) {
      this._userName.textContent = data.name;
    }
    if (data.about) {
      this._userАbout.textContent = data.about;
    }
    if (data.avatar) {
      this._userAvatar.src = data.avatar;
    }
  }
}

export { UserInfo }