<template>
  <div style="width:70vw; margin-left:15vw">
	<div v-if="data.loaded">
		<h2>{{ data.trip.title }}</h2>
		<h2>{{ data.trip.body }}</h2>
		 <b-table
				:data="data.list.waypoints"
				:columns="columns"
				:selected.sync="data.list.waypoints[selected]"
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
export default {
	name: 'TripList',
	data() {
		const data = {
			list: {
				name: "Okolice Warszawy",
				description: "Blablabla",
				start: "2017-08-22T06:11:00.000Z",
				end: "2017-09-22T06:11:00.000Z",
				waypoints: []
			},
			loaded: false,
			trip: {}
		}

		return {
			data,
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
					centered: true
				}
			]
		}
	},
	methods: {
		getTrip(index) {
			Vue.http.get('https://jsonplaceholder.typicode.com/posts/' + index).then(response => {
				var trip = JSON.parse(response.bodyText);
				console.log(trip);
				this.data.trip = trip;
				this.data.loaded = true;
			});
		},
		getRandomWayPoint() {
			this.data.list.waypoints.push({
				"latitude": (Math.random() - 0.5) * 90,
				"longitude": (Math.random() - 0.5) * 180,
				"date": "2017-09-22T06:11:00.000Z",
				"photos": [],
				"videos": []
			});
		}
	},
	beforeMount(){
		this.getTrip(this.$route.params.id);
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
		this.getRandomWayPoint();
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
