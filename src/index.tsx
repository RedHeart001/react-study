import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Index from "./jsx"
import App, { Container } from "./App"
import  { RefApp} from "./ref"
import  { ContextApp} from "./context"
import  {RenderApp } from "./render"
// import {Container} from './props'
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <RenderApp/>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
