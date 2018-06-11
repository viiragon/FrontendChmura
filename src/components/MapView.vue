<template>
  <section class="section">
    <h1 class="title">Mapa</h1>
    <div id="map"></div>
    
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <map-modal :isCardModalActive.sync="isCardModalActive" :waypoint="clickedWaypoint" @remove-waypoint="removeWaypoint" has-modal-card>
        </map-modal>
        
        </b-modal>
  </section>
</template>

<script>
import MapModal from "./MapModal";
import http from "./HttpService.js";

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
      clickedWaypoint: null
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
            this.addWaypointsToMap(this.waypoints, map);
      },
      waypoints: function(waypoints) {  
        if (this.map)
            this.addWaypointsToMap(waypoints, this.map);
        
      },
      tripId: function(tripId) {
          console.log("tripId", tripId)
      }
  },
  methods: {
    onMapClickEvent: function(event) {
        this.addWaypoint(event);
    },
    addWaypointsToMap: function(waypoints, map) {
        waypoints.forEach(waypoint => {
            this.placeMarkerOnMap(new google.maps.LatLng({
                lat: waypoint.latitude,
                lng: waypoint.longitude
                }), 
                waypoint.id, 
                map);
        });
    },
    addWaypoint: function(event) {
        // http.post(`trips/${this.tripId}/waypoints`, {
        //   date: new Date(),
        //   latitude: event.latLng.lat(),
        //   longitude: event.latLng.lng()
        // });
        
        this.$emit("point-added", {
            id: Math.random() * 100000,
            lng: event.latLng.lng(),
            lat: event.latLng.lat(),
            date: new Date()
        });

        this.placeMarkerOnMap(event.latLng, this.map);
    },
    removeWaypoint: function(waypointId) {
        console.log(waypointId);
        this.$emit("remove-waypoint", waypointId);

        // http.delete(`trips/${this.tripId}/waypoints/${waypointId}`);
    },
    activateModal: function(e) {
      console.log(this.isCardModalActive);
      console.log(e.get("id"));
      this.clickedWaypoint = e;
      this.isCardModalActive = true;
    },
    placeMarkerOnMap: function(location, markerId, map) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        this.flightPlanCoordinates.push(location);
        var flightPath = new google.maps.Polyline({
            path: this.flightPlanCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
        google.maps.event.addListener(marker, "click", () => {
            this.activateModal(marker);
            //this.removeWaypoint(markerId)
        });

        marker.set("id", markerId);
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
