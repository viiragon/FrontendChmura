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
			
			</b-field>
				<input 
				v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 5}"
				v-model="siteData.trip.name" />
			
		<!--<b-message v-if> 
		{{siteData.trip.description}}
				</b-message>-->		
			
		
		</div>
		</section>
		<b-field>
		</b-field>
		<section class="hero is-primary">
		<div class="hero-body">
			
			<h1 class="title">
			Description
			</h1>
				<textarea class="textarea" 
				input v-model="siteData.trip.description"
				/></textarea>
			
		
		</div>
		</section>
			
		
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
				@details-open="(row, id) => $toast.open(`Expanded ${row.id}`)"
				focusable>
				
				
				 <template slot-scope="props">
				 
			<b-table-column field="id" label="ID" width="40" numeric: true>
            {{ props.row.id }}
			</b-table-column>
			
            <b-table-column field="latitude" label="Latitude"  width="40">
                {{ props.row.latitude }}
            </b-table-column>
				
			<b-table-column field="longitude" label="Longitude" width="40">
                {{ props.row.longitude }}
            </b-table-column>
			
			<b-table-column field="date" label="Date">
                {{ props.row.date }}
            </b-table-column>
			
			<!--<b-table-column field="name" label="Name point" centered=true>
                {{ props.row.name }}
            </b-table-column>-->

					
				</template>
				
				
				
				
				
				
				<template slot="detail" slot-scope="props">
            <article class="media">
                <figure class="media-left">
                    
                </figure>
               
                   
                        
                            <div class="buttons">

							<button  @click="addPhoto" class="button is-success">Add Foto</button>
							<button  @click="removePhoto" class="button is-danger">Remove Foto</button>
							<button  @click="addVideo" class="button is-success">Add Movie</button>
							<button  @click="removeVideo" class="button is-danger">Remove Movie</button>
							
					
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
			<input class="button is-link" v-on:click="save" type="button" value="Save date">
			
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
	components: { 'map-component': MapComponent },
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
			defaultOpenedDetails: [1],
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
			this.siteData.trip.waypoints.push(createWaypoint(
				point.lat, 
				point.lng,
				point.date
			));
		},
		getTrip(index) {
			var fun = function (response) {
				console.log(response);				
			};
			Vue.http.get('http://104.41.220.226:8080/api/trips').then(response => {
				var trip = JSON.parse(response.bodyText);
				console.log(trip);
			});
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
				a.download = cleanName + ".gps";
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
		addPhoto(id, photo) {
			if (id < this.siteData.trip.waypoints.length) {
				this.siteData.trip.waypoints[id].photo = photo;
				console.log("Photo added");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		removePhoto(id) {
			if (id < this.siteData.trip.waypoints.length) {
				this.siteData.trip.waypoints[id].photo = null;
				console.log("Photo removed");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		addVideo(id, video) {			
			if (id < this.siteData.trip.waypoints.length) {
				this.siteData.trip.waypoints[id].video = video;
				console.log("Video added");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		removeVideo(id) {
			if (id < this.siteData.trip.waypoints.length) {
				this.siteData.trip.waypoints[id].video = null;
				console.log("Video removed");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
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
		this.getTrip(1);
		this.siteData.trip = createTrip("", "", null, null, []);
		/*this.setDummyTrip();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();*/
		
		this.readGPSText(
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
		/*
			`<gpx>
				<metadata>
					<name>Wycieczka w Warszawie</name>
					<desc>Widzieliśmy nawet pałac kultury</desc>
				</metadata>
				<trk>
					<trkseg>
						<trkpt lat=-25.363 lon=131.044>
							<ele>0.0</ele>
							<time>Tue Jun 05 2018 18:04:57 GMT+0200</time>
						</trkpt>
					</trkseg>
				</trk>
			</gpx>`*/
		);
		
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
