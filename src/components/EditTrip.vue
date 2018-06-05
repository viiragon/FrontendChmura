<template>
	<section class="section">
		<a id="download" href="data" download="null.txt"></a>
		<div v-if="siteData.loaded">
			<!--<h1>{{ siteData.trip.name }}</h1>-->
			 
			<!--<b-message> -->	
			<!--<b-collapse :open="false">
			<b-button class="button is-primary" slot="trigger">
			<b-icon icon="pencil"></b-icon>
			</b-button>-->
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
				/></textarea>
				
		<!--<b-message v-if> 
		{{siteData.trip.description}}
				</b-message>-->		
			
		
		</div>
		</section>
		<b-field>
		</b-field>
		<!--<section class="hero is-primary">
		<div class="hero-body">-->
			
		<!--	<h1 class="title">
			Description
			</h1>
				<textarea class="textarea" 
				input v-model="siteData.trip.description"
				/></textarea>
			
		
		<!--</div>
		</section>-->
			
		
        <!--</b-collapse>
		{{ siteData.trip.name }}
		</b-message>	
		
			<!--<input v-model="siteData.trip.name"/>-->
			<!--<h2>{{ siteData.trip.description }}</h2>-->
			<!--<b-field>
			<b-message> 
				<b-collapse :open="false">
            <b-button class="button is-primary" slot="trigger">
				<b-icon icon="pencil"></b-icon>
				</b-button>
            <div class="notification">
                <div class="content">
						
                        <textarea class="textarea" input v-model="siteData.trip.description"/></textarea>
						
                    
                </div>
            </div>
        </b-collapse>
				{{siteData.trip.description}}
				</b-message>-->			
			
			<!--<b-input placeholder="Description" v-model="siteData.trip.description"></b-input>-->
			</b-field>
			<map-component @point-added="addPoint"></map-component>
			<!--<input v-model="siteData.trip.description"/>-->
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
							</tr>
							</div>
							
							
                   
               
            </article>
        </template>
    </b-table>

				
			</b-table>
			<hr/>
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
					//<input class="button is-link" v-on:click="readGPSFile" type="file" name="Read GPS file"> 
				//:selected.sync="siteData.trip.waypoints[selected]"
				// v-on:click="saveGPSFile"
import Vue from 'vue'
import MapComponent from './MapView';
import VueInputAutowidth from 'vue-input-autowidth'
import Buefy from 'buefy'
import 'buefy/lib/buefy.min.css'
import 'font-awesome/css/font-awesome.min.css'
import http from './HttpService';
import axios from 'axios';

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultContainerElement: 'app'
})
Vue.use(VueInputAutowidth)
 
var nextId = 0;

var formatDate = function(value) {
	return value.getDate() + "." + (value.getMonth() + 1) + "." + (value.getYear() + 1900); 
}
		
