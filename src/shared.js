const Store = require("electron-store");

const store = new Store();

module.exports = {
  data: store,
  incSended: (num) => {
    store.set("sended", store.get("sended") + num);
  },
  incReceived: (num) => {
    store.set("received", store.get("received") + num);
  },
};
