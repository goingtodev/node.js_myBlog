const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // 이거 쓰면 DB에 createdAt, updatedAt 자동 생성해줌.
);

module.exports = mongoose.model('board', postsSchema);
