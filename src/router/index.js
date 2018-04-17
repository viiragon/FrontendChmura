import Vue from 'vue'
import Router from 'vue-router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy)
import HelloWorld from '@/components/HelloWorld';
import TripList from '@/components/TripList';
import MapView from '@/components/MapView';


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
    }
  ]
})
