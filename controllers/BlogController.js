const { json } = require('express');
const { body, validationResult } = require('express-validator');
const BlogService = require('../services/BlogService');
const BlogModel = require('../models/Blog');


// Validation middleware
const validateCreateBlog = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 2 }).withMessage('Title must be at least 2 characters long')
        .matches(/^T/i).withMessage('Title must start with the letter "T"')
        .custom(async (title) => {
            const existingBlog = await BlogModel.findOne({ title });
            if (existingBlog) {
                throw new Error('Title must be unique');
            }
        }),
    body('body')
        .notEmpty().withMessage('Body is required')
        .isString().withMessage('Body must be a string'),
];

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogService.getAllBlogs();

        res.json({ data: blogs, status: "success" });
    } catch (err) {
        res.status(500, json({ error: err.message }));
    }
}

const createBlog = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }

        // Destructure title and body from request body
        const { title, body } = req.body;

        // Create blog
        const blog = await BlogService.createBlog({ title, body });

        // Send response
        res.json({
            status: true,
            data: blog
        });

    } catch (err) {
        res.status(500, json({ error: err.message }));
    }
}

const blogDetails = async (req, res) => {
    // this is better readability and work in latest version 
    try {
        const blog = await BlogService.getBlogById(req.params.id);
        res.json({
            status: true,
            data: blog
        });
    } catch (err) {
        res.status(500, json({ error: err.message }));
    }

    // this is old method work with the old version of javascript
    // BlogService.getBlogById(req.params.id)
    //     .then(blog => {
    //         res.json({
    //             status: true,
    //             data: blog
    //         });
    //     }).catch(err => {
    //         res.status(500, json({
    //             status: false,
    //             error: err.message
    //         }));
    //     });
}

const blogUpdate = async (req, res) => {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Get the first error message
        const firstError = errors.array()[0].msg;
        return res.status(400).json({
            status: false,
            error: firstError
        });
    }

    const blog = await BlogService.updateBlog(req.params.id, req.body);

    res.json({
        status: true,
        data: blog
    });
}

const blogDelete = async (req, res) => {
    await BlogService.deleteBlog(req.params.id);

    res.json({
        status: false,
        message: `blog deleted successfully ${req.params.id}`
    });
}



module.exports = { getAllBlogs, createBlog, blogDetails, blogUpdate, blogDelete, validateCreateBlog };