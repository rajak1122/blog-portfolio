import { useState } from "react";
import Footer from "../components/Footer";
import { submitContact } from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await submitContact(formData);

      console.log(data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <>
      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-16 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                Get in touch
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                Let's talk.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                Have a project, opportunity, or just want to connect? Send me a
                message and I'll get back to you.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  rows="6"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
