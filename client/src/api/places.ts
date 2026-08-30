import { API } from '@/api/client'
import type { TCategory, IPlace } from '@/types'

export async function searchPlaces(city: string, category?: TCategory) {
	const { data } = await API.get<{ places: IPlace[] }>('/places', {
		params: { city, category },
	})
	return data.places
}
