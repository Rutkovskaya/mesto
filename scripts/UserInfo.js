class UserInfo {
  constructor(nameProfile, jobProfile) {
    this._userName = nameProfile;
    this._userJob = jobProfile;
  }

  getUserInfo() {
    const currentUserInfo = {};
    currentUserInfo.nameProfile = this._userName.textContent;
    currentUserInfo.jobProfile = this._userJob.textContent;
    return currentUserInfo;
  };

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
  }
}

export { UserInfo }