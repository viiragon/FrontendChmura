import Vue from "vue";
import Router from "vue-router";

import auth from '../auth'
import HelloWorld from "@/components/HelloWorld";
import StartView from"@/components/StartView";
import TripListView from "@/components/TripListView";
import MapView from "@/components/MapView";
import EditTrip from "@/components/EditTrip";
import LoginView from "@/components/LoginView";

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!auth.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (auth.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
	{
		path: "/",
		name: "StartView",
		component: StartView,
		beforeEnter: ifAuthenticated
    },
	
	{
		path: "/login",
		name: "LoginView",
		component: LoginView,
		beforeEnter: ifNotAuthenticated
    },

    {
		path: "/info",
		name: "HelloWorld",
		component: HelloWorld,
		beforeEnter: ifAuthenticated
    },

	{
		path: "/trips",
		name: "TripListView",
		component: TripListView,
		beforeEnter: ifAuthenticated
    },

    {
		path: "/map",
		name: "MapView",
		component: MapView,
		beforeEnter: ifAuthenticated
    },

    {
		path: "/trip/:id",
		name: "EditTrip",
		component: EditTrip,
		beforeEnter: ifAuthenticated
    }
  ]
});
