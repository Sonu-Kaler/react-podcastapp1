import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
const rt = createRoot(document.getElementById("root"));

rt.render(
<Provider store={store}>
<App/>
</Provider>)


// this app is wokring till logout