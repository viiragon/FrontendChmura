
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
    createTrip: function(name, description, startDate, endDate, waypoints) {
        return {
            name: name,
            description: description,
            start: startDate,
            end: endDate,
            waypoints: waypoints
        };
    }
}