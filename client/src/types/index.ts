export type TCategory =
	| 'CAFE'
	| 'RESTAURANT'
	| 'MUSEUM'
	| 'PARK'
	| 'NIGHTLIFE'
	| 'SHOPPING'
	| 'LANDMARK'
	| 'HOTEL'
	| 'OTHER'

export interface IPlace {
	id: string
	externalId: string
	name: string
	category: TCategory
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

export interface IUser {
	id: string
	email: string
	name: string | null
	avatarUrl: string | null
}

export interface ISavedPlace {
	id: string
	placeId: string
	notes: string | null
	createdAt: string
	place: IPlace
}
