const express = require('express');
const router = express.Router();
const board = require('../schemas/posts.js');

// 게시글 작성 API
router.post('/', async (req, res) => {
  const { user, password, title, content } = req.body;

  await board.create({
    user,
    password,
    title,
    content,
  });
  res.status(200).json({ message: '게시글을 생성하였습니다.' });
});

// 게시글 조회 API
router.get('/', async (req, res) => {
  // 작성자 날짜 기준 -> sort -1은 내림차순 정렬
  const select = await board.find({}).sort({ createdAt: -1 });

  const arr = [];

  for (let i = 0; i < select.length; i++) {
    const temp = {
      postId: select[i]._id,
      user: select[i].user,
      content: select[i].content,
      createdAt: select[i].createdAt,
    };
    arr.push(temp);
  }
  res.status(200).json({ data: arr });
});

// 게시글 상세 조회 API
router.get('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const selectDetail = await board.findById(_postId);

  const temp = {
    postId: selectDetail._id,
    user: selectDetail.user,
    title: selectDetail.title,
    content: selectDetail.content,
    createdAt: selectDetail.createdAt,
  };
  res.status(400).json({ data: temp });
});

// 게시글 수정
router.put('/:_postId', async (req, res) => {
  const { password, title, content } = req.body;
  await board.findByIdAndUpdate(
    req.params._postId,
    {
      password: password,
      title: title,
      content: content,
    },
    {
      new: true,
    }
  );
  res.json({ message: '게시글을 수정하였습니다.' });
});

// 게시글 삭제
router.delete('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;
  const postdelete = await board.findOne({ _id: _postId });
  if (postdelete.password === password) {
    await board.deleteOne({ _id: _postId });
    res.json({ message: '게시글을 삭제하였습니다.' });
  }
});

module.exports = router;
