const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
   id: Number,
    name: String,
    image: String,
    creationAt: Date,
    updatedAt: Date
});

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;
