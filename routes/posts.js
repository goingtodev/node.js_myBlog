const express = require('express');

const router = express.Router();

// 게시글 작성 API
const board = require('../schemas/posts.js');
router.post('/', async (req, res) => {
  if (
    req.body == null ||
    req.params == null ||
    Object.keys(req.body).length === 0
  ) {
    return res
      .status(400)
      .json({ message: '데이터 형식이 올바르지 않습니다.' });
  }

  const { user, password, title, content } = req.body;

  const createPost = await board.create({
    user,
    password,
    title,
    content,
  });
  res.status(200).json({
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
  const selectDetail = await board.findById(_postId);

  if (req.params._postId.length < 24) {
    return res
      .status(400)
      .json({ message: '데이터 형식이 올바르지 않습니다.' });
  }
  const detailData = {
    postId: selectDetail._id,
    user: selectDetail.user,
    title: selectDetail.title,
    content: selectDetail.content,
    createdAt: selectDetail.createdAt,
  };
  res.status(400).json({ data: [detailData] });
});

// 게시글 수정
router.put('/:_postId', async (req, res) => {
  const { password, title, content } = req.body;
  await board.findOneAndUpdate(
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
  const existPost = await board.findById(_postId);
  if (
    req.body == null ||
    req.params == null ||
    Object.keys(req.body).length === 0 ||
    Object.keys(req.params).length === 0
  ) {
    res.status(400).send({ message: '데이터 형식이 올바르지 않습니다.' });
  } else if (existPost !== password) {
    res.status(404).send({ message: '게시글 조회에 실패하였습니다.' });
  }

  if (existPost) {
    await board.deleteOne({ _id: _postId });
    res.json({ message: '게시글을 삭제하였습니다.' });
  }
});

module.exports = router;
