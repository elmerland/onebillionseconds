import ReactDOM from "react-dom";
import {App, ProgressBar, SecondsCalculator} from "./App";
import React from "react";

ReactDOM.render(<App />, document.getElementById("app"));

ReactDOM.render(<ProgressBar />, document.getElementById("oneSecondAnimation"));

ReactDOM.render(<SecondsCalculator />, document.getElementById("secondsCalculator"));
