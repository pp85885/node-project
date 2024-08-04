const BlogModel = require("../models/Blog");




getAllBlogs = async () => {
    return await BlogModel.find();
}

createBlog = async (blog) => {
    return await BlogModel.create(blog)
}

getBlogById = async (id) => {
    return await BlogModel.findById(id);
}

updateBlog = async (id, blog) => {
    return await BlogModel.findByIdAndUpdate(id, blog, { new: true });
}

deleteBlog = async (id) => {
    return await BlogModel.findByIdAndDelete(id);
};



// exporting the functions
module.exports = {
    getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog
};