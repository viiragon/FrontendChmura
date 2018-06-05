
<template>
  <nav class="navbar is-info">
  <!-- <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div> -->

  <div id="navbarExampleTransparentExample" class="navbar-menu container">
    <div v-if="isAuthenticated" class="navbar-start">
	  <a class="navbar-item" href="/#/">
        Start
      </a>
	  <a class="navbar-item" href="/#/trips">
        Trips
      </a>
      <a class="navbar-item" href="/#/trip/1">
        Trip
      </a>
      <a class="navbar-item" href="/#/map">
        Map
      </a>
      <a class="navbar-item" @click="logout">
        Logout
      </a>
    </div>
    <div class="navbar-end">
      <a class="navbar-item" href="https://chmuryweb2018.azurewebsites.net/#/map">
        Nasza produkcja
      </a>
      <a class="navbar-item" href="https://buefy.github.io/#/">
        Buefy
      </a>
      <a class="navbar-item" href="https://bulma.io/">
        Bulma
      </a>
      <a class="navbar-item" href="https://vuejs.org/v2/api/">
        Vue
      </a>
    </div>
  </div>
</nav>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import { AUTH_LOGOUT } from '../auth/actions'
	
	export default {
		name: "Navbar",
		methods: {
			logout: function () {
				this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
			}
		},
		computed: {
			...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
			...mapState({
				authLoading: state => state.auth.status === 'loading',
				name: state => `${state.user.profile.name}`,
			})
		}
	};
</script>
<style>
.navbar {
  background: white;
}
</style>
