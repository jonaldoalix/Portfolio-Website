import { useEffect, useState } from "react";
import {
  applyTheme,
  initialTheme,
  type AppliedTheme,
  type ThemeInput,
} from "./theme";
import { ContentProvider } from "./ContentContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<AppliedTheme>(() =>
    applyTheme(initialTheme()),
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      setTheme((current) =>
        applyTheme({
          mode: media.matches ? "light" : "dark",
          palette: current.palette,
        }),
      );
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const reveal = (el: Element) => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        reveal(node);
      } else {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [theme.mode, theme.palette]);

  function updateTheme(next: ThemeInput) {
    setTheme(applyTheme(next));
  }

  return (
    <ContentProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav theme={theme} onThemeChange={updateTheme} />
      <main id="main">
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </ContentProvider>
  );
}
