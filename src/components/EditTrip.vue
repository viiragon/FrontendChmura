<template>
	<section class="section">
		<a id="download" href="data" download="null.txt"></a>
		<div v-if="siteData.loaded">
		<section class="hero is-info">
			<div class="hero-body">
				<h1 class="title">
					Title
				</h1>
				<input 
				v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 5}"
				v-model="siteData.trip.name" />
				<b-field>
				</b-field>
				<h1 class="title">
					Description
				</h1>
				<textarea class="textarea" 
				input v-model="siteData.trip.description"
				></textarea>
			</div>
		</section>
			
		<map-component @point-added="addPoint" trip-id="bdf17206-578f-4556-ba33-e788c8567d22"></map-component>

		<b-table
			:data="siteData.trip.waypoints"
			paginated
			per-page="5"
			:opened-detailed="defaultOpenedDetails"
			detailed
			detail-key="id"
			focusable>

			<template slot-scope="props">
			
				<!--<b-table-column field="id" label="ID" width="40" numeric: true>
				{{ props.row.id }}
				</b-table-column>-->
				
				<b-table-column field="latitude" label="Latitude"   sortable centered>
					{{ props.row.latitude }}
				</b-table-column>
					
				<b-table-column field="longitude" label="Longitude"  sortable centered>
					{{ props.row.longitude }}
				</b-table-column>
				
				<b-table-column field="date" label="Date" sortable centered>
					{{ props.row.date }}
				</b-table-column>
				
				<!--<b-table-column field="name" label="Name point" centered=true>
					{{ props.row.name }}
				</b-table-column>-->

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
								v-on:click="deleteItem(props.row.id)">
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
		<input class="button is-link" v-on:click="save" type="button" value="Save data">
			
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
			columns: [
				{
					field: 'latitude',
					label: 'Latitude',
					width: '40',
					numeric: true
				},
				{
					field: 'longitude',
					label: 'Longitude',
					width: '40',
					numeric: true
				},
				{
					field: 'date',
					label: 'Date',
					centered: true,
					dateInputFormat: '"YYYY-MM-DDThh:mm:ss"',
					dateOutputFormat: 'MMM Do YY '
				},
				{
					field: '',
					label: 'Option',
					centered: true,
					formatter: formatDate
				}
			]
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
		addPoint(point) {
			console.log(point)
			this.siteData.trip.waypoints.push(DataService.createWaypoint(
				point.lat, 
				point.lng,
				point.date
			));
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
		},
		deleteItem(id) {	
			console.log(this.siteData.trip.waypoints);
			for (var update = 0; update<this.siteData.trip.waypoints.length; update++){
				if (id == this.siteData.trip.waypoints[update].id) {
					this.siteData.trip.waypoints.splice(update, 1);
					console.log("Waypoint id." + id + " removed");
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
