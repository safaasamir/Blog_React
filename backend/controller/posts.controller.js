const Post = require("../models/posts.model");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const Create = async (req, res) => {
  try {
    const { originalname, path, mimetype } = req.file;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(mimetype)) {
      fs.unlinkSync(path);
      return res
        .status(400)
        .send("Please upload a valid image file (JPEG, PNG).");
    }

    const part = originalname.split(".");

    const data = part[part.length - 1];
    const newpath = path + "." + data;
    fs.renameSync(path, newpath);

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      const { title, description, content } = req.body;
      try {
        const newPost = new Post({
          title,
          description,
          image: newpath,
          content,
          user: info.id,
        });
        await newPost.save();
        return res.status(201).json({ message: " Data is created " + newPost });
      } catch (err) {
        return res.status(500).json({ message: "Something went wrong", err });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

const getAllPost = async (req, res) => {
  try {
    const allposts = await Post.find()
      .populate("user", ["username"])
      .sort({ createdAt: -1 });

    return res.status(200).json(allposts);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const getonePost = async (req, res) => {
  const { id } = req.params;
  const postById = await Post.findById(id).populate("user", ["username"]);
  return res.json(postById);
};

const EditonePost = async (req, res) => {
  let newpath = null;

  if (req.file) {
    const { originalname, path, mimetype } = req.file;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(mimetype)) {
      fs.unlinkSync(path);
      return res
        .status(400)
        .send("Please upload a valid image file (JPEG, PNG,jpg).");
    }

    const part = originalname.split(".");
    const data = part[part.length - 1];
    newpath = path + "." + data;
    fs.renameSync(path, newpath);
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const { id, title, description, content } = req.body;
    try {
      const postdoc = await Post.findById(id);
      if (!postdoc) {
        return res.status(404).json({ message: "Post not found" });
      }

      const isUser = JSON.stringify(postdoc.user) === JSON.stringify(info.id);
      if (!isUser) {
        return res.status(403).json({ message: "You are not the author" });
      }

      postdoc.title = title || postdoc.title;
      postdoc.description = description || postdoc.description;
      postdoc.content = content || postdoc.content;
      postdoc.image = newpath ? newpath : postdoc.image;

      await postdoc.save();

      return res
        .status(200)
        .json({ message: "Post updated successfully", postdoc });
    } catch (err) {
      // console.error(err);
      return res
        .status(500)
        .json({ message: "Error updating post", error: err.message });
    }
  });
};

const DeleteonePost = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
   
  try {
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      const postdoc = await Post.findById(id);
      if (!postdoc) {
        return res.status(404).json({ message: "Post not found" });
      }

      const isUser = JSON.stringify(postdoc.user) === JSON.stringify(info.id);
      if (!isUser) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      if (req.file) {
        const {  path } = req.file;
        fs.unlink(path.resolve(postdoc.image), (err) => {
          if (err) {
            console.error("Failed to delete file:", err);
          }
        });
      }

      await Post.deleteOne({ _id: id });

      return res.status(200).json({ message: "Post deleted successfully" });
    });
  } catch (err) {
    // console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
  }
};
module.exports = { Create, getAllPost, getonePost, EditonePost, DeleteonePost };
