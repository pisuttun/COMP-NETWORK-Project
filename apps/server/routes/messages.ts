import express from 'express'
import { handleGetAllMessage } from '../controllers/messages'
const router = express.Router()

router.route('/').get((req, res) => {
  console.log('get all chat data')
  //   res.status(200).json({ message: 'get all chat data' })
  console.log('in router req.body : ', req.body)
  handleGetAllMessage(req, res)
})

export default router
