import http from '../components/HttpService';

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

const state = { logged: localStorage.getItem('logged') || false, status: '', hasLoadedOnce: false }

const getters = {
	isAuthenticated: state => state.logged,
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
			localStorage.setItem('user', user.username);
			localStorage.setItem('password', user.password);
			http.get("trips").then((response) => {
				console.log(response);
				localStorage.setItem('logged', true);
				commit(AUTH_SUCCESS);
				resolve();
			}).catch((error) => {
				localStorage.removeItem('user')
				localStorage.removeItem('password')
				localStorage.removeItem('logged')
				reject(error.response.status);				
			});
		})
	},
	[AUTH_LOGOUT]: ({commit, dispatch}) => {
		return new Promise((resolve, reject) => {
			commit(AUTH_LOGOUT)
			localStorage.removeItem('user')
			localStorage.removeItem('password')
			localStorage.removeItem('logged')
			resolve()
		})
	}
}

const mutations = {
	[AUTH_REQUEST]: (state) => {
		state.status = 'loading'
	},
	[AUTH_SUCCESS]: (state) => {
		state.status = 'success'
		state.logged = true
		state.hasLoadedOnce = true
	},
	[AUTH_ERROR]: (state) => {
		state.status = 'error'
		state.logged = false
		state.hasLoadedOnce = true
	},
	[AUTH_LOGOUT]: (state) => {
		state.logged = false
	}
}

export default {	
	state,
	getters,
	actions,
	mutations
};

