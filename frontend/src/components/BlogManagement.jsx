import React, { useState } from "react";
import BlogForm from "./BlogForm";
import BlogCard from "./BlogCard";

export default function BlogManagement({
  blogs,
  setBlogs,
  onDelete,
  editingBlog,
  setEditingBlog,
  onUpdate,
}) {
  // 1. Setup staging area fields for all 4 inputs
  const [editTitle, setEditTitle] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");
  const [editContent, setEditContent] = useState("");

  // 2. Load all 4 existing parameters when shifting to Edit Mode
  const triggerEditMode = (blogItem) => {
    setEditingBlog(blogItem);
    setEditTitle(blogItem.title || "");
    setEditImageUrl(blogItem.image || blogItem.imageUrl || "");
    setEditShortDesc(blogItem.shortDescription || blogItem.description || "");
    setEditContent(blogItem.content || "");

    // Fallback targeting the main scroll viewport wrapper container if standard window scroll is isolated
    const workspaceArea = document.querySelector("main");
    if (workspaceArea) {
      workspaceArea.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    // 3. Collect and send all 4 updated inputs to the server payload
    onUpdate(id, {
      title: editTitle,
      image: editImageUrl,
      shortDescription: editShortDesc,
      content: editContent,
    });
  };

  return (
    <div className="space-y-12 text-black font-sans">
      {/* Conditional Header View: Creation panel vs 4-Input Modification panel */}
      <div>
        {editingBlog ? (
          <div className="border border-black rounded-3xl p-4 sm:p-8 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-zinc-100 gap-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block mb-1">
                  / System / Edit
                </span>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-black">
                  Modify Blog Post
                </h3>
              </div>
              <button
                onClick={() => setEditingBlog(null)}
                className="text-xs font-mono border rounded-lg border-zinc-200 px-3 py-1.5 hover:border-red-600 hover:text-red-600 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </div>

            <form
              onSubmit={(e) =>
                handleEditSubmit(e, editingBlog._id || editingBlog.id)
              }
              className="space-y-5"
            >
              {/* Input 1: Title */}
              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-zinc-500 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-white border rounded-xl border-zinc-200 px-4 py-2.5 text-sm focus:border-black outline-none font-medium transition-colors"
                  required
                />
              </div>

              {/* Input 2: Image URL */}
              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-zinc-500 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  className="w-full bg-white border rounded-xl border-zinc-200 px-4 py-2.5 text-sm focus:border-black outline-none font-light transition-colors"
                  required
                />
              </div>

              {/* Input 3: Short Description */}
              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-zinc-500 mb-2">
                  Short Description
                </label>
                <textarea
                  value={editShortDesc}
                  onChange={(e) => setEditShortDesc(e.target.value)}
                  rows="3"
                  className="w-full bg-white border border-zinc-200 px-4 py-2.5 text-sm focus:border-black rounded-xl outline-none font-light resize-none transition-colors"
                  required
                />
              </div>

              {/* Input 4: Blog Content */}
              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-zinc-500 mb-2">
                  Blog Content
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="8"
                  className="w-full bg-white border border-zinc-200 px-4 py-2.5 text-sm focus:border-black rounded-xl outline-none font-light transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-black text-white px-6 py-3 text-xs font-mono tracking-wider uppercase rounded-xl hover:bg-zinc-800 transition-colors"
              >
                SAVE_UPDATED_ENTRY
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Renders your original empty creation form layout */}
            <BlogForm setBlogs={setBlogs} />
          </div>
        )}
      </div>

      {/* Grid view displaying your existing cards and matching control links */}
      <div className="border-t border-zinc-200 pt-8">
        <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block mb-6">
          // Live Content Records ({blogs?.length || 0})
        </span>

        {blogs.length === 0 ? (
          <p className="text-xs font-mono text-zinc-400 italic">
            NO_RECORDS_FOUND_IN_DATABASE
          </p>
        ) : (
          /* Responsive columns: Stacked vertically on mobile, moving to a 2-column grid on desktop screens */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {blogs.map((singleBlog) => {
              const currentId = singleBlog._id || singleBlog.id;
              return (
                <div
                  key={currentId}
                  className="border border-zinc-200 p-4 bg-white hover:border-black transition-colors duration-150 flex flex-col justify-between rounded-2xl shadow-xs"
                >
                  {/* Container shields child element dimensions */}
                  <div className="w-full overflow-hidden">
                    <BlogCard blog={singleBlog} />
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-end gap-4 text-[10px] font-mono tracking-wider uppercase">
                    <button
                      onClick={() => triggerEditMode(singleBlog)}
                      className="text-zinc-400 hover:text-black transition-colors"
                    >
                      [ edit ]
                    </button>
                    <button
                      onClick={() => onDelete(currentId)}
                      className="text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      [ delete ]
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
