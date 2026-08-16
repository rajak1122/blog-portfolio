const socialLinks = [
  {
    name: "LinkedIn",
    description: "Let's connect professionally",
    url: "https://www.linkedin.com/in/raja-k-11b815388/",
  },
  {
    name: "GitHub",
    description: "Explore my projects",
    url: "https://github.com/rajak1122",
  },
  {
    name: "Instagram",
    description: "A little more about me",
    url: "https://www.instagram.com/raja19._/?hl=en",
  },
];

export default function Connect() {
  return (
    <section className="bg-gray-50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12 lg:p-16">
          {/* Heading */}
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Let's Connect
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              Let's build something together.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              Whether you have a project in mind, an opportunity to discuss, or
              simply want to connect, feel free to reach out.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-950">{social.name}</h3>

                  <span className="text-lg text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gray-950">
                    →
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {social.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
