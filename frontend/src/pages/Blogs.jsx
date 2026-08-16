import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogForm from "../components/BlogForm";
import { getBlogs } from "../services/api";
import auth from "../firebase/config";

export default function Blogs() {
  const admin_uid = "RLVG86NpFGanUtWtE6nEIh0XCGw1";
  const [blogs, setBlogs] = useState([]);
  const [admin, setAdmin] = useState(false);

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
      }
    };

    fetchBlogs();
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5">
      {admin && <BlogForm />}

      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
