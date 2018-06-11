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
			tripId: id,
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
                data.tripId,
                data.name, 
                data.description, 
                new Date(data.start), 
                new Date(data.end), 
                waypoints
            );
            return trip;
        }).catch(error => {
            console.log(error);	
            
            GPXService.getMock()
                .then(trip => {
                    return trip;
                    console.log(trip);
                });
        });
    },
	postWaypoint(tripId, point) {
        return http.post("trips/" + tripId + "/waypoints", {			
            latitude: point.latitude,
            longitude: point.longitude,
            date: point.date,
            photo: point.photo,
            video: point.video
		});
	},
	deleteWaypoint(tripId, pointId) {
        return http.delete("trips/" + tripId + "/waypoints/" + pointId);
	},
	deleteAllWaypoints(tripId, trip) {
		return new Promise((resolve, reject) => {
			setTimeout(reject, 8000, {response: { status: 404 } });
			var countTab = [];
			var count = trip.waypoints.length;
			var checkFunction = function(done) {
				countTab.push(done);
				if (countTab.length == count && done) {
					var success = true;
					for (var i = 0; i < countTab.length; i++) {
						if (!countTab[i]) {
							success = false;
						}
					}
					if (success) {
						resolve();
					} else {
						reject({response: { status: 400 } });
					}
				}
			};
			if (count > 0) {
				for (var i = 0; i < count; i++) {
					this.deleteWaypoint(trip.tripId, trip.waypoints[i].id)
						.then((data) => {
							checkFunction(true);
						}).catch((error) => {
							checkFunction(false);
							reject(error);
						});
				}
			} else {
				resolve();
			}
		});
	},
	updatePartialTrip(tripId, trip) { //Podstawowe dane wycieczki bez punktów
		var self = this;
        return http.put("trips/" + tripId, {
			name: trip.name,
			description: trip.description,
			start: trip.start,
			end: trip.end,
			waypoints: []
		});
	},
	updateWholeTrip(currentTrip, newTrip) { //Cała wycieczka wraz z punktami (usuwa wszystkie punkty i ponownie dodaje)
		var self = this;
		return new Promise((resolve, reject) => {
			setTimeout(reject, 8000, {response: { status: 404 } });
			self.deleteAllWaypoints(currentTrip.tripId, currentTrip)
				.then(() => {					
					var countTab = [];
					var count = newTrip.waypoints.length;
					var checkFunction = function(done) {
						countTab.push(done);
						if (countTab.length == count && done) {
							var success = true;
							for (var i = 0; i < countTab.length; i++) {
								if (!countTab[i]) {
									success = false;
								}
							}
							if (success) {
								resolve(self.getTrip(currentTrip.tripId));									
							} else {
								reject({response: { status: 400 } })
							}
						}
					};
					self.updatePartialTrip(currentTrip.tripId, newTrip)
						.then((data) => {
							for (var i = 0; i < newTrip.waypoints.length; i++) {
								self.postWaypoint(currentTrip.tripId, newTrip.waypoints[i])
									.then((data) => {
										checkFunction(true);
									}).catch((error) => {
										checkFunction(false);
										reject(error);
									});
							}
						}).catch((error) => {
							reject(error);
						});
				}).catch((error) => {
					reject(error);
				});
		});
	}
}