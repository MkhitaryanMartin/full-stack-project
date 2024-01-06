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

class UserService{

    async registration(email, password, phone, lastName, firstName, photo) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`${email} email is already registered`);
        }
    
        let photoUrl = ''; // По умолчанию устанавливаем пустую строку
    
        if (photo) {
            // Получаем расширение файла
            const fileExt = path.extname(photo.originalname);
            const fileName = uuidv4() + fileExt;
    
            // Путь для сохранения файла в папке images в корневой директории
            const uploadDir = path.join(__dirname, '../images/user');
            const filePath = path.join(uploadDir, fileName);
    
            // Проверяем существует ли путь, и создаем его, если не существует
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            // Сохраняем файл на сервере
            fs.copyFileSync(photo.path, filePath);
    
            // Сохраняем путь к файлу (URL) в базе данных (MongoDB)
            photoUrl = `${process.env.API_URL}/images/user/${fileName}`;
        }
    
        // Хешируем пароль и создаем активационную ссылку
        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuidv4();
    
        // Создаем пользователя в базе данных
        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink,
            phone,
            lastName,
            firstName,
            photo: photoUrl, // Сохраняем URL в поле photo
        });
    
        // Отправляем письмо с активационной ссылкой
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
    
        // Генерируем токены и сохраняем их
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
        // Удаляем временную папку, если она существует
        if (fs.existsSync(path.resolve("uploads"))) {
            fs.rmdirSync(path.resolve("uploads"), { recursive: true });
        }
    
        return {...tokens, user: userDto};
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