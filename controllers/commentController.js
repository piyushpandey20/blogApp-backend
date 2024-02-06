const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const comment = new Comment({
      post,
      user,
      body,
    });
    const savedComment = await comment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comment: savedComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.status(200).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating comment",
    });
  }
};
