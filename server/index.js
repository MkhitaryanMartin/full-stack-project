const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error-middleware.js");
const path = require("path");
// const products = require("./man")
// const Product = require("./models/product-models.js")

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser())
app.use("/api/auth", router.auth)
app.use("/api/shop", router.product)
app.use("/api/comment", router.comment)
app.use('/images/products', express.static(path.join(__dirname, 'images', 'products')))
app.use('/images/user', express.static(path.join(__dirname, 'images', 'user')));
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;


const start = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(PORT, ()=> console.log(`SERVER run in ${PORT} port`))
        // products.forEach((obj) => {
        //     // Создаем новый экземпляр модели Product на основе каждого объекта
        //     const product = new Product(obj);
          
        //     // Сохраняем объект в базу данных
        //     product.save()
        //       .then((result) => {
        //         console.log('Объект успешно сохранен в базе данных:', result);
        //       })
        //       .catch((error) => {
        //         console.error('Ошибка при сохранении объекта:', error);
        //       });
        //   });
        
    } catch (error) {
        console.log(error)
    }
}

start()