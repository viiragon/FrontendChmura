<template>
	<section class="section">
		<a id="download" href="data" download="null.txt"></a>
		<div v-if="siteData.load.loaded">
			<h1 class="title">
				Title
			</h1>
			<b-field>
				<b-input required placeholder="Name" v-on:input="updateData" v-model="siteData.trip.name"></b-input>
			</b-field>
			<h1 class="title">
				Description
			</h1>
			<textarea class="textarea" input v-on:input="updateData" v-model="siteData.trip.description"/>
			</textarea>
			<b-field></b-field>
			
			<h1 class="title">
				Start of trip
			</h1>
			<b-collapse :open="false">
						<button class="button is-white" size="is-small" slot="trigger">{{ new Date(siteData.trip.start).toLocaleString()}}<p></p><b-icon icon="edit" size="is-small"></b-icon></button>
						<nav class="level">
						<div class="level-left">
							<b-datepicker v-on:input="updateData"  v-model="siteData.trip.start" placeholder="Select start date" :first-day-of-week="1"></b-datepicker>
							<b-timepicker v-on:input="updateData"  v-model="siteData.trip.start" placeholder="Select start time" ></b-timepicker>
						</div>
						</nav>
			</b-collapse>		
			<b-field></b-field>
			<h1 class="title">
				End of trip
			</h1>
			<b-collapse :open="false">
						<button class="button is-white" size="is-small" slot="trigger">{{ new Date(siteData.trip.end).toLocaleString()}}<p></p><b-icon icon="edit" size="is-small"></b-icon></button>
						<nav class="level">
						<div class="level-left">
							<b-datepicker v-on:input="updateData" v-model="siteData.trip.end" placeholder="Select end date" :min-date="siteData.trip.startDate" :first-day-of-week="1"></b-datepicker>
							<b-timepicker v-on:input="updateData" v-model="siteData.trip.end" placeholder="Select end time" ></b-timepicker>
						</div>
						</nav>
			</b-collapse>	
			
			
			
			<map-component @point-added="addWaypoint" 
				@add-photo="add-photo"
				@remove-photo="removePhoto"
				@remove-waypoint="deleteWaypoint"
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
			
				<!--<b-table-column field="id" label="ID" width="40" numeric: true>
				{{ props.row.id }}
				</b-table-column>-->
				
				<b-table-column field="latitude" label="Latitude" centered>
					{{ props.row.latitude }}
				</b-table-column>
					
				<b-table-column field="longitude" label="Longitude" centered>
					{{ props.row.longitude }}
				</b-table-column>
				
				<b-table-column field="date" label="Date" sortable centered>
					<b-collapse :open="false">
						<button class="button is-white" size="is-small" slot="trigger">{{ new Date(props.row.date).toLocaleString()}}<p></p><b-icon icon="edit" size="is-small"></b-icon></button>
						<nav class="level">
							<div class="level-item">
								<b-datepicker v-on:input="updatePointData(props.row)" v-model="props.row.date" placeholder="Select Date" :first-day-of-week="1"></b-datepicker>
								<b-timepicker v-on:input="updatePointData(props.row)" v-model="props.row.date" placeholder="Select Time" ></b-timepicker></p>
							</div>
						</nav>
					</b-collapse>
				</b-table-column>

			</template>
			
			<template slot="detail" slot-scope="props">
				<article class="media">
					<figure class="media-left">
						<div v-if="props.row.photo != null">
							<p class="image is-64x64">
								<img :src="props.row.photo.url" v-on:click="showPhoto(props.row)">
							</p>
						</div>
					</figure>    
							
						<div class="buttons">
							<b-upload v-model="photos">
								<a class="button is-success" v-on:click="setTmpPoint(props.row.id)" id="photos">
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
		
		<p>
		<div>
			<input class="button is-link" v-on:click="saveGPSFile" type="button" value="Save GPX file">
			<b-upload v-model="files">
				<a class="button is-link" id="files">
					<b-icon icon="upload"></b-icon>
					<span>Read GPX file</span>
				</a>
			</b-upload>
			<input class="button is-link" v-on:click="" type="button" value="Show Poster">
		</div>
		
		<div>
			<input class="button is-danger is-pulled-right is-medium l-gap" v-on:click="deleteTrip"  type="button" value="Delete Trip"> 
			<input class="button is-link is-pulled-right is-medium" v-on:click="updateAll" type="button" value="Save Trip">
		</div>
		</p>
		<p>
			<input class="button is-link t-gap" v-on:click="createPoster" type="button" value="Create Poster">
			<input id="poster-btn" class="button is-link t-gap" v-on:click="getPoster" type="button" value="Download Poster" disabled>
		</p>
		<p>
			<input class="button is-link t-gap" v-on:click="createPresentation" type="button" value="Create Presentation">
			<input id="presentation-btn" class="button is-link t-gap" v-on:click="getPresentation" type="button" value="Download Presentation" disabled>
		</p>
			
	</div>
	<div v-else>
		<h1 class="title">
			{{ siteData.load.loadingMessage }}
		</h1>
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
				load: {					
					loaded: false,
					loadingMessage: ""
				},
				timeout: {
					data: null,
					points: []
				},
				tmpPointId: null
			},
			files: [],
			photos: [],
			defaultOpenedDetails: []
		}
	},
	beforeMount(){
		var tripId = this.$route.params.id;
		
		console.log(tripId, "route id")
		// this.siteData.trip = DataService.createTrip(tripId, "", "", null, null, []);
		this.siteData.load.loadingMessage = "Loading...";
		this.siteData.load.loaded = false;
		
		DataService.getTrip(tripId)
			.then(trip => {
				console.log(trip)
				this.siteData.trip = trip;
				this.siteData.load.loaded = true;
				/*DataService.updateWholeTrip(trip, trip)
					.then((data) => {
						console.log(data);
					}).catch((error) => {
						console.log(error);
					});*/
			}).catch((error) => {
				if (error.response) {
					var errorCode = error.response.status;
					if (errorCode >= 400 && errorCode < 500) {
						this.siteData.load.loadingMessage = `Site cannot load your trip. Please try again`;
					} else {
						this.siteData.load.loadingMessage = `Unknown error occured. Please try again`;
					}
				} else {
					this.siteData.load.loadingMessage = `Unknown error occured. Please try again`;
				}
				console.log(error);
			});
	},
	watch: {
		files: function(val,oldval){
			this.readGPSFile(this.files[0]);
		},
		photos: function(val,oldval){
			var formData = new FormData();
			var str = `{"waypointId": "` + this.siteData.tmpPointId + `","date": "` + new Date().getTime() + `"}`;
			console.log(str);
			formData.append("photoInfo", str);
			formData.append("photo", this.photos[0]);
			//var photo = DataService.createPhoto(DataService.getNextPhotoId(), formData, "")
			//this.addPhoto(this.siteData.tmpPointId, photo);
			http.postForm("/trips/" + this.siteData.trip.tripId + "/photos", formData)
				.then((data) => {
					if (data != "failed") {
						console.log(data);
						this.addPhoto(this.siteData.tmpPointId, {url: data});
					}
				}).catch((error) => {
					console.log(error);
				});
		}
	},
	methods: {
		showPhoto(point) {
			window.open(point.photo.url,"_self");
		},
		updateAll() {
			//DataService.updateWholeTrip(this.siteData.trip, this.siteData.trip)
			DataService.updatePartialTrip(this.siteData.trip.tripId, this.siteData.trip)
				.then((data) => {
					this.$dialog.alert('Trip was saved')
					this.siteData.trip = data;
				}).catch((error) => {
					console.log(error);
				});
		},
		updateData() {
			/*if (this.siteData.timeout.data) {
				clearTimeout(this.siteData.timeout.data);
			}
			this.siteData.timeout.data = setTimeout(() => {
				DataService.updatePartialTrip(this.siteData.trip.tripId, this.siteData.trip)
					.then((data) => {
						console.log("Data updated");
					}).catch((error) => {
						console.log(error);
					});
			}, 1000);*/
		},
		updatePointData(point) {
			var timeout = null;
			var id = point.id;
			for (var i = 0; i < this.siteData.timeout.points.length; i++) {
				if (this.siteData.timeout.points[i].id == id) {
					timeout = this.siteData.timeout.points[i];
				}
			}
			if (timeout != null) {
				clearTimeout(timeout.timeout);
			} else {
				timeout = { id: id, timeout: null };
			}
			timeout.timeout = setTimeout(() => {
				DataService.updatePoint(this.siteData.trip.tripId, id, point)
					.then((data) => {
						console.log("Point id." + id + " was updated");
						for (var i = 0; i < this.siteData.timeout.points.length; i++) {
							if (this.siteData.timeout.points[i].id == id) {
								this.siteData.timeout.points.splice(i, 1);
							}
						}
					}).catch((error) => {
						console.log(error);
					});
			}, 1000);
		},
		setTmpPoint(id) {
			this.siteData.tmpPointId = id;
		},
		readGPSFile(file) {
			this.siteData.load.loadingMessage = "Loading...";
			this.siteData.load.loaded = false;
			GPXService.readGPSFile(file)
				.then(trip => {
					DataService.updateWholeTrip(this.siteData.trip, trip)
						.then((data) => {
							this.$toast.open({
								duration: 5000,
								message: "Trip was loaded",
								type: 'is-success'
							});
							this.siteData.trip = data;
							this.siteData.load.loaded = true;
						}).catch((error) => {
							console.log(error);
							this.siteData.load.loaded = true;
						});
				}).catch((error) => {
					this.$toast.open({
						duration: 5000,
						message: "Not a proper GPX file",
						type: 'is-danger'
					});
					this.siteData.load.loaded = true;
				});
		},
		saveGPSFile() {
			GPXService.saveGPSFile(this.siteData);
		},
		addWaypoint(point) {
			console.log(point);
			//this.siteData.trip.waypoints.push(DataService.createWaypointFromMap(point));
			DataService.postWaypoint(this.siteData.trip.tripId, DataService.createWaypointFromMap(point))
				.then((data) => {				
					this.siteData.trip.waypoints.push(DataService.createWaypoint(
						data.waypointId,
						//DataService.getNextId(),
						data.latitude, 
						data.longitude,
						new Date(data.date)
					));
				}).catch((error) => {
					console.log(error);
				})
		},
		deleteWaypoint(id) {	
			console.log(this.siteData.trip.waypoints);
			for (var update = 0; update < this.siteData.trip.waypoints.length; update++){
				if (id == this.siteData.trip.waypoints[update].id) {
					DataService.deleteWaypoint(this.siteData.trip.tripId, id)
						.then(() => {
							this.siteData.trip.waypoints.splice(update, 1);
							console.log("Waypoint id." + id + " removed");
						}).catch((error) => {
							console.log(error);
						});
					break;
				}
			} 
		},
		deleteTrip() {
			this.$dialog.confirm({
				message: 'Are you sure you want to delete this trip?',
				onConfirm: () => {
					DataService.deleteTrip(this.siteData.trip.tripId)
						.then(() => {
							this.$router.push('/trips');
						}).catch((error) => {
							var message = "";
							if (error.response) {
								var errorCode = error.response.status;
								if (errorCode >= 400 && errorCode < 500) {
									message = `Site has encountered an error. Please try again`;
								} else {
									message = `Unknown error occured. Please try again`;
								}
							} else {
								message = `Unknown error occured. Please try again`;
							}
							this.$toast.open({
								duration: 5000,
								message: message,
								type: 'is-danger'
							});
							console.log(error);
						});
				}
			})
		}, 
		addPhoto(id,photo) {
			console.log("test");
			for (var update = 0; update < this.siteData.trip.waypoints.length; update++) {
				if (id == this.siteData.trip.waypoints[update].id) {
					this.siteData.trip.waypoints[update].photo = photo;
					console.log("Photo added");
					break;
				} 
			}
		}, 
		removePhoto(id) {
			for (var update = 0; update < this.siteData.trip.waypoints.length; update++) {
				if (id == this.siteData.trip.waypoints[update].id) {
					this.siteData.trip.waypoints[update].photo = null;
					console.log("Photo removed");
					break;
				} 
			}
		}, 
		addVideo(id, video) {
			for (var update = 0; update < this.siteData.trip.waypoints.length; update++) {		
				if (id == id == this.siteData.trip.waypoints[update].id) {
					this.siteData.trip.waypoints[update].video = video;
					console.log("Video added");
					break;
				} 
			}
		}, 
		removeVideo(id) {
			for (var update = 0; update < this.siteData.trip.waypoints.length; update++) {	
				if (id == this.siteData.trip.waypoints[update].id) {
					this.siteData.trip.waypoints[update].video = null;
					console.log("Video removed");
					break;
				} 
			}
		},
		createPoster(){
			DataService.createPoster(this.siteData.trip.tripId);
		},
		getPoster(){
			DataService.getPoster(this.siteData.trip.tripId);
			},
		createPresentation(){
			DataService.createPresentation(this.siteData.trip.tripId);
		},
		getPresentation(){
			DataService.getPresentation(this.siteData.trip.tripId);
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

.t-gap {
  margin-top: 4px;
}

.l-gap {
  margin-left: 4px;
}
</style>
