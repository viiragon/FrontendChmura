<template>
	<section class="section trips">
		<h1 class="title">Trips</h1>
		<b-table
			:data="trips"
			focusable
			@dblclick="rowClickedHandler">
			<template slot-scope="props">
				<b-table-column field="tripId" :visible="false">
					{{ props.row.tripId }}
				</b-table-column>

				<b-table-column field="name" label="Name" width="200" centered>
					{{ props.row.name }}
				</b-table-column>

				<b-table-column field="start" label="Start" width="250" centered>
					{{ new Date(props.row.start).toLocaleDateString()}}
				</b-table-column>

				<b-table-column field="end" label="End" width="250" centered>
					{{ new Date(props.row.end).toLocaleDateString()}}
				</b-table-column>
			</template>
		</b-table>
		</br>
		<div id="new-trip-div">
			<a class="button is-inverted is-focused" href="/#/trip/0">
			Create new trip
			</a>
		</div>
	</section>
</template>

<script>

	import http from "./HttpService"

	const trips = [];

	export default {
		name: 'TripListView',
		data() {
			 return {
			 trips
			}
		},
		methods: {
			rowClickedHandler(row){
				window.location = '/#/trip/' + row.tripId;
			}
		},
		mounted () {
			var vm = this;
			http.get("trips").then((response) => {
				vm.trips = response.data.content;
			}).catch((error) => {
				console.log("error: " + error);
			});
		}
	}

</script>

<style scoped>
	#new-trip-div{
		text-align: center;
	}
</style>