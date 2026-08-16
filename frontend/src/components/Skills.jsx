export default function Skills() {
  const skillGroups = [
    {
      title: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js"],
    },
    {
      title: "Database",
      skills: ["MongoDB"],
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "VS Code"],
    },
  ];

  return (
    <section className="bg-gray-50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            What I work with
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            Skills & Technologies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Technologies and tools I use to build modern, responsive, and
            user-friendly web applications.
          </p>
        </div>

        {/* Skills Container */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-950">
                  {group.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
