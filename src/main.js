import "normalize.css";
import {} from "./basic.js";
import "./style.scss";

console.log("test");

function isButton(node) {
  return node.tagName.toLowerCase() === "button";
}

var mainView = document.querySelector(".main-view");
mainView.addEventListener("click", function (event) {
  if (isButton(event.target)) console.log(event.target.innerText);
});
