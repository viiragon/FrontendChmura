<template>
	<section class="section trips">
		<h1 class="title">Trips</h1>
		<b-table
			:data="data"
			:columns="columns"
			focusable
			@dblclick="rowClickedHandler">
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
	export default {
		name: 'TripListView',
		data() {
			const data = [
				{ 'id': 1, 'name': 'Okolice Warszawy', 'description': 'Blablabla', 'start': "2017-08-22 06:11:00.000Z", 'end': "2017-09-22 06:11:00.000Z"},
				{ 'id': 2, 'name': 'Okolice Warszawy', 'description': 'Blablabla', 'start': "2017-08-22 06:11:00.000Z", 'end': "2017-09-22 06:11:00.000Z" },
				{ 'id': 3, 'name': 'Okolice Warszawy', 'description': 'Blablabla', 'start': "2017-08-22 06:11:00.000Z", 'end': "2017-09-22 06:11:00.000Z" }
			]
			return {
				data,
				selected: data[0],
				columns: [
					{
						field: 'id',
						label: 'ID',
						width: '40',
						numeric: true,
						centered: true
					},
					{
						field: 'name',
						label: 'Name',
						width: '200',
						centered: true
					},
					{
						field: 'description',
						label: 'Description',
						width: '300',
						centered: true
					},
					{
						field: 'start',
						label: 'Start',
						width: '250',
						centered: true
					},
					{
						field: 'end',
						label: 'End',
						width: '250',
						centered: true
					}
				]
			}
		},
		methods: {
			rowClickedHandler(row){
				window.location = '/#/trip/' + row.id;
			}
		}
	}

</script>
	<style scoped>
	#new-trip-div{
		text-align: center;
	}
</style>
