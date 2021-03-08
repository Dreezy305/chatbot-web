import { action, observable } from "mobx";
const APP_SECRET = process.env.APP_SECRET;

class Transactions {
  @observable success = true;
  @observable notify = "";
  @observable page = 1;
  @observable limit = 50;
  @observable loading = true;
  @observable bank = [];
  @observable analytics = [];
  @observable transactions = [];
  @observable transaction = {};

  @action setNotify(data) {
    this.notify = data;
  }

  @action setLoading(data) {
    this.loading = data;
  }

  @action getBank() {
    this.loading = true;
    const url = `${process.env.API_URL}paystack/bank`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((data) => {
        this.bank = data;
      })
      .catch((err) => console.log(err));
  }

  @action cronJob() {
    this.loading = true;
    const url = `${process.env.API_URL}job/pending-transactions`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((data) => {
        this.success = true;
        this.loading = false;
        this.notify = data.data;
      })
      .catch((err) => console.log(err));
  }

  @action addTransaction(body) {
    this.loading = true;
    const url = `${process.env.API_URL}transaction/create`;
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
          this.notify = data.data.message;
          this.success = false;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action updateTransaction(body, team) {
    this.loading = true;
    const url = `${process.env.API_URL}transaction/update-${team}`;
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
          this.notify = data.err;
          this.success = false;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action declineTransaction(body) {
    this.loading = true;
    const url = `${process.env.API_URL}transaction/decline`;
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
          this.notify = data.err;
          this.success = false;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action updateFinance(body) {
    this.loading = true;
    const url = `${process.env.API_URL}paystack/payment`;
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
          let err =
            data.err === "Cannot resolve account"
              ? "Invalid account number or bank!"
              : data.err;
          this.notify = err;
          this.success = false;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactions() {
    const url = `${process.env.API_URL}transactions?page=${this.page}&limit=${this.limit}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action searchTransaction(val) {
    this.transactions = [];
    const url = `${process.env.API_URL}transactions/search?query=${val}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactionsByUser(user) {
    const url = `${process.env.API_URL}transactions/user?page=${this.page}&limit=${this.limit}&requester=${user}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action searchTransactionUser(val, user) {
    this.transactions = [];
    const url = `${process.env.API_URL}transactions/search-user?query=${val}&requester=${user}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactionsByDepartment(department) {
    const url = `${process.env.API_URL}transactions/department?departmnent=${department}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactionsByFinance() {
    const url = `${process.env.API_URL}transactions/finance`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactionsPending(dept) {
    const url = `${process.env.API_URL}transactions/pending-${dept}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactionsByApproval(role) {
    const url = `${process.env.API_URL}transactions/role?page=${this.page}&limit=${this.limit}&role=${role}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action searchTransactionsByApproval(role, query) {
    const url = `${process.env.API_URL}transactions/search-role?query=${query}&role=${role}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transactions = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransaction(id) {
    const url = `${process.env.API_URL}transaction/${id}`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.transaction = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }

  @action getTransactionToday() {
    const url = `${process.env.API_URL}transaction/range`;
    fetch(url, {
      headers: { "content-type": "application/json", apikey: APP_SECRET },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          this.loading = false;
          this.analytics = response.data;
        } else {
          this.loading = false;
          this.notify = response.error;
          this.success = false;
        }
      })
      .catch((err) => console.log(err));
  }
}

const transaction = new Transactions();
export default transaction;
