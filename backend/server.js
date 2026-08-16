require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoute");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
