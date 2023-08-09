const Comment = require("../models/comment");

async function getComment(videoId) {
  const data = await Comment.find({
    videoId: videoId,
  }).exec();
  return data;
}

async function pushComment(username, comment, videoId) {
  const newComment = await Comment.create({
    username: username,
    comment: comment,
    videoId: videoId,
  });

  return newComment;
}

module.exports = { getComment, pushComment };
