import { z } from 'zod'

export const savePlaceSchema = z.object({
	placeId: z.string().min(1),
	notes: z.string().optional(),
})

export type SavePlaceInput = z.infer<typeof savePlaceSchema>
