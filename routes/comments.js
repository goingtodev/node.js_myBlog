const express = require('express');
const router = express.Router();
const commentsBoard = require('../schemas/comments.js');

// 댓글 생성
router.post('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;

  const creatComments = await commentsBoard.create({
    user,
    password,
    content,
    postId: _postId,
  });
  res.json({
    commentsReturn: creatComments,
    message: '댓글을 생성하였습니다.',
  });
});

// 댓글 목록 조회

router.get('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const list = await commentsBoard.find({ postId: _postId });
  const arr = [];
  for (let i = 0; i < list.length; i++) {
    const temp = {
      commentId: list[i]._id,
      user: list[i].user,
      content: list[i].content,
      createdAt: list[i].createdAt,
    };
    arr.push(list);
  }
  res.json({ data: [arr] });
});

// 댓글 수정
router.put('/:_commentId', async (req, res) => {
  const { password, content } = req.body;
  await commentsBoard.findByIdAndUpdate(
    req.params._commentId,
    {
      password: password,
      content: content,
    },
    {
      new: true,
    } // 실시간으로 변하는지 확인하는 용도
  );
  res.json({ message: '댓글을 수정하였습니다.' });
});

// 댓글 삭제
router.delete('/:_commentId', async (req, res) => {
  const { _commentId } = req.params;
  const { password } = req.body;
  const existComments = await commentsBoard.findOne({ _id: _commentId });
  if (existComments.password === password) {
    await commentsBoard.deleteOne({ _id: _commentId });
    res.json({ message: '댓글을 삭제하였습니다.' });
  }
});

module.exports = router;
