console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/weather?address=" + location).then((res) => {
    res.json().then((res) => {
      if (res.error) {
        messageOne.textContent = res.error;
      } else {
        messageOne.textContent = res.location;
        messageTwo.textContent = res.forecast;
      }
    });
  });
});
