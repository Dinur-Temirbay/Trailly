import type { Request, Response, NextFunction } from 'express'
import { searchPlacesSchema } from '../schemas/places.schema.js'
import { searchPlaces, getPlaceById } from '../services/places.service.js'

export async function searchPlacesHandler(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const parsed = searchPlacesSchema.safeParse(req.query)
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.flatten() })
		}

		const places = await searchPlaces(parsed.data)
		res.json({ places })
	} catch (err) {
		next(err)
	}
}

export async function getPlaceHandler(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const id = req.params['id']
		if (!id) {
			return res.status(400).json({ error: 'Missing place id' })
		}
		const place = await getPlaceById(id)
		if (!place) {
			return res.status(404).json({ error: 'Place not found' })
		}
		res.json({ place })
	} catch (err) {
		next(err)
	}
}
