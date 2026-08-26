import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import {
	listSavedPlaces,
	createSavedPlace,
	deleteSavedPlace,
} from '../controllers/savedPlaces.controller.js'

const router = Router()

router.use(authMiddleware)

router.get('/', listSavedPlaces)
router.post('/', createSavedPlace)
router.delete('/:placeId', deleteSavedPlace)

export default router
