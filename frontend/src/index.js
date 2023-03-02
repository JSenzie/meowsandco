import React from "react"
import ReactDOM from "react-dom/client"
import "./bootstrap.min.css"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import store, { initialState } from "./store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store} serverState={initialState}>
    <App />
  </Provider>
)

reportWebVitals()
