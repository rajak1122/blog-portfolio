const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, image, description, content } = req.body;
    const newBlog = await Blog.create({
      title,
      image,
      description,
      content,
    });
    res.status(201).json({
      message: "Blog saved sucessfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save blog",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
});

module.exports = router;
