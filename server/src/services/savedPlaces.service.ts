import { prisma } from '../lib/prisma.js'

export async function getSavedPlaces(userId: string) {
	return prisma.savedPlace.findMany({
		where: { userId },
		include: { place: true },
		orderBy: { createdAt: 'desc' },
	})
}

export async function savePlace(
	userId: string,
	placeId: string,
	notes?: string,
) {
	return prisma.savedPlace.upsert({
		where: { userId_placeId: { userId, placeId } },
		update: { notes },
		create: { userId, placeId, notes },
	})
}

export async function unsavePlace(userId: string, placeId: string) {
	return prisma.savedPlace.delete({
		where: { userId_placeId: { userId, placeId } },
	})
}
