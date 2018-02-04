import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.eot";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.svg";
import "bootstrap/dist/fonts/glyphicons-halflings-regular.woff";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
