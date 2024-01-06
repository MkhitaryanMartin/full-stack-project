const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
  data: Buffer, // Данные изображения в формате Buffer
  contentType: String // Тип контента изображения
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  products: [{
    like: Boolean,
    id: Number,
    cart: Boolean
  }],
  photo: {type: String} // Поле для хранения изображения в виде объекта ImageSchema
});

module.exports = model('User', UserSchema);
