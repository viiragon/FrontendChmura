<template>
	<section class="section">
		<form class="login" @submit.prevent="login">
			<h1 class="title">Trip App</h1>
			<h2 class="title">Sign in</h2>
			<b-field>
				<b-input required placeholder="User name" v-model="username"></b-input>
			</b-field>	
			<b-field>
				<b-input required placeholder="Password" v-model="password" type="password"></b-input>
			</b-field>
			<hr/>
			<input class="button is-link" type="submit" value="Login">
		</form>
	</section>
</template>

<script>  
	import {AUTH_REQUEST} from '../auth/actions'
	import auth from '../auth'
	
	export default {
		name: 'LoginView',
		data () {
			return {
				username: '',
				password: '',
			}
		},
		methods: {
			login: function () {
				const { username, password } = this
				auth.dispatch(AUTH_REQUEST, { username, password }).then(() => {
					this.$router.push('/');
				})
			}
		},
	}	
	
	console.log(this);
</script>

<style scoped>
h2 {
  font-weight: normal;
}
h1 {
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
