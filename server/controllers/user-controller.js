const userService = require("../service/user-service.js")
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

class UserController{

    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, phone, firstName, lastName} = req.body
           const {file}= req
            const userData = await userService.registration(email, password, phone, firstName, lastName, file)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,   secure: true, 
            httpOnly: true,
            sameSite: 'none' })
            return res.json(userData)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async getPhoto(req, res, next) {
        try {
            const photoId = req.params.id;
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
              bucketName: 'photos'
            });
        
            const downloadStream = bucket.openDownloadStream(new ObjectId(photoId)); // Обратите внимание на использование new ObjectId()
            downloadStream.pipe(res); // Отправляем фото как ответ на запрос
          } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка при получении фотографии');
          }
    }
}

module.exports = new UserController()