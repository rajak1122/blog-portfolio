import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog, admin, onDelete }) {
  const navigate = useNavigate();
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Blog Image */}
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={blog?.image}
          alt={blog?.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {blog?.date}
        </p>

        {/* Title */}
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-gray-950">
          {blog?.title}
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {blog?.description}
        </p>

        {/* Read More */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => navigate(`/blogs/${blog?._id}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:gap-3"
          >
            Read more
            <span>→</span>
          </button>

          {admin && (
            <button
              onClick={() => onDelete(blog._id)}
              className="text-sm font-medium text-red-600 transition hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
