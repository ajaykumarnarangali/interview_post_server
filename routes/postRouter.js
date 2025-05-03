const router=require('express').Router();
const postController=require('../controllers/postController');
const {verify}=require('../utils/verify');

router.get('/posts',verify,postController.getUserPosts);
router.get('/posts/:id',verify,postController.getSinglePost);
router.post('/posts',verify,postController.addPost);
router.put('/posts/:id',verify,postController.updatePost);
router.delete('/posts/:id',verify,postController.deletePost);

module.exports=router;