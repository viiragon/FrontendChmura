

import axios from 'axios';

var config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Authorization': 'Basic YWRtaW46MTIzNA==',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        // 'Access-Control-Allow-Headers': 'Authorization',
        // "Content-Type": "application/json",
    }/*,
    auth: {
        username: 'user',
        password: '1234'
    }*/
};

export function getTrips() {
  axios
    .get("http://104.41.220.226:8080/api/trips", config)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

/*
	url - skrócone
	responseFunction: function(response) {...}
	errorFunction: function(error) {...}
*/
export default {
	get: function(url, responseFunction, errorFunction) {
		axios
		.get("http://104.41.220.226:8080/api/" + url, config)
		.then(responseFunction)
		.catch(errorFunction);
	},
	delete: function(url, responseFunction, errorFunction) {
		axios
		.delete("http://104.41.220.226:8080/api/" + url, config)
		.then(responseFunction)
		.catch(errorFunction);
	},
	post: function(url, data, responseFunction, errorFunction) {
		axios
		.post("http://104.41.220.226:8080/api/" + url, data, config)
		.then(responseFunction)
		.catch(errorFunction);
	},
	put: function(url, data, responseFunction, errorFunction) {
		axios
		.put("http://104.41.220.226:8080/api/" + url, data, config)
		.then(responseFunction)
		.catch(errorFunction);
	},
}
