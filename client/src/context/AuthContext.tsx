import { createContext, useState } from 'react'
import type { User } from '../types'

interface AuthContextType {
	user: User | null
	isAuth: boolean
	login: (user: User, token: string) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const saved = localStorage.getItem('user')
		return saved ? JSON.parse(saved) : null
	})

	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem('token')
	})

	const login = (user: User, token: string) => {
		localStorage.setItem('token', token)
		localStorage.setItem('user', JSON.stringify(user))
		setUser(user)
		setToken(token)
	}

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		setUser(null)
		setToken(null)
	}

	return (
		<AuthContext value={{ user, isAuth: !!token, login, logout }}>
			{children}
		</AuthContext>
	)
}
