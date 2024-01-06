const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  images: [String],
  category: {
    id: Number,
    name: String,
    image: String,
    creationAt: Date,
    updatedAt: Date
  },
  like:{type:Number},
  id: {type:Number, unique:true},
  creationAt: Date,
  updatedAt: Date
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
