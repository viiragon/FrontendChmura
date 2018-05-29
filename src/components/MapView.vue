<template>
  <section class="section">
	<h1 class="title">Mapa</h1>
	<div id="map"></div>
    
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <map-modal :isCardModalActive.sync="isCardModalActive" has-modal-card>
        </map-modal>
        
        </b-modal>
  </section>
</template>

<script>

import MapModal from "./MapModal";

export default {

  name: "MapView",
  components: {
        'map-modal': MapModal
    },
  created: function() {
      var flightPlanCoordinates = [
      ];
        var self = this;

	function placeMarker(location, map) {
	  var marker = new google.maps.Marker({
		position: location,
		map: map
      });
      
      flightPlanCoordinates.push(location);
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
      
      flightPath.setMap(map)
      marker.addListener("click", self.activateModal);
	  console.log("click", location);
	}

	function initMap() {
	  var uluru = { lat: -25.363, lng: 131.044 };
	  var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: uluru
	  });
	  var marker = new google.maps.Marker({
		position: uluru,
		map: map
	  });
	  marker.addListener("click", self.activateModal);

flightPlanCoordinates.push(
          new google.maps.LatLng(-25.363, 131.044),
          )
	  map.addListener("click", function(event) {
		placeMarker(event.latLng, map);
	  });
	//   var image = {
	// 	url: "https://www.wykop.pl/cdn/c3201142/comment_PsKw6GPbr0qiHWADi51CcZmnSz7I7tvK.jpg",
	// 	size: new google.maps.Size(32, 32)
	// 	}
	//   var beachMarker = new google.maps.Marker({
	// 	position: { lat: -33.89, lng: 151.274 },
	// 	map: map,
	// 	icon: image
    //   });
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
        activateModal: function() {
          
          console.log(this.isCardModalActive)
          this.isCardModalActive = true;

        }
    },
  data() {
        return {
            isCardModalActive: false
        }
    }
};
</script>
<style>
#map {
  height: 400px;
}
</style>
