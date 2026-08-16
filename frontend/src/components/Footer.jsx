export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row lg:px-8">
        {/* Brand */}
        <p className="text-sm font-semibold tracking-tight text-gray-950">
          Raja<span className="text-gray-400">.</span>
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2026 Raja. All rights reserved.
        </p>

        {/* Back to top */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-950"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
