import express from 'express'
import { signin, signup, addToWatchList, getWatchList } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.patch('/add', auth, addToWatchList)
router.get('/getWatchList/:id', auth, getWatchList) 

export default router 