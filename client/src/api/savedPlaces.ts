import { API } from '@/api/client'
import type { ISavedPlace } from '@/types'

export async function getSavedPlaces() {
	const { data } = await API.get<{ savedPlaces: ISavedPlace[] }>(
		'/saved-places',
	)
	return data.savedPlaces
}

export async function savePlace(placeId: string) {
	const { data } = await API.post('/saved-places', { placeId })
	return data
}

export async function unsavePlace(placeId: string) {
	await API.delete(`/saved-places/${placeId}`)
}
