import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { login as loginRequest } from '@/api/auth'
import { useState } from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const loginSchema = z.object({
	email: z.email('Некорректный email'),
	password: z.string().min(1, 'Введите пароль'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
	const { login } = useAuth()
	const navigate = useNavigate()
	const [serverError, setServerError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

	const onSubmit = async (values: LoginFormData) => {
		setServerError(null)
		try {
			const { user, token } = await loginRequest(values.email, values.password)
			login(user, token)
			navigate('/')
		} catch (error: any) {
			setServerError(
				error.response?.data?.message || 'Неверный email или пароль',
			)
		}
	}

	return (
		<AuthLayout>
			<h2 className='text-2xl font-semibold'>Вход</h2>
			<p className='mt-1 text-sm text-muted-foreground'>
				Рады видеть тебя снова
			</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-6 flex flex-col gap-3'
			>
				<div>
					<Input placeholder='Email' type='email' {...register('email')} />
					{errors.email && (
						<p className='mt-1 text-sm text-destructive'>
							{errors.email.message}
						</p>
					)}
				</div>
				<div>
					<Input
						placeholder='Пароль'
						type='password'
						{...register('password')}
					/>
					{errors.password && (
						<p className='mt-1 text-sm text-destructive'>
							{errors.password.message}
						</p>
					)}
				</div>
				{serverError && (
					<p className='text-sm text-destructive'>{serverError}</p>
				)}
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Входим...' : 'Войти'}
				</Button>
			</form>

			<p className='mt-4 text-center text-sm text-muted-foreground'>
				Нет аккаунта?{' '}
				<Link to='/register' className='underline'>
					Зарегистрироваться
				</Link>
			</p>
		</AuthLayout>
	)
}
