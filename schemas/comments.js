const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'board',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('commentsBoard', commentsSchema);
