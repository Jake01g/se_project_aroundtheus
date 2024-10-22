export default class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }
  getUserInfo() {
    this._userInfo = {
      name: this.userName.textContent,
      description: this.userJob.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ name, description }) {
    this.userName.textContent = name;
    this.userJob.textContent = description;
  }
}
