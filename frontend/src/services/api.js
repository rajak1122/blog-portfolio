import axios from "axios";

const API_URL = "http://localhost:3000/api";

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
