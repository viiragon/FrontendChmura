import axios from 'axios';

//http://104.41.220.226:8080
var mainUrl = "http://104.41.220.226:8080/api/";

function getConfig() { 
	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
			// 'Authorization': 'Basic YWRtaW46MTIzNA==',
			'Accept': 'application/json',
			//'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			// 'Access-Control-Allow-Headers': 'Authorization',
			//"Content-Type": "application/json; charset=utf-8",
		},
		auth: {
			username: localStorage.getItem('user') || '',
			password: localStorage.getItem('password') || ''
		}
	};
}

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
        .get(mainUrl + url, getConfig())
        .then(data => data.data);
	},
	delete: function(url) {
		return axios
		.delete(mainUrl + url, getConfig())
		.then(data => data.data);
	},
	post: function(url, data) {
		return axios
        .post(mainUrl + url, data, getConfig())
        .then(data => data.data);
	},
	put: function(url, data) {
		return axios
		.put(mainUrl + url, data, getConfig())
		.then(data => data.data);
	},
}
