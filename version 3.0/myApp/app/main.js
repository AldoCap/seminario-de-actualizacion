import { Application } from "./Application.js";

function startApplication() {
  let application = new Application();
  document.body.appendChild(application);
}

window.onload = startApplication();