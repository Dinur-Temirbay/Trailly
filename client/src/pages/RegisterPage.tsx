import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { register as registerRequest } from '@/api/auth'
import { useState } from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'

const registerSchema = z.object({
	name: z.string().min(1, 'Введите имя'),
	email: z.email('Введите корректный email'),
	password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterPage() {
	const { login } = useAuth()
	const navigate = useNavigate()
	const [serverError, setServerError] = useState<string | null>(null)

	const {
		register: registerField,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

	const onSubmit = async (values: RegisterFormData) => {
		setServerError(null)
		try {
			const { user, token } = await registerRequest(
				values.email,
				values.password,
				values.name,
			)
			login(user, token)
			navigate('/')
		} catch (error: any) {
			setServerError(error.response?.data?.message || 'Ошибка регистрации')
		}
	}

	return (
		<AuthLayout>
			<h2 className='text-2xl font-semibold'>Регистрация</h2>
			<p className='mt-1 text-sm text-muted-foreground'>
				Создай аккаунт, чтобы сохранять места
			</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-6 flex flex-col gap-3'
			>
				<div>
					<Input placeholder='Имя' {...registerField('name')} />
					{errors.name && (
						<p className='mt-1 text-sm text-destructive'>
							{errors.name.message}
						</p>
					)}
				</div>
				<div>
					<Input placeholder='Email' type='email' {...registerField('email')} />
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
						{...registerField('password')}
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
					{isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
				</Button>
			</form>

			<p className='mt-4 text-center text-sm text-muted-foreground'>
				Уже есть аккаунт?{' '}
				<Link to='/login' className='underline'>
					Войти
				</Link>
			</p>
		</AuthLayout>
	)
}
