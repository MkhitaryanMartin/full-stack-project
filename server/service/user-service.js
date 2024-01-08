const UserModel = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service.js");
const tokenService = require("./token-service.js");
const UserDto = require("../dtos/user-dto.js");
const ApiError = require("../exceptions/api-error.js");
const tokenModels = require("../models/token-models.js");
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

class UserService{

    async registration(email, password, phone, lastName, firstName, photo) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
          throw new Error(`${email} email уже зарегистрирован`);
        }
      
        let photoUrl = null;
      
        if (photo) {
            console.log(photo)
          const fileData = photo.buffer;
          const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'photos'
          });
      
          const uploadStream = bucket.openUploadStream(photo.originalname);
          uploadStream.end(fileData);
      
          photoUrl = `${process.env.API_URL}/api/auth/photos/${uploadStream.id}`;
        }
      
        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuidv4();
      
        const user = await UserModel.create({
          email,
          password: hashPassword,
          activationLink,
          phone,
          lastName,
          firstName,
          photo: photoUrl // Сохраняем ссылку на фото в документе пользователя
        });
      
        // Отправляем письмо с активационной ссылкой
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
      
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
      
        return { ...tokens, user: userDto };
      }
      
    

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest("Некоректная силка активации")
        }
        user.isActivated=true
       await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService()