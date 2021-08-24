class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
  }

  getUserInfo () {
    const getInfo = {};
    getInfo.name = this._userName.textContent;
    getInfo.job = this._userJob.textContent;
    return getInfo
   // return { name: this._userName.textContent, job: this._userJob.textContent };
  };

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  }
}

export { UserInfo }