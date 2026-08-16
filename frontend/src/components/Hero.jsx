import myImage from "../assets/portfolio-image.jpeg";
import myCV from "../assets/Raja_Resume.pdf";
import { useNavigate } from "react-router-dom";
import auth from "../firebase/config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Hero() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="min-h-[calc(100vh-73px)] bg-white">
      <p className="text-sm md:text-2xl text-center p-3 text-gray-500">
        {userName} is viewing Raja's profile
      </p>
      <div className="border border-gray-200 rounded-3xl  bg-white shadow-sm mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-6 py-16 lg:px-8">
        <div className=" grid w-full items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Left - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="h-64 w-64 overflow-hidden rounded-full border border-gray-200 bg-gray-100 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                <img
                  src={myImage}
                  alt="Raja"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Small decorative dot */}
              <div className="absolute bottom-5 right-5 h-5 w-5 rounded-full border-4 border-white bg-gray-950"></div>
            </div>
          </div>

          {/* Right - Introduction */}
          <div className="text-center md:text-left">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Full Stack Developer
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Hi, I'm Raja.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              I'm a Full Stack Developer focused on building clean, responsive,
              and user-friendly web applications. I enjoy solving problems
              through code, exploring modern technologies, and turning ideas
              into meaningful digital experiences.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:justify-start justify-center">
              {/* Download CV */}
              <a
                href={myCV}
                download
                className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg"
              >
                Download CV
              </a>

              {/* View Projects */}
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
