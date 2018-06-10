// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import vueResource from "vue-resource";
Vue.use(vueResource);

import Buefy from "buefy";
import "buefy/lib/buefy.css";
import 'font-awesome/css/font-awesome.min.css';
Vue.use(Buefy, {
  defaultIconPack: "fa",
  defaultContainerElement: "app"
});

import VueInputAutowidth from 'vue-input-autowidth'
Vue.use(VueInputAutowidth);

import App from './App'
import router from './router'
import store from './auth'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
