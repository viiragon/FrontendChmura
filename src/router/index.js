import Vue from "vue";
import Router from "vue-router";
import vueResource from "vue-resource";
Vue.use(vueResource);
import Buefy from "buefy";
import "buefy/lib/buefy.css";
Vue.use(Buefy);
import HelloWorld from "@/components/HelloWorld";
import TripList from "@/components/TripList";
import MapView from "@/components/MapView";
import EditTrip from "@/components/EditTrip";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/list",
      name: "TripList",
      component: TripList
    },

    {
      path: "/map",
      name: "MapView",
      component: MapView
    },

    {
      path: "/trip/:id",
      name: "EditTrip",
      component: EditTrip
    }
  ]
});
