import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

import "./assets/index.scss";

// i18n
const messages = { en, fr };
let locale = localStorage.getItem("lang_key");
if (locale === null) locale = "en";

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
