const express = require('express');
const app = express();
const port = 4000;

const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');
const connect = require('./schemas/index.js');
connect();

// 나머지 불러오기
app.use(express.json());

// 연결
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
