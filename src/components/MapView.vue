<template>
  <section class="section">
    <h1 class="title">Map</h1>
    <div id="map"></div>
    
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <map-modal :tripId="tripId" :waypoint="clickedWaypoint" :all-waypoints="sortedWaypoints" @remove-waypoint="removeWaypoint"  @update-waypoint="updateWaypoint" has-modal-card>
        </map-modal>
        
        </b-modal>
  </section>
</template>

<script>
import MapModal from "./MapModal";
import http from "./HttpService.js";

import DataService from './DataService.js';

export default {
  name: "MapView",
  components: {
    "map-modal": MapModal
  },
  props: ["tripId", "waypoints"],
  data() {
    return {
      isCardModalActive: false,
      flightPlanCoordinates: [],
      map: null,
      clickedWaypoint: null,
      markers: [],
      flightPath: []
    };
  },
  created: function() {
      this.createGoogleMap();
  },
  beforeMount() {
    
  },
  watch: {
      map: function(map) {
        map.addListener('click', this.onMapClickEvent);
        if (this.waypoints)
            this.addWaypointsToMap(this.sortedWaypoints, map);
      },
      waypoints: function(waypoints) {  
        if (this.map)
            this.addWaypointsToMap(this.sortedWaypoints, this.map);
        
      },
      tripId: function(tripId) {
          console.log("tripId", tripId)
      }
  },
  computed: {
      sortedWaypoints: function() {
          return this.waypoints.sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
      }
  },
  methods: {
    onMapClickEvent: function(event) {
        this.addWaypoint(event);
        // this.clearPath();
    },
    clearMarkers: function() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
    },
    addWaypointsToMap: function(waypoints, map) {
        this.clearMarkers();
        this.clearPath();

        waypoints.forEach(waypoint => {
            this.placeMarkerOnMap(new google.maps.LatLng({
                lat: waypoint.latitude,
                lng: waypoint.longitude
                }), 
                waypoint, 
                map);
        });
    },
    addWaypoint: function(event) {
        this.$emit("point-added", {
            id: Math.random() * 100000,
            lng: event.latLng.lng(),
            lat: event.latLng.lat(),
            date: new Date()
        });

        this.placeMarkerOnMap(event.latLng, this.map);
    },
    updateWaypoint: function(waypoint, nextWaypoint) {
        
		DataService.updatePoint(this.tripId, waypoint.id, {
            longitude: waypoint.longitude,
            latitude: waypoint.latitude,
            photo: waypoint.photo,
            date: nextWaypoint ? new Date(new Date(nextWaypoint.date).getTime() - 10) : waypoint.date
        }).then(() => {
            if (nextWaypoint) {
                return DataService.updatePoint(this.tripId, nextWaypoint.id, {
                    longitude: nextWaypoint.longitude,
                    latitude: nextWaypoint.latitude,
                    date: new Date(nextWaypoint.date).getTime() + 10
                });
            } else {
                return 1;
            }
        }).then(() => {
            return DataService.getTrip(this.tripId)
			
        }).then(trip => {
            console.log(trip)
            this.waypoints = trip.waypoints;
        });

        
    },
    removeWaypoint: function(waypoint) {
        waypoint.setMap(null);
        
      console.log(waypoint.get("id"));
        this.$emit("remove-waypoint", waypoint.get("id"));

        // http.delete(`trips/${this.tripId}/waypoints/${waypointId}`);
    },
    clearPath() {
        this.flightPlanCoordinates = [];
    },
    activateModal: function(e) {
      console.log(this.isCardModalActive);
      console.log(e.get("id"));
      this.clickedWaypoint = e;
      this.isCardModalActive = true;
    },
    placeMarkerOnMap: function(location, waypoint, map) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        this.markers.push(marker);
        this.markers[this.markers.length - 1].setMap(map);
        if(this.flightPath && this.flightPath.visible)
            this.flightPath.setMap(null);

        this.flightPlanCoordinates.push(location);
        this.flightPath = new google.maps.Polyline({
            path: this.flightPlanCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        this.flightPath.setMap(map);
        google.maps.event.addListener(marker, "click", () => {
            this.activateModal(marker);
            //this.removeWaypoint(markerId)
        });

        marker.set("id", waypoint.id);
        marker.set("date", waypoint.date);
        marker.set("photo", waypoint.photo)
        console.log(waypoint.photo)
        // console.log("click", location, markerId);

        return marker;
    },
    createGoogleMap: function() {

        var self = this;

        function initMap() {
            var uluru = { lat: -25.363, lng: 131.044 };
            self.map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 4,
                    center: uluru
            });
        }

        window.initMap = initMap;

        var mapKey = document.createElement("script");
        mapKey.setAttribute(
        "src",
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDCVCc8UDPw3icWW8kDc89JPqmwsS9FqWQ&callback=initMap"
        );
        mapKey.setAttribute("type", "text/javascript");

        document.body.appendChild(mapKey);
    }
  }
};
</script>
<style>
#map {
  height: 400px;
}
</style>
