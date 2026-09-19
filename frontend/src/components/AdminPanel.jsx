import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../firebase/config";
import { MdOutlineSpaceDashboard, MdMenu, MdClose } from "react-icons/md";
import BlogManagement from "./BlogManagement";
import ContactMessages from "./ContactMessages";
import AdminManagement from "./AdminManagement";
import {
  fetchAdminBlogs,
  fetchAdminMessages,
  fetchAdminList,
  deleteAdminBlog,
  updateAdminBlog,
} from "../services/api";
import Footer from "./Footer";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);

  // Mobile sidebar visibility toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetching data from DB
  useEffect(() => {
    const gatherSecuredMetrics = async () => {
      try {
        const [blogsData, contactsData, adminsData] = await Promise.all([
          fetchAdminBlogs(),
          fetchAdminMessages(),
          fetchAdminList(),
        ]);

        setAdmins(adminsData.admins);
        setContacts(contactsData.contacts);
        setBlogs(blogsData);
      } catch (error) {
        console.error(
          "Secure data hydration failed:",
          error.response?.data?.message || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    gatherSecuredMetrics();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-xs font-mono text-zinc-400">
        VERIFYING_CREDENTIALS_AND_LOADING...
      </div>
    );

  // 1. DYNAMIC SECURITY VERIFICATION CHECK
  const currentUserEmail = auth.currentUser?.email;

  // Look through the retrieved database list to see if the current email matches an active admin record
  const hasAdminAccess = admins.some(
    (admin) => admin.email === currentUserEmail && admin.status === "active",
  );

  // 2. THE NON-ADMIN ACCESS DENIED GATEKEEPER
  if (!hasAdminAccess) {
    return (
      <div className="min-h-[calc(100vh-64px)] w-full bg-zinc-50 flex items-center justify-between font-sans antialiased text-black p-4 sm:p-8">
        <div className="max-w-md mx-auto bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">
              [ ACCESS_DENIED ]
            </span>
            <h2 className="text-2xl font-light tracking-tight text-black">
              Restricted Area
            </h2>
            {/* Custom request message applied here */}
            <p className="text-sm font-light text-zinc-500 leading-relaxed">
              Sorry, you don't have admin access. Your account credentials do
              not hold the administrative privileges required to view this
              console matrix.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-2.5 text-xs font-mono tracking-wider uppercase rounded-xl hover:bg-zinc-800 transition-colors"
            >
              ← Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Centralized blog deletion function
  const onDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to remove this post record?"))
      return;

    try {
      await deleteAdminBlog(id);
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== id));
    } catch (err) {
      alert(
        "System deletion failure: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  // Centralized blog update function
  const onUpdateBlog = async (id, payload) => {
    try {
      const freshRecord = await updateAdminBlog(id, payload);
      setBlogs((prev) =>
        prev.map((b) => ((b._id || b.id) === id ? freshRecord : b)),
      );
      setEditingBlog(null);
    } catch (err) {
      alert(
        "System update failure: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-white font-sans antialiased text-zinc-800 flex flex-col">
      {/* MOBILE APPLICATION HEADER BAR: Visible on small screens only */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white sticky top-0 z-40">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 border border-zinc-200 rounded-md hover:border-black transition-colors"
        >
          <MdMenu size={20} />
        </button>
        <span className="text-xs font-mono font-bold tracking-widest uppercase">
          Console
        </span>
        <div className="w-8"></div>
      </div>

      <div className="flex flex-1">
        {/* 1. RESPONSIVE SIDEBAR COMPONENT */}
        <aside
          className={`
          fixed top-18.25 bottom-0 left-0 z-40 md:relative md:inset-auto md:z-auto w-64 min-w-62.5 bg-white p-8 flex flex-col gap-8 border-r border-zinc-200 h-full
          transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <div className="flex items-center justify-between pb-4 border-b border-black">
            <h1 className="text-sm font-bold tracking-widest uppercase">
              Console
            </h1>
            <div className="flex items-center gap-2">
              <MdOutlineSpaceDashboard
                size={20}
                stroke="currentColor"
                strokeWidth={0.5}
                className="text-zinc-400"
              />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1 text-zinc-400 hover:text-black transition-colors"
              >
                <MdClose size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5 text-xs font-medium tracking-wider uppercase">
            <button
              onClick={() => {
                setActiveTab("overview");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg transition-colors duration-150 ${
                activeTab === "overview"
                  ? "bg-black text-white"
                  : "text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => {
                setActiveTab("messages");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg transition-colors duration-150 ${
                activeTab === "messages"
                  ? "bg-black text-white"
                  : "text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
            >
              Contact Responses
            </button>

            <button
              onClick={() => {
                setActiveTab("blogs");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg transition-colors duration-150 ${
                activeTab === "blogs"
                  ? "bg-black text-white"
                  : "text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
            >
              Blog Content
            </button>

            <button
              onClick={() => {
                setActiveTab("admins");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg transition-colors duration-150 ${
                activeTab === "admins"
                  ? "bg-black text-white"
                  : "text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
            >
              System Admins
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full text-left py-2 px-3 text-zinc-400 hover:text-black border-t border-zinc-200 mt-6 pt-4 transition-colors"
            >
              Exit Panel →
            </button>
          </nav>
        </aside>

        {/* MOBILE DRAWER DIM BACKDROP OVERLAY */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/10  backdrop-blur-xs"
          />
        )}

        {/* 2. DYNAMIC WORKSPACE OPERATIONAL AREA */}
        <main className="flex-1 p-4 sm:p-8 md:p-12 bg-zinc-50/50 overflow-y-auto w-full min-w-0">
          <div>
            {/* Context Section Headline */}
            <div className="mb-6 md:mb-10">
              <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase block mb-1">
                / System / {activeTab}
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black capitalize">
                {activeTab === "blogs"
                  ? "Blog Management"
                  : activeTab === "messages"
                    ? "Inbox Responses"
                    : activeTab}
              </h2>
            </div>

            {/* Render Modules Based on activeTab Status */}
            <div className="bg-white">
              {activeTab === "overview" && (
                <div className="font-light text-zinc-600 space-y-4">
                  <p>Welcome to your operational environment.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 md:pt-4 text-center">
                    <div className="border border-zinc-300 rounded-2xl p-4 bg-zinc-50/30">
                      <span className="block text-xl font-mono font-medium text-black">
                        {blogs.length}
                      </span>
                      <span className="text-xs uppercase text-zinc-400 tracking-wider">
                        Total Blogs
                      </span>
                    </div>
                    <div className="border border-zinc-300 rounded-2xl p-4 bg-zinc-50/30">
                      <span className="block text-xl font-mono font-medium text-black">
                        {
                          contacts.filter(
                            (contact) => contact.status === "pending",
                          ).length
                        }
                      </span>
                      <span className="text-xs uppercase text-zinc-400 tracking-wider">
                        Unread Logs
                      </span>
                    </div>
                    <div className="border border-zinc-300 rounded-2xl p-4 bg-zinc-50/30">
                      <span className="block text-xl font-mono font-medium text-black">
                        {admins?.length ?? 0}
                      </span>
                      <span className="text-xs uppercase text-zinc-400 tracking-wider">
                        Total Admins
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "blogs" && (
                <BlogManagement
                  blogs={blogs}
                  setBlogs={setBlogs}
                  onDelete={onDeleteBlog}
                  editingBlog={editingBlog}
                  setEditingBlog={setEditingBlog}
                  onUpdate={onUpdateBlog}
                />
              )}

              {activeTab === "messages" && (
                <ContactMessages
                  messages={contacts}
                  setMessages={setContacts}
                />
              )}

              {activeTab === "admins" && (
                <AdminManagement admins={admins} setAdmins={setAdmins} />
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
