<script>
	export let form;
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '@svelteuidev/core';
	let errI = 0;
	//when form error, hide after 3 seconds
	$: if (form?.error) {
		errI++;
		let errT = errI;
		form.loading = false;
		setTimeout(() => {
			if (errT != errI) return;
			form.error = null;
		}, 3000);
	}

	$: if (form?.redirect) goto(form.redirect);
</script>

<div class="min-w-screen min-h-screen flex items-center justify-center bg">
	<form
		method="POST"
		action="?/login"
		class="space-y-4 flex flex-col items-center bg-white rounded-md p-10"
		use:enhance
		on:submit={() => (form.loading = true)}
	>
		<h1 class="text-2xl font-bold">Admin Login</h1>
		<label class="block">
			<input type="text" name="username" required placeholder="Username" />
		</label>
		<label class="block">
			<input type="password" name="password" required placeholder="Password" />
		</label>
		<Button>Login</Button>
		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}
	</form>
</div>

<style>
	.bg {
		background-image: url('https://source.unsplash.com/1920x1080/?camera');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #f6f6f6;
	}
</style>
