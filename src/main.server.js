import Vue from "vue";
import App from "./App.vue";

   // copied main.js to creat context for render call to return Promise to Vue's root instance.
export default context => {
  return Promis.resolved(
    new Vue({
      render: h => h(App)
    })
  );
}
