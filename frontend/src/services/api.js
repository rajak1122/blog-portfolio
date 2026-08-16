import axios from "axios";

const API_URL = "https://blog-portfolio-hbjl.onrender.com/api";

export const submitContact = async (contactData) => {
  const response = await axios.post(`${API_URL}/contact`, contactData);

  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await axios.post(`${API_URL}/blogs`, blogData);

  return response.data;
};

export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);

  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};
