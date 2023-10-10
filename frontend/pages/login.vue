<template>
	<div class="form-structor">
		<div class="signup">
			<h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
			<div class="form-holder">
				<input type="text" v-model="registerData.name" class="input" placeholder="Name" autocomplete="off" />
				<input type="email" v-model="registerData.email" class="input" placeholder="Email" autocomplete="off" />
				<input type="password" v-model="registerData.password" class="input" placeholder="Password" autocomplete="off" />
			</div>
			<button class="submit-btn" @click="handleRegister">Sign up</button>
		</div>
		<div class="login slide-up">
			<div class="center">
				<h2 class="form-title" id="login"><span>or</span>Log in</h2>
				<div class="form-holder">
					<input type="email" v-model="formData.email" class="input" placeholder="Email" />
					<input type="password" v-model="formData.password" class="input" placeholder="Password" />
				</div>
				<button class="submit-btn" @click="handleLogin">Log in</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import {useAuthStore} from "../stores/useAuthStore"

const {push} = useRouter()

const formData = ref({
	email: "admin@example.com",
	password: "password",
})

const registerData = ref({
	name: "",
	email: "",
	password: "",
})

const auth = useAuthStore()

if (auth.isLoggedIn) {
	push("/profile")
}

const handleLogin = async () => {
	const data = await auth.login(formData)

	console.log("data", data)
}

const handleRegister = async () => {
	const data = await auth.register(registerData)

	console.log("data", data)

	if (data?.status === "success") push("/profile")
}

onMounted(() => {
	// TODO: just ignore this code. I just copy this for styling
	// Source: https://codepen.io/shayanea/pen/eVMMgO

	const loginBtn = document.getElementById("login")
	const signupBtn = document.getElementById("signup")

	loginBtn.addEventListener("click", (e) => {
		let parent = e.target.parentNode.parentNode
		Array.from(e.target.parentNode.parentNode.classList).find((element) => {
			if (element !== "slide-up") {
				parent.classList.add("slide-up")
			} else {
				signupBtn.parentNode.classList.add("slide-up")
				parent.classList.remove("slide-up")
			}
		})
	})

	signupBtn.addEventListener("click", (e) => {
		let parent = e.target.parentNode
		Array.from(e.target.parentNode.classList).find((element) => {
			if (element !== "slide-up") {
				parent.classList.add("slide-up")
			} else {
				loginBtn.parentNode.parentNode.classList.add("slide-up")
				parent.classList.remove("slide-up")
			}
		})
	})
})
</script>
