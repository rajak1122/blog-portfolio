import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, likeBlog } from "../services/api";
import auth from "../firebase/config";

export default function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
        setLikeCount(data.likes?.length || 0);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && blog?.likes?.includes(user.uid)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });

    return () => unsubscribe();
  }, [blog]);

  const handleLike = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to like this blog.");
      return;
    }

    if (liked) {
      return;
    }

    try {
      const data = await likeBlog(id, user.uid);

      setLiked(true);
      setLikeCount(data.likes.length);
    } catch (error) {
      console.error("Failed to like blog:", error);
    }
  };

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

      <div className="mt-8 flex items-center justify-between border-y border-gray-200 py-4">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
            liked
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span className="text-lg">{liked ? "♥" : "♡"}</span>

          {liked ? "Liked" : "Like"}
        </button>

        <span className="text-sm text-gray-500">
          {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </span>
      </div>

      <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-800">
        {blog.content}
      </div>
    </article>
  );
}
