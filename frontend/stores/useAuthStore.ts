import {defineStore} from "pinia"

type User = {
	id: Number
	name: string
	email: string
}

type Credentials = {
	email: string
	password: string
}

type RegisterData = {
	name: string
	email: string
	password: string
}

export const useAuthStore = defineStore("auth", () => {
	const user = ref<User | null>(null)

	const isLoggedIn = computed(() => !!user.value)

	const fetchUser = async () => {
		const {data} = await useApiFetch("/api/user")

		user.value = data.value as User
	}

	const login = async (credentials: Credentials) => {
		await useApiFetch("/sanctum/csrf-cookie")

		const login = await useApiFetch("/login", {
			method: "POST",
			body: credentials,
		})

		await fetchUser()

		return login
	}

	const register = async (data: RegisterData) => {
		await useApiFetch("/register")

		const register = await useApiFetch("/login", {
			method: "POST",
			body: data,
		})

		await fetchUser()

		return register
	}

	const logout = async () => {
		await useApiFetch("/logout", {
			method: "POST",
		})

		user.value = null

		navigateTo("/login")
	}

	return {login, logout, user, isLoggedIn, fetchUser, register}
})
