import { useQuery } from '@tanstack/react-query'
import { searchPlaces } from '@/api/places'
import type { TCategory } from '@/types'

export function useSearchPlaces(city: string, category?: TCategory) {
	return useQuery({
		queryKey: ['places', city, category],
		queryFn: () => searchPlaces(city, category),
		enabled: city.trim().length > 1,
	})
}
