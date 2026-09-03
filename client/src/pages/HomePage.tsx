import { useState } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
import { CitySearchForm } from '@/components/CitySearchForm/CitySearchForm'
import { useSearchPlaces } from '@/hooks/useSearchPlaces'
import { PlaceByCategory } from '@/components/PlacesByCategory/PlacesByCategory.tsx'

export function HomePage() {
	const [city, setCity] = useState('')
	const { data: places, isLoading, isError } = useSearchPlaces(city)

	return (
		<>
			<Navbar />
			<div className='mx-auto max-w-6xl px-4 py-10'>
				<div className='mb-8 text-center'>
					<h1 className='text-3xl font-bold tracking-tight'>Trailly</h1>
					<p className='mt-2 text-muted-foreground'>
						Введите город и получите места, разбитые по категориям
					</p>
				</div>

				<div className='mx-auto max-w-xl'>
					<CitySearchForm onSearch={setCity} />
				</div>

				<div className='mt-10'>
					{isLoading && (
						<p className='text-center text-muted-foreground'>Загрузка...</p>
					)}
					{isError && (
						<p className='text-center text-destructive'>
							Не удалось загрузить места. Попробуйте позже.
						</p>
					)}
					{places && <PlaceByCategory places={places} />}
				</div>
			</div>
		</>
	)
}
