import express from 'express'
import { handleGetAllMessage } from '../controllers/messages'
import { protectRESTRoute } from '../middleware/auth'
const router = express.Router()

router.route('/').get(protectRESTRoute, handleGetAllMessage)

export default router
