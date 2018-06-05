import http from '../components/HttpService';
import axios from 'axios';

const mocks = {
  'auth': { 'POST': { token: 'This-is-a-mocked-token' } },
  //'user/me': { 'GET': { name: 'doggo', title: 'sir' } }
}

const apiCall = ({url, method, ...args}) => new Promise((resolve, reject) => {
	setTimeout(() => {
		try {	
			http.get("trips", function(response) {
				console.log(response);
				resolve()
			}, function(error) {
				reject(new Error(error));				
			})
			resolve(mocks[url][method || 'GET'])
			console.log(`Mocked '${url}' - ${method || 'GET'}`)
			console.log('response: ', mocks[url][method || 'GET'])
		} catch (err) {
			reject(new Error(err))
		}
	}, 1000)
})

export default apiCall