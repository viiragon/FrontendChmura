import apiCall from './api';
import axios from 'axios';

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

const actions = {
	[AUTH_REQUEST]: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => {
			commit(AUTH_REQUEST)	
			var token = b64EncodeUnicode(user.username + ":" + user.password);
			console.log(token);
			//if (user.username == "user" && user.password == "1234") {
				axios.defaults.headers.common['Authorization'] = "Basic YWRtaW46MTIzNA=="
				localStorage.setItem('user-token', "YWRtaW46MTIzNA==")
				commit(AUTH_SUCCESS, "YWRtaW46MTIzNA==")
				resolve("YWRtaW46MTIzNA==")
			/*} else {
				commit(AUTH_ERROR, "")
				localStorage.removeItem('user-token')
				reject("")
			}*/
			/*apiCall({url: 'auth', data: user, method: 'POST'})
			.then(resp => {
				localStorage.setItem('user-token', resp.token)
				// Here set the header of your ajax library to the token value.
				// example with axios
				//axios.defaults.headers.common['Authorization'] = "Basic " + resp.token
				commit(AUTH_SUCCESS, resp)
				resolve(resp)
			}).catch(err => {
				commit(AUTH_ERROR, err)
				localStorage.removeItem('user-token')
				reject(err)
			})*/
		})
	},
	[AUTH_LOGOUT]: ({commit, dispatch}) => {
		return new Promise((resolve, reject) => {
			commit(AUTH_LOGOUT)
			localStorage.removeItem('user-token')
			resolve()
		})
	}
}

const mutations = {
	[AUTH_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[AUTH_SUCCESS]: (state, resp) => {
		state.status = 'success'
		state.token = resp
		state.hasLoadedOnce = true
	},
	[AUTH_ERROR]: (state) => {
		state.status = 'error'
		state.hasLoadedOnce = true
	},
	[AUTH_LOGOUT]: (state) => {
		state.token = ''
	}
}

export default {	
	state,
	getters,
	actions,
	mutations
};

