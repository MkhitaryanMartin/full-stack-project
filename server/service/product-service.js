const axios = require("axios")
const ProductModel = require("../models/product-models");
const ProductCategoryModel = require("../models/product-category-models");
const userModel = require("../models/user-model");
const tokenModels = require("../models/token-models");

class ProductService{

    async getAllProducts(skip=0, limit=12, sort=1, category, search){
      let query = {};

      if (category !== "all") {
        query['category.id'] = category;
      }
      
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      const totalCount = await ProductModel.countDocuments(query);
      const products = await ProductModel.find(query)
      .sort({ price: parseInt(sort, 10) })
      .skip(skip)
      .limit(12)
      .exec();
      
        return {products, totalCount}
    }
    async getProduct(id){
        const products = await ProductModel.findOne({id})
        return products
    }
    async getProductCategory(){
        const products = await ProductCategoryModel.find()
        return products
    }
    async likeProduct(refreshToken, id) {
        const token = await tokenModels.findOne({ refreshToken });
        const user = await userModel.findById(token.user);
        const userProduct = user?.products?.find(product => product.id === id);
        const product = await ProductModel.findOne({id})
   
        if (!userProduct) {
          user.products.push({ id, cart: false, like: true });
          if (!isNaN(product.like)) {
            product.like = parseInt(product.like) + 1;
          }
        } else {
          if (!isNaN(product.like)) {
            product.like = userProduct.like ? parseInt(product.like) - 1 : parseInt(product.like) + 1;
            userProduct.like = !userProduct.like;
          }else{
            product.like = 1
          }
        }
        await user.save();
        await product.save()
        return user.products;
      }
    
      async updateCart(refreshToken, id) {
        const token = await tokenModels.findOne({ refreshToken });
        const user = await userModel.findById(token.user);
        const product = user?.products?.find(product => product.id === id);
        
        if (!product) {
          user.products.push({ id, cart: true, like: false });
         
        } else {
          product.cart = !product.cart;
        }
        await user.save();
        return user.products;
      }
    
}

module.exports = new ProductService()