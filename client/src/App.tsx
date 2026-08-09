import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from '@/pages/RegisterPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { useAuth } from '@/hooks/useAuth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuth } = useAuth()
	if (!isAuth) return <Navigate to='/login' />
	return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuth } = useAuth()
	if (isAuth) return <Navigate to='/' />
	return <>{children}</>
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/login'
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
