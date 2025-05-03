const Post = require('../models/postSchema');
const { errorHandler } = require('../utils/errorHandler');

exports.getUserPosts = async (req, res, next) => {

    const userId = req.user?.id;

    if (!userId) {
        return next(errorHandler(401, "please authenticate"));
    }

    try {
        const userPosts = await Post.find({ author: userId });
        res.status(200).json({
            message: "posts fetched successfully",
            success: true,
            userPosts
        });
    } catch (error) {
        next(error);
    }
}

exports.getSinglePost = async (req, res, next) => {

    const userId = req.user?.id;
    const {id}=req.params;

    if (!userId) {
        return next(errorHandler(401, "please authenticate"));
    }

    try {
        const userPost = await Post.findById(id);
        res.status(200).json({
            message: "posts fetched successfully",
            success: true,
            userPost
        });
    } catch (error) {
        next(error);
    }
}

exports.addPost = async (req, res, next) => {

    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!title || !content) {
        return next(errorHandler(401, "enter all fields"));
    }

    try {
        const newPost = new Post({
            title, content, author: userId
        });
        await newPost.save();
        res.status(200).json({
            message: "post added successfully",
            success: true
        });
    } catch (error) {
        next(error)
    }
}

exports.updatePost = async (req, res, next) => {

    const userId = req.user?.id;
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title?.trim() && !content?.trim()) {
        return next(errorHandler(400, "Nothing to update. Provide title or content."));
    }

    try {

        const userPost = await Post.findById(id);

        if (!userPost) {
            return next(errorHandler(404, "Post not found"));
        }

        if (String(userPost.author) !== String(userId)) {
            return next(errorHandler(401, "Please authenticate"));
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...(title && { title: title }),
                    ...(content && { content: content })
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Post updated successfully",
            success: true,
            post: updatedPost
        });


    } catch (error) {
        next(error)
    }

}

exports.deletePost = async (req, res, next) => {

    const userId = req.user?.id;
    const { id } = req.params;

    try {

        const userPost = await Post.findById(id);

        if (!userPost) {
            return next(errorHandler(401, "post not found"));
        }

        const isMatched = String(userId) == String(userPost.author);

        if (!isMatched) {
            return next(errorHandler(401, "please authenticate"));
        }

        await userPost.deleteOne();

        res.status(200).json({
            message: "post deleted successfully",
            success: true,
            userPost: userPost?._id
        })

    } catch (error) {
        next(error)
    }

}