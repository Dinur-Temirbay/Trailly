import { prisma } from '../lib/prisma.js'
import type { SearchPlacesInput } from '../schemas/places.schema.js'

const CACHE_TTL_DAYS = 30

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

async function fetchFromGooglePlaces(input: SearchPlacesInput) {
	// TODO: fetch к Google Places Text Search API
	console.log(`Fetching places for ${input.city} from Google Places...`)
	return [] as Array<{
		externalId: string
		name: string
		category: NonNullable<SearchPlacesInput['category']>
		city: string
		country: string
		latitude: number
		longitude: number
		description?: string
		photoUrl?: string
		rating?: number
		address?: string
		priceLevel?: number
	}>
}
