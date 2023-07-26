import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_en from "./locale/en/translation.json";
import common_ru from "./locale/ru/translation.json";

const userLanguage = navigator.language.split("-")[0];

i18next.init({
  interpolation: { escapeValue: false },
  lng: userLanguage,
  resources: {
    en: {
      common: common_en,
    },
    ru: {
      common: common_ru,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
