//引入mongoose 库
const mongoose = require('mongoose');

//定义笔记的数据库模式
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true
    },
    author: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

//通过模式定义Note模型
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
