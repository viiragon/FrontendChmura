<template>
	<div style="width:70vw; margin-left:15vw">
		<a id="download" href="data" download="null.txt"></a>
		<div v-if="siteData.loaded">
			<h2>{{ siteData.trip.name }}</h2>
			<h2>{{ siteData.trip.description }}</h2>
			<b-table
				:data="siteData.trip.waypoints"
				:columns="columns"
				focusable>
			</b-table>
		</div>
		<div v-else>
			LOADING...
		</div>
	</div> 
</template>

<script>
				//:selected.sync="siteData.trip.waypoints[selected]"
				// v-on:click="saveGPSFile"
import Vue from 'vue'

var formatDate = function(value) {
	return value.getDate() + "." + (value.getMonth() + 1) + "." + (value.getYear() + 1900); 
}
	
export default {
	name: 'TripList',
	data() {
		const siteData = {
			trip: {},
			loaded: true,
			tmp: {}
		}

		return {
			siteData,
			selected: 1,
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
					formatter: formatDate
				}
			]
		}
	},
	methods: {
		getTrip(index) {
			Vue.http.get('https://jsonplaceholder.typicode.com/posts/' + index).then(response => {
				var trip = JSON.parse(response.bodyText);
				console.log(trip);
				this.siteData.tmp = trip;
				this.siteData.loaded = true;
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
				reader.onload = function (e) {
					this.readGPSText(e.target.result);
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
					output += "\t\t\t<trkpt lat=" + point.latitude + " lon=" + point.longitude + ">\n";
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
			if (id < this.siteDate.trip.waypoints.length) {
				this.siteDate.trip.waypoints[id].photo = photo;
				console.log("Photo added");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		removePhoto(id) {
			if (id < this.siteDate.trip.waypoints.length) {
				this.siteDate.trip.waypoints[id].photo = null;
				console.log("Photo removed");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		addVideo(id, video) {			
			if (id < this.siteDate.trip.waypoints.length) {
				this.siteDate.trip.waypoints[id].video = video;
				console.log("Video added");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		removeVideo(id) {
			if (id < this.siteDate.trip.waypoints.length) {
				this.siteDate.trip.waypoints[id].video = null;
				console.log("Video removed");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}, 
		createNewItem() {
			this.siteData.trip.waypoints.push(createWaypoint(0, 0, new Date()));
		},
		deleteItem(id) {					
			if (id < this.siteDate.trip.waypoints.length) {
				this.siteDate.trip.waypoints.splice(id, 1);;
				console.log("Waypoint id." + id + " removed");
			} else {
				console.error("ERROR! Waypoint id." + id + " does not exist!");
			}
		}
	},
	beforeMount(){
		/*this.setDummyTrip();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();
		this.setRandomWayPoint();*/
		
		this.readGPSText(	
			"<gpx>" +
			"	<metadata>" +
			"		<name>Wycieczka przez Chęciny</name>" +
			"		<desc>Zwiedziliśmy multum miejsc w okolicach Chęcin. Byliśmy nawet w zamku!</desc>" +
			"	</metadata>" +
			"	<trk>" +
			"		<trkseg>" +
			"			<trkpt lat=\"47.645645\" lon=\"-122.246553\">" +
			"				<ele>4.46</ele>" +
			"				<time>2009-10-17T18:37:26Z</time>" +
			"			</trkpt>" +
			"			<trkpt lat=\"47.644548\" lon=\"-122.754567\">" +
			"				<ele>4.94</ele>" +
			"				<time>2009-10-17T18:37:31Z</time>" +
			"			</trkpt>" +
			"			<trkpt lat=\"47.646554\" lon=\"-122.334262\">" +
			"				<ele>6.87</ele>" +
			"				<time>2009-10-17T18:37:34Z</time>" +
			"			</trkpt>" +
			"		</trkseg>" +
			"	</trk>" +
			"</gpx>"
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
h1, h2 {
  font-weight: normal;
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
