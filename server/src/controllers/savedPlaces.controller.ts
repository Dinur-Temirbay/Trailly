import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { savePlaceSchema } from '../schemas/savedPlaces.schema.js'
import {
	getSavedPlaces,
	savePlace,
	unsavePlace,
} from '../services/savedPlaces.service.js'

export async function listSavedPlaces(
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const saved = await getSavedPlaces(req.userId!)
		res.json({ savedPlaces: saved })
	} catch (err) {
		next(err)
	}
}

export async function createSavedPlace(
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const parsed = savePlaceSchema.safeParse(req.body)
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.flatten() })
		}

		const saved = await savePlace(
			req.userId!,
			parsed.data.placeId,
			parsed.data.notes,
		)
		res.status(201).json({ savedPlace: saved })
	} catch (err) {
		next(err)
	}
}

export async function deleteSavedPlace(
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const placeId = req.params['placeId']
		if (!placeId) {
			return res.status(400).json({ error: 'Missing placeId' })
		}
		await unsavePlace(req.userId!, placeId)
		res.status(204).send()
	} catch (err) {
		next(err)
	}
}
