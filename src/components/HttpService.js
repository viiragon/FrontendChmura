

import axios from 'axios';

var config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic YWRtaW46MTIzNA==',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Authorization',
        "Content-Type": "application/json",
    },
    auth: {
        username: 'user',
        password: '1234'
    }
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
