import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueAxios from "vue-axios";
import "./registerServiceWorker";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL ?? "http://localhost:4000/api",
});

Vue.use(VueAxios, axiosInstance);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
