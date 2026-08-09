export type Category =
	| 'CAFE'
	| 'RESTAURANT'
	| 'MUSEUM'
	| 'PARK'
	| 'NIGHTLIFE'
	| 'SHOPPING'
	| 'LANDMARK'
	| 'HOTEL'
	| 'OTHER'

export interface Place {
	id: string
	externalId: string
	name: string
	category: Category
	description: string | null
	photoUrl: string | null
	rating: number | null
	address: string | null
	city: string
	country: string
	latitude: number
	longitude: number
	priceLevel: number | null
}

export interface User {
	id: string
	email: string
	name: string | null
	avatarUrl: string | null
}

export interface SavedPlace {
	id: string
	placeId: string
	notes: string | null
	createdAt: string
	place: Place
}
