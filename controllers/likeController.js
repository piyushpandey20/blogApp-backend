const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.status(200).json({
      success: true,
      post: updatedPost,
      message: "Post has been liked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while liking the post",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    const deleteLike = await Like.findOneAndDelete({ post: post, _id: like });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deleteLike._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post: updatedPost,
      message: "Post has been unliked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while unliking the post",
    });
  }
};
