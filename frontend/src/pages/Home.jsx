import Connect from "../components/Connect";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <>
      <div className="px-4 py-4">
        <Hero />
        <Skills />
        <Projects />
        <Connect />
        <Footer />
      </div>
    </>
  );
}
