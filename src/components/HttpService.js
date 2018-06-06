

import axios from 'axios';

var config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic YWRtaW46MTIzNA==',
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
	get: function(url) {
		return axios
        .get("http://104.41.220.226:8080/api/" + url, config)
        .then(data => data.data);
	},
	delete: function(url, responseFunction, errorFunction) {
		return axios
		.delete("http://104.41.220.226:8080/api/" + url, config)
		.then(data => data.data);
	},
	post: function(url, data) {
		return axios
        .post("http://104.41.220.226:8080/api/" + url, data, config)
        .then(data => data.data);
	},
	put: function(url, data, responseFunction, errorFunction) {
		return axios
		.put("http://104.41.220.226:8080/api/" + url, data, config)
		.then(data => data.data);
	},
}
