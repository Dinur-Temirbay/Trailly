import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar/Navbar'
import { PlaceCard } from '@/components/PlaceCard/PlaceCard'
import { useSavedPlaces } from '@/hooks/useSavedPlaces'
import { getSavedPlaces } from '@/api/savedPlaces'

export function SavedPlacesPage() {
	const { data: savedPlaces, isLoading } = useQuery({
		queryKey: ['savedPlaces'],
		queryFn: getSavedPlaces,
	})
	const { savedPlaceIds, toggleSave } = useSavedPlaces()

	return (
		<>
			<Navbar />
			<div className='mx-auto max-w-6xl px-4 py-10'>
				<h1 className='mb-6 text-2xl font-bold'>Избранное</h1>

				{isLoading && <p className='text-muted-foreground'>Загрузка...</p>}

				{savedPlaces && savedPlaces.length === 0 && (
					<p className='text-muted-foreground'>
						Пока пусто. Найдите места на главной и сохраните понравившиеся.
					</p>
				)}

				{savedPlaces && savedPlaces.length > 0 && (
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{savedPlaces.map(saved => (
							<PlaceCard
								key={saved.id}
								place={saved.place}
								isSaved={savedPlaceIds.has(saved.place.id)}
								onToggleSave={() => toggleSave(saved.place.id)}
							/>
						))}
					</div>
				)}
			</div>
		</>
	)
}
