class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._userName = nameSelector;
    this._userJob = jobSelector;
  }

  getUserInfo() {
    const currentUserInfo = {};
    currentUserInfo.name = this._userName.textContent;
    currentUserInfo.job = this._userJob.textContent;
    return currentUserInfo;
  };

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  }
}

export { UserInfo }