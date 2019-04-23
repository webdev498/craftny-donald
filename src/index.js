import React from "react"
import { render } from "react-dom"
import Firebase, { FirebaseContext } from "./components/firebase";

import "./index.scss"

import App from "./components/app"

render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
)