export default {
	name: 'TripList',
	components: { 'map-component': MapComponent
				},
	data() {
		const siteData = {
			trip: {},
			loaded: true,
			tmp: {}
		}

		return {
			siteData,
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
	watch: {
		files:function(val,oldval){
			
			this.readGPSFile(this.files[0]);
			}
			},
		
		
	methods: {
		addPoint(point) {
			console.log(point)
			this.siteData.trip.waypoints.push(createWaypoint(
				point.lat, 
				point.lng,
				point.date
			));
		},
		getTrip(index) {
			var site = this;
			http.get("trips/" + index, function(response) {
				console.log(response);
				var waypoints = [];
				for (var i = 0; i < response.data.waypoints.length; i++) {
					var point = createWaypoint(
						response.data.waypoints[i].latitude, 
						response.data.waypoints[i].longitude,
						new Date(response.data.waypoints[i].date));
					point.id = response.data.waypoints[i].waypointId;
					waypoints.push(point);
				}
				var trip = createTrip(
					response.data.name, 
					response.data.description, 
					new Date(response.data.start), 
					new Date(response.data.end), 
					waypoints
				);
				site.siteData.trip = trip;
			}, function(error) {
				console.log(error);	
				site.readGPSText(
					`<gpx>
						<metadata>
							<name>Wycieczka w Warszawie</name>
							<desc>Widzieliśmy nawet pałac kultury</desc>
						</metadata>
						<trk>
							<trkseg>
								<trkpt lat="-25.363" lon="131.044">
									<ele>0.0</ele>
									<time>Tue Jun 05 2018 18:04:57 GMT+0200</time>
								</trkpt>
							</trkseg>
						</trk>
					</gpx>`
				);
			})
		},
		setDummyTrip() {
			this.siteData.trip = createTrip(
				"Okolice Warszawy", 
				"Blablabla",
				new Date("2017-08-22T06:11:00.000Z"),
				new Date("2017-09-22T06:11:00.000Z"),
				[]
			);
		},
		setRandomWayPoint() {
			this.siteData.trip.waypoints.push(createWaypoint(
				(Math.random() - 0.5) * 90, 
				(Math.random() - 0.5) * 180,
				new Date("2017-09-22T06:11:00.000Z"))
			);
		},
		readGPSFile(file) {	
			try {
				var reader = new FileReader();
				var site = this;
				reader.onload = function (e) {
					site.readGPSText(e.target.result);
				};
				reader.readAsText(file);
				console.log("Loading file: " + file.name);
			} catch(err) {
				console.error("ERROR! The file cannot be read!");
			}
		},
		readGPSText(textFile) {
			try {
				var xmlDoc;
				if (window.DOMParser) {
					var parser = new DOMParser();
					xmlDoc = parser.parseFromString(textFile, "text/xml");
				} else { // Internet Explorer
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = false;
					xmlDoc.loadXML(textFile);
				}
				var gpx = xmlDoc.getElementsByTagName("gpx")[0];
				
				var metadata = findInXML(gpx.children, "metadata");
				var name = findInXML(metadata.children, "name").innerHTML;
				var description = findInXML(metadata.children, "desc").innerHTML;
				
				var wayPoints = [];
				var trkpts = findAllInXML(findInXML(findInXML(gpx.children, "trk").children, "trkseg").children, "trkpt");
				var point;
				var startDate = Number.MAX_SAFE_INTEGER, endDate = 0;
				for (var i = 0; i < trkpts.length; i++) {
					point = trkpts[i];
					var date = new Date(findInXML(point.children, "time").innerHTML);
					wayPoints.push(createWaypoint(
						parseFloat(point.attributes.lat.nodeValue), 
						parseFloat(point.attributes.lon.nodeValue),
						date)
					);
					if (date.getTime() < startDate) {
						startDate = date.getTime();
					} 
					if (date.getTime() > endDate) {
						endDate = date.getTime();
					} 
				}
				var trip = createTrip(
					name, 
					description, 
					new Date(startDate), 
					new Date(endDate), 
					wayPoints
				);
				this.siteData.trip = trip;
				console.log("Trip \"" + name + "\" loaded!");
			} catch(err) {
				console.error(err);
				return;
			}
		},
		saveGPSFile() {
			try {
				var output = "<gpx>\n";
				output += "\t<metadata>\n";
				output += "\t\t<name>" + this.siteData.trip.name + "</name>\n";
				output += "\t\t<desc>" + this.siteData.trip.description + "</desc>\n";
				output += "\t</metadata>\n";
				output += "\t<trk>\n";
				output += "\t\t<trkseg>\n";
				var point;
				for (var i = 0; i < this.siteData.trip.waypoints.length; i++) {
					point = this.siteData.trip.waypoints[i];
					output += "\t\t\t<trkpt lat=\"" + point.latitude + "\" lon=\"" + point.longitude + "\">\n";
					output += "\t\t\t\t<ele>0.0</ele>\n";
					output += "\t\t\t\t<time>" + point.date + "</time>\n";
					output += "\t\t\t</trkpt>\n";
				}
				output += "\t\t</trkseg>\n";
				output += "\t</trk>\n";
				output += "</gpx>\n";
				console.log(output);
				
				var a = document.getElementById("download");
				console.log(a);
				var blob = new Blob([output], {type:'text/plain'});
				a.href = window.URL.createObjectURL(blob);
				var cleanName = this.siteData.trip.name.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
				a.download = cleanName + ".gpx";
				a.click();
				a.href = "";
				console.log("Saved file: " + cleanName + ".gps");
			} catch (err) {
				console.error("ERROR! Cannot save file!");
				console.error(err);				
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
		}, 
		createNewItem() {
			this.siteData.trip.waypoints.push(createWaypoint(0, 0, new Date()));
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
	},
	beforeMount(){
		this.siteData.trip = createTrip("", "", null, null, []);
		this.getTrip(this.$route.params.id);
		/*this.setDummyTrip();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();*/
		
		/*this.readGPSText(
			`<gpx>
				<metadata>
					<name>Wycieczka w Warszawie</name>
					<desc>Widzieliśmy nawet pałac kultury</desc>
				</metadata>
				<trk>
					<trkseg>
						<trkpt lat="-25.363" lon="131.044">
							<ele>0.0</ele>
							<time>Tue Jun 05 2018 18:04:57 GMT+0200</time>
						</trkpt>
					</trkseg>
				</trk>
			</gpx>`
		);*/
		
		//this.saveGPSFile();
		//this.getTrip(this.$route.params.id);
		/*var trip = */
	}
}

function createTrip(name, description, startDate, endDate, waypoints) {
	return {
		name: name,
		description: description,
		start: startDate,
		end: endDate,
		waypoints: waypoints
	};
}

function createWaypoint(lat, lon, date) {
	return {
		id : nextId++,  
		latitude: lat,
		longitude: lon,
		date: date,
		photo: null,
		video: null
	};
}

function findInXML(collection, name) {
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].nodeName == name) {
			return collection[i];
		}
	}
	return null;
}

function findAllInXML(collection, name) {
	var list = [];
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].nodeName == name) {
			list.push(collection[i]);
		}
	}
	return list;
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
