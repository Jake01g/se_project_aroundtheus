export default class UserInfo {
  constructor({ userName, userJob, avatarSelector }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      description: this._userJob.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userJob.textContent = description;
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
