import type { ReactNode } from 'react'

interface AuthLayoutProps {
	children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className='grid min-h-screen lg:grid-cols-2'>
			<div className='hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex'>
				<div className='text-xl font-bold'>Trailly</div>

				<div>
					<h1 className='text-4xl font-bold tracking-tight'>Trailly</h1>
					<p className='mt-4 max-w-md text-primary-foreground/80'>
						Введи город — получи места для посещения: кафе, музеи, парки и
						многое другое, аккуратно разложенное по категориям.
					</p>
				</div>

				<div className='text-sm text-primary-foreground/60'>
					© {new Date().getFullYear()} Trailly
				</div>
			</div>

			<div className='flex items-center justify-center px-4 py-10'>
				<div className='w-full max-w-sm'>{children}</div>
			</div>
		</div>
	)
}
