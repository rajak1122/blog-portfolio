import { useState } from "react";
import { createBlog } from "../services/api";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createBlog(formData);

      console.log(data);
      alert("Blog created successfully!");

      setFormData({
        title: "",
        image: "",
        description: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Failed to create blog");
    }
  };
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Heading */}
      <div className="mb-7">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Admin
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
          Create a new blog
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Share your thoughts, ideas, and experiences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Image URL
          </label>

          <input
            id="image"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Short Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            rows="3"
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
          ></textarea>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Blog Content
          </label>

          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content..."
            rows="8"
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
