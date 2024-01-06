const ProductService = require("../service/product-service")

class ProductsController{

    async getAllProducts(req, res, next){
        try {
            const { skip, limit, sort, category, search } = req.query;
            const products = await ProductService.getAllProducts(skip, limit, sort, category, search)
            return res.json(products)
        } catch (error) {
            return res.status(500).json("Error")
        }
    }

    async getProduct(req, res, next){
        try {
            const {id}= req.body
            const product = await ProductService.getProduct(id)
            return res.json(product)
        } catch (error) {
            return res.status(500).json("Error")
        }
    }
    async getProductCategory(req, res, next){
        try {
            const productCategory = await ProductService.getProductCategory()
            return res.json(productCategory)
        } catch (error) {
            return res.status(500).json("Error")
        }
    }
    async likeProduct(req, res, next){
        try {
            const {id}= req.body
            const {refreshToken}= req.cookies
            const like = await ProductService.likeProduct(refreshToken, id)
            return res.status(200).json(like)
        } catch (error) {
            return res.status(500).json("Error")
        }
    }
    async updateCart(req, res, next){
        try {
            const {id}= req.body
            const {refreshToken}= req.cookies
            const cart = await ProductService.updateCart(refreshToken, id)
            return res.status(200).json(cart)
        } catch (error) {
            return res.status(500).json("Error")
        }
    }
}

module.exports = new ProductsController()