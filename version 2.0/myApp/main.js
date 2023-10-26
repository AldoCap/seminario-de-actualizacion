import { Application } from "./app/Application.js";

function startApplication() {
  let application = new Application();
  document.body.appendChild(application);
}

window.onload = startApplication();