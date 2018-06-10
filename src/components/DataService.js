import GPXService from './GPXService.js';
import http from './HttpService.js';

var nextId = 0;

export default {
    createWaypoint: function(lat, lon, date) {
        return {
            id: nextId++,
            latitude: lat,
            longitude: lon,
            date: date,
            photo: null,
            video: null
        };
    },
    createTrip: function(id, name, description, startDate, endDate, waypoints) {
        return {
			id: id,
            name: name,
            description: description,
            start: startDate,
            end: endDate,
            waypoints: waypoints
        };
    },
    getTrip(index) {
        var self = this;
        return http.get("trips/" + index)
            .then((data) => {                
				var waypoints = [];
				for (var i = 0; i < data.waypoints.length; i++) {
					var point = self.createWaypoint(
						data.waypoints[i].latitude, 
						data.waypoints[i].longitude,
						new Date(data.waypoints[i].date));
					point.id = data.waypoints[i].waypointId;
					waypoints.push(point);
				}
				var trip = self.createTrip(
					index,
					data.name, 
					data.description, 
					new Date(data.start), 
					new Date(data.end), 
					waypoints
				);
				return trip;
			}).catch(error => {
				console.log(error);	
				
				/*GPXService.getMock()
					.then(trip => {
						return trip;
						console.log(trip);
					});*/
			});
    },
	sendWaypoint(tripId, point) {
		var self = this;
        return http.post("trips/" + tripId + "/waypoint", {			
            latitude: point.latitude,
            longitude: point.longitude,
            date: point.date,
            photo: point.photo,
            video: point.video
		})
            .then((data) => {  
				return data;
			}).catch(error => {
				console.log(error);	
			});
	},
	updatePartialTrip(trip) { //Podstawowe dane wycieczki bez punktów
		var self = this;
        http.get("trips/" + index)
			.then((data) => {
				
			}).catch(error => {
				console.log(error);
			});
	},
	updateWholeTrip(currentTrip, newTrip) { //Cała wycieczka wraz z punktami (usuwa wszystkie punkty i ponownie dodaje)
		
	}
}