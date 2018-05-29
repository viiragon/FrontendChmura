import Vue from "vue";
import Vuex from "vuex";
import auth from './actions'
Vue.use( Vuex );

export default new Vuex.Store({
  modules: {
	auth
  }
});

