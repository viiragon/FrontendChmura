<template>
	<section class="section hello">
		<h1 class="title is-1 has-text-info">Hello!</h1>
		<h2 class="subtitle is-3 has-text-info">
			Welcome in your Trip App!
			</br>
			See your trips clicking the button below.
		</h2>
		<a class="button is-medium is-inverted is-focused is-info" href="/#/trips">
			Trips list
		</a>
	</section>
</template>

<script>
	export default {
		name: "StartView"
	};
</script>

<style>
	.hello {
	text-align: center;
	}
</style>