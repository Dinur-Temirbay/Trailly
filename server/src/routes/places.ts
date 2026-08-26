import { Router } from 'express'
import {
	searchPlacesHandler,
	getPlaceHandler,
} from '../controllers/places.controller'

const router = Router()

router.get('/', searchPlacesHandler)
router.get('/:id', getPlaceHandler)

export default router
