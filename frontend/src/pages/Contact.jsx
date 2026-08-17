import { useState } from "react";
import Footer from "../components/Footer";
import { submitContact } from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const data = await submitContact(formData);

      console.log(data);

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
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
            {status !== "idle" && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
                  {status === "sending" && (
                    <>
                      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900"></div>

                      <h2 className="text-lg font-semibold text-gray-900">
                        Sending your response...
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Please wait a moment.
                      </p>
                    </>
                  )}

                  {status === "success" && (
                    <>
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        ✓
                      </div>

                      <h2 className="text-lg font-semibold text-gray-900">
                        Response sent successfully!
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Thanks for reaching out. I'll get back to you soon.
                      </p>

                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 rounded-xl bg-gray-950 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                      >
                        Close
                      </button>
                    </>
                  )}

                  {status === "error" && (
                    <>
                      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                        !
                      </div>

                      <h2 className="text-lg font-semibold text-gray-900">
                        Failed to send response
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Something went wrong. Please try again.
                      </p>

                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 rounded-xl bg-gray-950 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
