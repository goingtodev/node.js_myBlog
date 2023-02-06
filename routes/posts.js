const express = require('express');

const router = express.Router();

// 게시글 작성 API
const board = require('../schemas/post.js');
router.post('/', async (req, res) => {
  const { user, password, title, content } = req.body;

  const createPost = await board.create({
    user,
    password,
    title,
    content,
  });
  res.json({
    postReturn: createPost,
    message: '게시글을 생성하였습니다.',
  });
});

// 게시글 조회 API
router.get('/', async (req, res) => {
  const select = await board.find({});
  res.status(200).json(select);
});

// 게시글 상세 조회 API
router.get('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const person = await board.findById(_postId);
  const detailData = {
    postId: person._id,
    user: person.user,
    title: person.title,
    content: person.content,
    createdAt: person.createdAt,
  };
  res.status(200).json({ data: [detailData] });
});

// 게시글 수정
router.put('/:_postId', async (req, res, next) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;

  const existPost = await board.findOneAndUpdate(
    { _postId: req.params._id },
    {
      password: req.body.password,
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  );
  try {
    if (!existPost.length) {
      throw new Error('유효하지 않은 ID입니다');
    }
    if (password !== existPost.password) {
      throw new Error('비밀번호가 틀립니다.');
    }
    res.status(200).json({ message: '게시글을 수정하였습니다.' });
  } catch (error) {
    next(error);
  }
  // res.json(existPost);
});

// 게시글 삭제
router.delete('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  const existPost = await board.findById(_postId);
  if (existPost.password === password) {
    await board.deleteOne({ _id: _postId });
    res.json({ message: '게시글을 삭제하였습니다.' });
  }
});

module.exports = router;
