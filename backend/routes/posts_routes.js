import {Router} from 'express'
import {getPosts, createPost, deletePost,updatePost, getPost} from '../controllers/post_controllers.js'
const router = Router()

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', updatePost)
router.get('/posts/:id', getPost)
export default router