<template>
	<div style="width:70vw; margin-left:15vw">
		<div v-if="siteData.loaded">
			<h2>{{ siteData.trip.name }}</h2>
			<h2>{{ siteData.trip.description }}</h2>
			<b-table
				:data="siteData.trip.waypoints"
				:columns="columns"
				:selected.sync="siteData.trip.waypoints[selected]"
				focusable>
			</b-table>
		</div>
		<div v-else>
			LOADING...
		</div>
	</div> 
</template>

<script>
import Vue from 'vue'

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
			this.siteData.trip = {
				name: "Okolice Warszawy",
				description: "Blablabla",
				start: new Date("2017-08-22T06:11:00.000Z"),
				end: new Date("2017-09-22T06:11:00.000Z"),
				waypoints: []
			};
		},
		getRandomWayPoint() {
			this.siteData.trip.waypoints.push({
				"latitude": (Math.random() - 0.5) * 90,
				"longitude": (Math.random() - 0.5) * 180,
				"date": new Date("2017-09-22T06:11:00.000Z"),
				"photos": [],
				"videos": []
			});
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
					wayPoints.push({
						"latitude": parseFloat(point.attributes.lat.nodeValue),
						"longitude": parseFloat(point.attributes.lon.nodeValue),
						"date": new Date(findInXML(point.children, "time").innerHTML),
						"photos": [],
						"videos": []
					});
				}
				var trip = {
					name: name,
					description: "Blablabla",
					start: Date.parse("2017-08-22T06:11:00.000Z"),
					end: Date.parse("2017-09-22T06:11:00.000Z"),
					waypoints: wayPoints
				};
				return trip;
			} catch(err) {
				console.log(err);
				return null;
			}
		}
	},
	beforeMount(){
		this.getTrip(this.$route.params.id);
		/*this.setDummyTrip();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();*/
		var trip = this.readGPSFile(	
			"<gpx>" +
			"	<metadata>" +
			"		<link href=\"http://www.garmin.com\">" +
			"			<text>Garmin International</text>" +
			"		</link>" +
			"		<time>2009-10-17T22:58:43Z</time>" +
			"	</metadata>" +
			"	<trk>" +
			"		<name>Example GPX Document</name>" +
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
