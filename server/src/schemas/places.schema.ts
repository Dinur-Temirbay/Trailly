import { z } from 'zod'

export const categoryEnum = z.enum([
	'CAFE',
	'RESTAURANT',
	'MUSEUM',
	'PARK',
	'NIGHTLIFE',
	'SHOPPING',
	'LANDMARK',
	'HOTEL',
	'OTHER',
])

export const searchPlacesSchema = z.object({
	city: z.string().min(2, 'City name is too short'),
	category: categoryEnum.optional(),
})

export type SearchPlacesInput = z.infer<typeof searchPlacesSchema>
