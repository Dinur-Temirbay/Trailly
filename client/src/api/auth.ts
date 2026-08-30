import { API } from './client'
import type { IUser } from '@/types'

interface AuthResponse {
	token: string
	user: IUser
}

export async function login(email: string, password: string) {
	const { data } = await API.post<AuthResponse>('/auth/login', {
		email,
		password,
	})
	return data
}

export async function register(email: string, password: string, name?: string) {
	const { data } = await API.post<AuthResponse>('/auth/register', {
		email,
		password,
		name,
	})
	return data
}
