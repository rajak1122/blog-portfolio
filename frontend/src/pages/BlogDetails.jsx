import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/api";

export default function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-gray-500">Blog not found.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {blog.date}
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950">
        {blog.title}
      </h1>

      <img
        src={blog.image}
        alt={blog.title}
        className="mt-8 h-[420px] w-full rounded-3xl object-cover"
      />

      <p className="mt-8 text-lg leading-8 text-gray-600">{blog.description}</p>

      <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-800">
        {blog.content}
      </div>
    </article>
  );
}
