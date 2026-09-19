const express = require("express");
const Blog = require("../models/Blog");

const authenticateUser = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");
const requireSuperAdmin = require("../middleware/superAdminMiddleware");

const router = express.Router();

router.post("/", authenticateUser, requireAdmin, async (req, res) => {
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

router.delete(
  "/:id",
  authenticateUser,
  requireAdmin,
  requireSuperAdmin,
  async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

      if (!deletedBlog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      res.status(200).json({
        message: "Blog deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete blog:", error);

      res.status(500).json({
        message: "Failed to delete blog",
        error: error.message,
      });
    }
  },
);

router.post("/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog liked successfully",
      likes: blog.likes,
    });
  } catch (error) {
    console.error("Failed to like blog:", error);

    res.status(500).json({
      message: "Failed to like blog",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error);

    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
});

router.put("/:id", authenticateUser, requireAdmin, async (req, res) => {
  try {
    const { title, image, description, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        image,
        description,
        content,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Failed to update blog:", error);

    res.status(500).json({
      message: "Failed to update blog",
      error: error.message,
    });
  }
});

module.exports = router;
