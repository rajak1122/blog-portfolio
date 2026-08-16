const projects = [
  {
    number: "01",
    title: "BulkMail",
    description:
      "A bulk email application with email validation, file upload, sending history, and a clean neumorphic interface.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/rajak1122/BulkMail.git",
    live: "https://bulk-mail-psi-wheat.vercel.app/",
  },
  {
    number: "02",
    title: "SkyCast",
    description:
      "A responsive weather application that provides real-time weather information with dynamic weather visuals.",
    technologies: ["React", "Axios", "API", "Tailwind CSS"],
    github: "https://github.com/rajak1122/SkyCast-weather-app.git",
    live: "https://sky-cast-weather-app-zeta.vercel.app/",
  },
  {
    number: "03",
    title: "NovaAuth",
    description:
      "A modern authentication application focused on secure user registration, login, and form validation.",
    technologies: ["React", "JavaScript", "Authentication"],
    github: "https://github.com/rajak1122/NovaAuth.git",
    live: "https://nova-auth-liart.vercel.app/login",
  },
  {
    number: "04",
    title: "Favourite Students",
    description:
      "A React application for managing a student list and favourite students using Context API.",
    technologies: ["React", "Context API", "Tailwind CSS"],
    github: "https://github.com/rajak1122/favourite-student.git",
    live: "https://favourite-student-eight.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Selected Work
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            Projects I've Built
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            A selection of projects I've built while learning and applying
            modern web development technologies.
          </p>
        </div>

        {/* Projects Container */}
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.number}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">
                    {project.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-gray-900"></span>
                </div>

                {/* Project Info */}
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-gray-950">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-7 flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-100"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
