import { PlaceCard } from '@/components/PlaceCard/PlaceCard'
import { categoryLabels, categoryOrder } from '@/lib/categories'
import type { IPlace } from '@/types'

interface PlacesByCategoryProps {
	places: IPlace[]
}

export function PlacesByCategory({ places }: PlacesByCategoryProps) {
	const grouped = categoryOrder
		.map(category => ({
			category,
			items: places.filter(p => p.category === category),
		}))
		.filter(group => group.items.length > 0)

	if (grouped.length === 0) {
		return (
			<p className='mt-8 text-center text-muted-foreground'>
				Ничего не нашлось. Попробуйте другой город.
			</p>
		)
	}

	return (
		<div className='flex flex-col gap-8'>
			{grouped.map(({ category, items }) => (
				<section key={category}>
					<h2 className='mb-3 text-lg font-semibold'>
						{categoryLabels[category]}
					</h2>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{items.map(place => (
							<PlaceCard key={place.id} place={place} />
						))}
					</div>
				</section>
			))}
		</div>
	)
}
