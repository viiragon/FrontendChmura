<template>
  <section class="section">
	<h1 class="title">Mapa</h1>
	<div id="map"></div>
    
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <map-modal :isCardModalActive.sync="isCardModalActive" :waypoint="clickedWaypoint" has-modal-card>
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
  props: ["tripId"],
  data() {
    return {
      isCardModalActive: false,
      flightPlanCoordinates: [],
      map: null,
      clickedWaypoint: null
    };
  },
  created: function() {
    var self = this;

    function initMap() {
      var uluru = { lat: -25.363, lng: 131.044 };
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru
      });

      this.map.addListener("click", event => {
        http.post(`trips/${this.tripId}/waypoints`, {
          date: new Date(),
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng()
        });

        self.placeMarker(event.latLng, this.map);
      });

      http.get(`trips/${self.tripId}`).then(data => {
        data.waypoints.forEach(waypoint => {
          var marker = self.placeMarker(new google.maps.LatLng({
            lat: waypoint.latitude,
            lng: waypoint.longitude,
            title: waypoint.waypointId
          }), this.map);

          marker.set("id", waypoint.id);
          console.log("xdd", waypoint.latitude,waypoint.longitude)
        });
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
  },
  methods: {
    activateModal: function(e) {
      console.log(this.isCardModalActive);
      console.log(e.get("id"));
      this.clickedWaypoint = e;
      this.isCardModalActive = true;
    },
    placeMarker: function(location, map) {
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
      });
      console.log("click", location);

      this.$emit("point-added", {
        id: Math.random() * 100000,
        lng: location.lng(),
        lat: location.lat(),
        date: new Date()
      });
    }
  }
};
</script>
<style>
#map {
  height: 400px;
}
</style>
