import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button/Button'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
	const { user, logout } = useAuth()

	return (
		<header className='border-b'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
				<Link to='/' className='text-lg font-bold'>
					Trailly
				</Link>

				<nav className='flex items-center gap-3'>
					{user && (
						<>
							<span className='text-sm text-muted-foreground'>
								{user.name || user.email}
							</span>
							<Button variant='outline' size='sm' onClick={logout}>
								Выйти
							</Button>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}
