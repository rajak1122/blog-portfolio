import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import { getBlogs, deleteBlog } from "../services/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <h1 className="font-medium text-xl">Blogs by Raja</h1>
      <div className="min-h-[60vh] flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500 md:text-2xl">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
