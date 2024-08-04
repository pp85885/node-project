const express = require('express');
const { getAllBlogs, createBlog, validateCreateBlog, blogDetails, blogUpdate, blogDelete } = require('../controllers/BlogController');

const router = express.Router();

router.route('/').get(getAllBlogs).post(validateCreateBlog, createBlog);
router.route('/:id').get(blogDetails).put(validateCreateBlog, blogUpdate).delete(blogDelete);

module.exports = router;