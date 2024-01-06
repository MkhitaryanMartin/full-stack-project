const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
  author: {
    profile: {
      name: {
        type: String,
        required: true,
      },
      photo:{type: String}
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Ссылка на модель пользователя
      required: true,
    },
  },
  parent: {
    _id: {
      type: String,
      required: true,
    },
    _type: {
      type: String,
      enum: ['article', 'comment'], // Возможные типы родителей: статья или комментарий
      required: true,
    },
    text: {type: String},
    name: {type: String},
    _article:{type: String},
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
