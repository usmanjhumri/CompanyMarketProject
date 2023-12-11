import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PhotoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PhotoProvider>
    </Provider>
  </React.StrictMode>
);
