import { prisma } from '../lib/prisma.js'
import type { SearchPlacesInput } from '../schemas/places.schema.js'

const CACHE_TTL_DAYS = 30
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY!

export async function searchPlaces(input: SearchPlacesInput) {
	const cutoff = new Date()
	cutoff.setDate(cutoff.getDate() - CACHE_TTL_DAYS)

	const cached = await prisma.place.findMany({
		where: {
			city: { equals: input.city, mode: 'insensitive' },
			...(input.category ? { category: input.category } : {}),
			updatedAt: { gte: cutoff },
		},
	})

	if (cached.length > 0) {
		return cached
	}

	const fresh = await fetchFromGooglePlaces(input)

	const saved = await Promise.all(
		fresh.map(place =>
			prisma.place.upsert({
				where: { externalId: place.externalId },
				update: { ...place, updatedAt: new Date() },
				create: place,
			}),
		),
	)

	return saved
}

export async function getPlaceById(id: string) {
	return prisma.place.findUnique({ where: { id } })
}

const categoryQueryMap: Record<
	NonNullable<SearchPlacesInput['category']>,
	{ query: string; includedType?: string }
> = {
	CAFE: { query: 'кафе', includedType: 'cafe' },
	RESTAURANT: { query: 'рестораны', includedType: 'restaurant' },
	MUSEUM: { query: 'музеи', includedType: 'museum' },
	PARK: { query: 'парки', includedType: 'park' },
	NIGHTLIFE: { query: 'ночные клубы бары', includedType: 'night_club' },
	SHOPPING: {
		query: 'торговые центры магазины',
		includedType: 'shopping_mall',
	},
	LANDMARK: {
		query: 'достопримечательности',
		includedType: 'tourist_attraction',
	},
	HOTEL: { query: 'отели', includedType: 'lodging' },
	OTHER: { query: 'интересные места' },
}

interface GooglePlaceResult {
	id: string
	displayName?: { text: string }
	formattedAddress?: string
	location?: { latitude: number; longitude: number }
	rating?: number
	priceLevel?: string
	photos?: Array<{ name: string }>
}

interface GooglePlacesResponse {
	places?: GooglePlaceResult[]
}

async function fetchFromGooglePlaces(input: SearchPlacesInput) {
	const categories = input.category
		? [input.category]
		: (Object.keys(categoryQueryMap) as Array<
				NonNullable<SearchPlacesInput['category']>
			>)

	const results = await Promise.all(
		categories.map(category => fetchCategoryFromGoogle(input.city, category)),
	)

	return results.flat()
}

async function fetchCategoryFromGoogle(
	city: string,
	category: NonNullable<SearchPlacesInput['category']>,
) {
	const { query, includedType } = categoryQueryMap[category]

	const response = await fetch(
		'https://places.googleapis.com/v1/places:searchText',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
				'X-Goog-FieldMask': [
					'places.id',
					'places.displayName',
					'places.formattedAddress',
					'places.location',
					'places.rating',
					'places.priceLevel',
					'places.photos',
				].join(','),
			},
			body: JSON.stringify({
				textQuery: `${query} в ${city}`,
				languageCode: 'ru',
				maxResultCount: 10,
				...(includedType ? { includedType } : {}),
			}),
		},
	)

	if (!response.ok) {
		const errorBody = await response.text()
		console.error(`Google Places API error (${response.status}):`, errorBody)
		return []
	}

	const data = (await response.json()) as GooglePlacesResponse

	return (data.places ?? []).map(place => mapGooglePlace(place, category, city))
}

function mapGooglePlace(
	place: GooglePlaceResult,
	category: NonNullable<SearchPlacesInput['category']>,
	city: string,
) {
	return {
		externalId: place.id,
		name: place.displayName?.text ?? 'Без названия',
		category,
		city,
		country: '',
		latitude: place.location?.latitude ?? 0,
		longitude: place.location?.longitude ?? 0,
		address: place.formattedAddress,
		rating: place.rating,
		priceLevel: mapPriceLevel(place.priceLevel),
		photoUrl: place.photos?.[0]
			? buildPhotoUrl(place.photos[0].name)
			: undefined,
	}
}

function mapPriceLevel(level?: string): number | undefined {
	const map: Record<string, number> = {
		PRICE_LEVEL_FREE: 0,
		PRICE_LEVEL_INEXPENSIVE: 1,
		PRICE_LEVEL_MODERATE: 2,
		PRICE_LEVEL_EXPENSIVE: 3,
		PRICE_LEVEL_VERY_EXPENSIVE: 4,
	}
	return level ? map[level] : undefined
}

function buildPhotoUrl(photoName: string): string {
	return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${GOOGLE_PLACES_API_KEY}`
}
