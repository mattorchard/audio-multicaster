import { render } from "preact";
import App from "./App";

const appRootElement = document.querySelector("#appRoot")!;

render(App(), appRootElement);
