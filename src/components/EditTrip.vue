<template>
	<section class="section">
		<a id="download" href="data" download="null.txt"></a>
		<div v-if="siteData.loaded">
			<h1 class="title">
				Title
			</h1>
			<b-field>
				<b-input required placeholder="Name" v-model="siteData.trip.name"></b-input>
			</b-field>
				<h1 class="title">
					Description
				</h1>
				<textarea class="textarea" input v-model="siteData.trip.description"/>
				</textarea>
			<b-field></b-field>
				<h1 class="title">
						Start of trip
					</h1>
					<nav class="level">
								<div class="level-left">
									<b-datepicker v-model="siteData.trip.startDate" placeholder="Select start date" :first-day-of-week="1"></b-datepicker>
									<b-timepicker v-model="siteData.trip.startDate" placeholder="Select start time"></b-timepicker>
								</div>
					</nav>
			<b-field></b-field>
					<h1 class="title">
						End of trip
					</h1>
					<nav class="level">
								<div class="level-left">
									<b-datepicker v-model="siteData.trip.endDate" placeholder="Select end date" :min-date="siteData.trip.startDate" :first-day-of-week="1"></b-datepicker>
									<b-timepicker v-model="siteData.trip.endDate" placeholder="Select end time" ></b-timepicker>
								</div>
					</nav>
			<map-component @point-added="addWaypoint" 
				@add-photo="add-photo"
				@remove-photo="removePhoto"
				@remove-point="removePoint"
				:trip-id="siteData.trip.tripId"
				:waypoints="siteData.trip.waypoints"></map-component>

			<b-table
				:data="siteData.trip.waypoints"
				paginated
				per-page="5"
				:opened-detailed="defaultOpenedDetails"
				detailed
				detail-key="id"
				focusable>

			<template slot-scope="props">
		
				
				<b-table-column field="latitude" label="Latitude"   centered>
					{{ props.row.latitude }}
				</b-table-column>
					
				<b-table-column field="longitude" label="Longitude"  centered>
					{{ props.row.longitude }}
				</b-table-column>
				
				<b-table-column field="date" label="Date" sortable centered>
						
					<b-collapse :open="false">
						<button class="button is-white" size="is-small" slot="trigger">{{ new Date(props.row.date).toLocaleString()}}<p></p><b-icon icon="pencil" size="is-small"></b-icon></button>
							<nav class="level">
								<div class="level-item">
									<b-datepicker v-model="props.row.date" placeholder="Select Date" :first-day-of-week="1"></b-datepicker>
									<b-timepicker v-model="props.row.date" placeholder="Select Time" ></b-timepicker></p>
								</div>
							</nav>
					</b-collapse>
				</b-table-column>
				
			</template>
			
			<template slot="detail" slot-scope="props">
				<article class="media">
					<figure class="media-left">
						<p class="image is-128x128">
							<img src="https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-12/Jacarandas%20in%20Spring%20bloom%2C%20Royal%20Botanic%20Garden%2C%20Sydney.jpg?itok=zpohBz_j">
						</p>
					</figure>    
							
						<div class="buttons">
							<b-upload v-model="photos" v-on:change="addPhoto(photos[0])">
								<a class="button is-success" id="photos">
									<b-icon icon="upload"></b-icon>
									<span>Add Photo</span>
								</a>
							</b-upload>
							<!--<button  @click="addPhoto" class="button is-success">Add Photo</button>-->
							<button  @click="removePhoto" class="button is-danger">Remove Photo</button>
							<!--<button  @click="addVideo" class="button is-success">Add Movie</button>
							<button  @click="removeVideo" class="button is-danger">Remove Movie</button>-->

							<a class="button is-danger is-outlined"	
								v-on:click="deleteWaypoint(props.row.id)">
								<span>Delete point</span>
								<span class="icon is-small">
									<b-icon icon="close"></b-icon>
								</span>
							</a>
						</div>
				</article>
        	</template>
    	</b-table>
		
		<input class="button is-link" v-on:click="saveGPSFile" type="button" value="Save GPX file">
		<b-upload v-model="files" v-on:change="readGPSFile(files[0])">
			<a class="button is-link" id="files">
				<b-icon icon="upload"></b-icon>
				<span>Read GPX file</span>
			</a>
		</b-upload>
		<input class="button is-link" v-on:click="" type="button" value="Show Poster">
			
	</div>
	<div v-else>
		LOADING...
	</div>
	</section> 
</template>

<script>

import Vue from 'vue'
import MapComponent from './MapView';
import http from './HttpService';
import GPXService from './GPXService.js';
import DataService from './DataService.js';

var formatDate = function(value) {
  return (
    value.getDate() +
    "." +
    (value.getMonth() + 1) +
    "." +
    (value.getYear() + 1900)
  );
};

export default {
  name: "TripList",
  components: {
    "map-component": MapComponent
  },
  data() {
		return {
			siteData:{
				trip: {},
				loaded: true,
				tmp: {}
			},
			selected: 1,
			files: [],
			photos: [],
			defaultOpenedDetails: [],
		}
	},
	beforeMount(){
		this.siteData.trip = DataService.createTrip("", "", null, null, []);
		DataService.getTrip(this.$route.params.id)
			.then(trip => this.siteData.trip = trip);
	},
	watch: {
		files:function(val,oldval){
			this.readGPSFile(this.files[0]);
			}
	},
	methods: {
		readGPSFile(file) {
			GPXService.readGPSFile(file)
				.then(trip => this.siteData.trip = trip);
		},
		saveGPSFile() {
			GPXService.saveGPSFile(this.siteData);
		},
		addWaypoint(point) {
			console.log(point)
			this.siteData.trip.waypoints.push(DataService.createWaypoint(
				point.lat, 
				point.lng,
				point.date
			));
		},
		deleteWaypoint(id) {	
			console.log(this.siteData.trip.waypoints);
			for (var update = 0; update<this.siteData.trip.waypoints.length; update++){
				if (id == this.siteData.trip.waypoints[update].id) {
					this.siteData.trip.waypoints.splice(update, 1);
					console.log("Waypoint id." + id + " removed");
				}
			} 
		},
		save() {
			console.log("Let's pretend it works OwO");
		}, 
		addPhoto(id,photo) {
			console.log("test");
			for (var update = 0; update<this.siteData.trip.waypoints.length; update++)
			{
			if (id == this.siteData.trip.waypoints[update].id) {
				this.siteData.trip.waypoints[update].photo = photo;
				console.log("Photo added");
			} 
			}
		}, 
		
		removePhoto(id) {
			for (var update = 0; update<this.siteData.trip.waypoints.length; update++)
			{
			if (id == this.siteData.trip.waypoints[update].id) {
				this.siteData.trip.waypoints[update].photo = null;
				console.log("Photo removed");
			} 
			}
		}, 
		addVideo(id, video) {
			for (var update = 0; update<this.siteData.trip.waypoints.length; update++)
			{		
			if (id == id == this.siteData.trip.waypoints[update].id) {
				this.siteData.trip.waypoints[update].video = video;
				console.log("Video added");
			} 
			}
		}, 
		removeVideo(id) {
			for (var update = 0; update<this.siteData.trip.waypoints.length; update++)
			{	
			if (id == this.siteData.trip.waypoints[update].id) {
				this.siteData.trip.waypoints[update].video = null;
				console.log("Video removed");
			} 
			}
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}
h1 {
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
