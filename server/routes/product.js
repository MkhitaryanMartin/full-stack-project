const Router = require("express");
const ProductsController = require("../controllers/products-controller.js");

const router = new Router();

router.post("/cart", ProductsController.updateCart);
router.post("/like", ProductsController.likeProduct);
router.get("/products/category", ProductsController.getProductCategory);
router.post("/product", ProductsController.getProduct);
router.get("/products", ProductsController.getAllProducts);

module.exports = router