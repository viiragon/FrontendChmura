import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import vueResource from 'vue-resource'
Vue.use(vueResource);
=======
>>>>>>> e6ae80d90a15e8bf43893509e20435fb8d86c69d
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy)
import HelloWorld from '@/components/HelloWorld';
import TripList from '@/components/TripList';
import MapView from '@/components/MapView';
<<<<<<< HEAD
import EditTrip from '@/components/EditTrip';
=======
>>>>>>> e6ae80d90a15e8bf43893509e20435fb8d86c69d


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'TripList',
      component: TripList
    },

    {
      path: '/map',
      name: 'MapView',
      component: MapView
<<<<<<< HEAD
    },
	
	{
      path: '/trip/:id',
      name: 'EditTrip',
      component: EditTrip
=======
>>>>>>> e6ae80d90a15e8bf43893509e20435fb8d86c69d
    }
  ]
})
