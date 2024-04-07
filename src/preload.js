const { data } = require("./shared");

window.addEventListener("DOMContentLoaded", () => {
  let $host = document.getElementById("host");
  let $sended = document.getElementById("sended");
  let $received = document.getElementById("received");
  let $account = document.getElementById("account");
  setInterval(function () {
    $host.innerText = data.get("host");
    $sended.innerText = data.get("sended");
    $received.innerText = data.get("received");
    $account.innerText = data.get("account");
  }, 500);
});
