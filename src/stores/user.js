import { observable, action } from "mobx";
const APP_SECRET = process.env.APP_SECRET;

class Users {
  @observable success = true;
  @observable notify = "";
  @observable token = "";
  @observable email = "";
  @observable password = "";
  @observable loading = true;
  @observable users = [];
  @observable user = {};

  @action setUser(data) {
    this.user = data;
  }
  @action setLoading(data) {
    this.loading = data;
  }

  @action setEmail(data) {
    this.email = data;
  }

  @action setPassword(data) {
    this.password = data;
  }

  @action setNotify(data) {
    this.notify = data;
  }

  @action parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  async getUserbyEmail(email) {
    const url = `${process.env.API_URL}user/email`;
    let response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: APP_SECRET },
      body: JSON.stringify({ email }),
    });
    let data = await response.json();
    return data;
  }

  @action authenticate(body) {
    this.loading = true;
    const url = `${process.env.API_URL}user/login`;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: APP_SECRET },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.token) {
          let token = this.parseJwt(response.token);

          this.getUserbyEmail(token.email).then((data) => {
            if (data.data) {
              localStorage.setItem("_aut", response.token);
              localStorage.setItem("_name", data.data.name);
              localStorage.setItem("_department", data.data.department);
              localStorage.setItem("_role", data.data.role);
              this.token = response.token;
              this.success = true;
              this.loading = false;
            } else {
              this.token = "";
              this.notify = "You are not authorized to use Autopay!";
              this.success = false;
              this.loading = false;
            }
          });
        } else {
          this.loading = false;
          this.token = "";
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action addUser(body) {
    this.loading = true;
    const url = `${process.env.API_URL}user/create`;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: APP_SECRET },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.success = true;
          this.loading = false;
        } else {
          this.notify = "Duplicate entry. Email already exists!";
          this.success = false;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action updateUser(body) {
    this.loading = true;
    const url = `${process.env.API_URL}user/update`;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: APP_SECRET },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.success = true;
          this.loading = false;
        } else {
          this.notify = "Error updating user!";
          this.success = false;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getUsers() {
    const url = `${process.env.API_URL}users?page=1&limit=1000`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.users = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getUser(email) {
    const url = `${process.env.API_URL}user/email`;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", apikey: APP_SECRET },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.user = data.data;
      })
      .catch((err) => console.log(err));
  }

  @action searchUser(query) {
    this.loading = true;
    const url = `${process.env.API_URL}users/search?query=${query}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.loading = false;
          this.users = data.data;
        } else {
          this.loading = false;
          this.notify = data.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }
}

const user = new Users();
export default user;
