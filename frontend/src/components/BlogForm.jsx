import { useState } from "react";
import { createBlog } from "../services/api";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    content: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("creating");

    try {
      const data = await createBlog(formData);

      console.log(data);

      setStatus("success");

      setFormData({
        title: "",
        image: "",
        description: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);

      setStatus("error");
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
      {status !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
            {status === "creating" && (
              <>
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900"></div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Creating your blog...
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Please wait a moment.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ✓
                </div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Blog created successfully!
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Your blog has been published successfully.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-xl bg-gray-950 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Close
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  !
                </div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Failed to create blog
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Something went wrong. Please try again.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-xl bg-gray-950 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
