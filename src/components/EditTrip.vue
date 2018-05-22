<template>
	<div style="width:70vw; margin-left:15vw">
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
		getRandomWayPoint() {
			this.siteData.trip.waypoints.push(createWaypoint(
				(Math.random() - 0.5) * 90, 
				(Math.random() - 0.5) * 180,
				new Date("2017-09-22T06:11:00.000Z"))
			);
		},
		readGPSFile(fileText) {	
			try {
				var xmlDoc;
				if (window.DOMParser) {
					var parser = new DOMParser();
					xmlDoc = parser.parseFromString(fileText, "text/xml");
				} else { // Internet Explorer
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = false;
					xmlDoc.loadXML(fileText);
				}
				var trk = findInXML(xmlDoc.getElementsByTagName("gpx")[0].children, "trk");
				var name = findInXML(trk.children, "name").innerHTML;
				var wayPoints = [];
				var trkpts = findAllInXML(findInXML(trk.children, "trkseg").children, "trkpt");
				var point;
				for (var i = 0; i < trkpts.length; i++) {
					point = trkpts[i];
					wayPoints.push(createWaypoint(
						parseFloat(point.attributes.lat.nodeValue), 
						parseFloat(point.attributes.lon.nodeValue),
						new Date(findInXML(point.children, "time").innerHTML))
					);
				}
				var trip = createTrip(
					name, 
					"Blablabla", 
					Date.parse("2017-08-22T06:11:00.000Z"), 
					Date.parse("2017-09-22T06:11:00.000Z"), 
					wayPoints
				);
				return trip;
			} catch(err) {
				console.log(err);
				return null;
			}
		},
		saveGPSFile() {
			
		}, 
		save() {
			
		}, 
		addPhoto(id, photo) {
			
		}, 
		addVideo(id, video) {
			
		}, 
		deleteItem(id) {
			
		}
	},
	beforeMount(){
		//this.getTrip(this.$route.params.id);
		var trip = this.readGPSFile(	
			"<gpx>" +
			"	<metadata>" +
			"		<link href=\"http://www.garmin.com\">" +
			"			<text>Garmin International</text>" +
			"		</link>" +
			"		<time>2009-10-17T22:58:43Z</time>" +
			"	</metadata>" +
			"	<trk>" +
			"		<name>HELLO!</name>" +
			"		<trkseg>" +
			"			<trkpt lat=\"47.644548\" lon=\"-122.326897\">" +
			"				<ele>4.46</ele>" +
			"				<time>2009-10-17T18:37:26Z</time>" +
			"			</trkpt>" +
			"			<trkpt lat=\"47.644548\" lon=\"-122.326897\">" +
			"				<ele>4.94</ele>" +
			"				<time>2009-10-17T18:37:31Z</time>" +
			"			</trkpt>" +
			"			<trkpt lat=\"47.644548\" lon=\"-122.326897\">" +
			"				<ele>6.87</ele>" +
			"				<time>2009-10-17T18:37:34Z</time>" +
			"			</trkpt>" +
			"		</trkseg>" +
			"	</trk>" +
			"</gpx>"
		);
		if (trip != null) {
			this.siteData.trip = trip;
		}
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
		"latitude": lat,
		"longitude": lon,
		"date": date,
		"photos": [],
		"videos": []
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
