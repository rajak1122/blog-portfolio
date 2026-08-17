import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogForm from "../components/BlogForm";
import { getBlogs, deleteBlog } from "../services/api";
import auth from "../firebase/config";

export default function Blogs() {
  const admin_uid = "RLVG86NpFGanUtWtE6nEIh0XCGw1";
  const [blogs, setBlogs] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("CURRENT USER:", user);
      console.log("CURRENT UID:", user?.uid);
      console.log("ADMIN UID:", admin_uid);

      if (user?.uid === admin_uid) {
        console.log("ADMIN DETECTED ✅");
        setAdmin(true);
      } else {
        console.log("NOT ADMIN ❌");
        setAdmin(false);
      }
    });
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {admin && <BlogForm />}

      <div className="min-h-[60vh] flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500 md:text-2xl">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                admin={admin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
