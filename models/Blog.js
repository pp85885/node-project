const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = schema({
    title: String,
    body: String,
    image: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);