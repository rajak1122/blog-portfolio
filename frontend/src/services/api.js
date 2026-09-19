import axios from "axios";
import auth from "../firebase/config";

const API = axios.create({
  baseURL: "https://blog-portfolio-hbjl.onrender.com",
});

// Interceptor to attach current users firebase token ID

API.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// API calls

export const fetchAdminBlogs = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const fetchAdminMessages = async () => {
  const response = await API.get("/contact");
  return response.data;
};

export const fetchAdminList = async () => {
  const response = await API.get("/admin");
  return response.data;
};

export const deleteAdminBlog = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};

export const updateAdminBlog = async (id, updatedData) => {
  const response = await API.put(`/blogs/${id}`, updatedData);
  return response.data;
};

export const createNewAdminUser = async (firebaseUid) => {
  const response = await API.post("/admin", { firebaseUid });
  return response.data;
};

export const revokeAdminAccess = async (id) => {
  const response = await API.put(`/admin/${id}revoke/`);
  return response.data;
};

export const submitContact = async (contactData) => {
  const response = await API.post(`/contact`, contactData);

  return response.data;
};

export const updateMessageStatus = async (id, status) => {
  const response = await API.patch(`/contact/${id}/status`, { status });
  return response.data;
};

export const deleteMessageLog = async (id) => {
  const response = await API.delete(`/contact/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await API.post(`/blogs`, blogData);

  return response.data;
};

export const getBlogs = async () => {
  const response = await API.get(`/blogs`);

  return response.data;
};

export const getBlogById = async (id) => {
  const response = await API.get(`/blogs/${id}`);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};

export const likeBlog = async (id, userId) => {
  const response = await API.post(`/blogs/${id}/like`, {
    userId,
  });

  return response.data;
};
