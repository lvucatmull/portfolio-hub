import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { AirplaneTilt } from "@phosphor-icons/react/AirplaneTilt";
import { Briefcase } from "@phosphor-icons/react/Briefcase";
import { Database } from "@phosphor-icons/react/Database";
import { FrameCorners } from "@phosphor-icons/react/FrameCorners";
import { GithubLogo } from "@phosphor-icons/react/GithubLogo";
import { GraduationCap } from "@phosphor-icons/react/GraduationCap";
import { GlobeHemisphereWest } from "@phosphor-icons/react/GlobeHemisphereWest";
import { Sphere } from "@phosphor-icons/react/Sphere";
import { Target } from "@phosphor-icons/react/Target";
import { TrendUp } from "@phosphor-icons/react/TrendUp";

const TABS = [
  { id: "my-info", label: "My Info" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Portfolio" },
];

const EXPERIENCE_AREAS = [
  {
    title: "3D Rendering",
    description:
      "Unified VTK and iWTK paths into reusable Three.js rendering systems.",
  },
  {
    title: "Desktop & Auth",
    description:
      "Rebuilt Electron OAuth2/OIDC flows and resilient account switching.",
  },
  {
    title: "Performance",
    description:
      "Reduced heavy WASM initialization and designed local-first loading paths.",
  },
  {
    title: "Quality & Delivery",
    description:
      "Added visual parity harnesses, E2E regression guards, and release pipelines.",
  },
];

const PROJECTS = [
  {
    title: "Ray Tracing Scene Lab",
    description:
      "A progressive WebGL2 path tracer for studying physically based rendering, accumulation, materials, and renderer diagnostics.",
    tech: "React · TypeScript · WebGL2 · GLSL",
    image: "/ray-tracing-scene.png",
    imageAlt: "Cornell box ray tracing scene with metal and glass spheres",
    details: [
      { icon: TrendUp, label: "Progressive accumulation" },
      { icon: Sphere, label: "Diffuse · Metal · Glass" },
      { icon: FrameCorners, label: "Beauty · Normal · Depth" },
    ],
    liveUrl: "http://127.0.0.1:4174/#workspace",
    liveLabel: "Open live scene",
    sourceUrl: "https://github.com/lvucatmull/ray-tracing-scene-lab",
  },
  {
    title: "Airspace Replay",
    description:
      "A one-year synthetic flight replay that streams bounded time windows into a linked Three.js globe, timeline, and aircraft inspector.",
    tech: "React · Three.js · WebGL · Worker API",
    image: "/airspace-replay.png",
    imageAlt: "Airspace Replay globe with simulated aircraft and a one-year timeline",
    details: [
      { icon: Database, label: "20-minute HTTP windows" },
      { icon: GlobeHemisphereWest, label: "1,200 GPU instances" },
      { icon: AirplaneTilt, label: "Globe · Timeline · Telemetry" },
    ],
    liveUrl: "http://127.0.0.1:4180/",
    liveLabel: "Open visualization",
    sourceUrl: "https://github.com/lvucatmull/airspace-replay",
  },
];

function tabFromHash() {
  const id = window.location.hash.replace("#", "");
  return TABS.some((tab) => tab.id === id) ? id : "my-info";
}

function Header({ activeTab, onNavigate }) {
  function handleKeyDown(event, index) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + TABS.length) % TABS.length;
    const nextTab = TABS[nextIndex];
    onNavigate(nextTab.id);
    requestAnimationFrame(() => {
      document.getElementById("tab-" + nextTab.id)?.focus();
    });
  }

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate("my-info")}>
        SEONGJOO KIM
      </button>
      <nav className="tabs" aria-label="Portfolio sections" role="tablist">
        {TABS.map((tab, index) => (
          <button
            className="tab-button"
            id={"tab-" + tab.id}
            key={tab.id}
            role="tab"
            type="button"
            aria-controls={"panel-" + tab.id}
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onNavigate(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function ExternalLink({ href, children, primary = false }) {
  return (
    <a
      className={primary ? "action-link action-link-primary" : "action-link"}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function Stat({ icon: Icon, title, value }) {
  return (
    <div className="stat-item">
      <Icon aria-hidden="true" size={48} weight="light" />
      <div>
        <strong>{title}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}

function MyInfo({ onNavigate }) {
  return (
    <div className="my-info-view">
      <section className="intro-copy" aria-labelledby="my-info-title">
        <h1 id="my-info-title">
          3D products for
          <br />
          the web and desktop.
        </h1>
        <p className="intro-lead">
          Software Engineer with 8 years of experience across Web, Electron, 3D
          rendering, and authentication systems.
        </p>
        <p className="intro-support">
          I turn complex 3D and platform problems into reliable product experiences.
        </p>
        <div className="intro-actions">
          <ExternalLink href="https://github.com/lvucatmull" primary>
            <GithubLogo aria-hidden="true" size={36} weight="fill" />
            GitHub
          </ExternalLink>
          <button className="action-link" type="button" onClick={() => onNavigate("portfolio")}>
            <ArrowUpRight aria-hidden="true" size={32} />
            View portfolio
          </button>
        </div>
      </section>

      <figure className="hero-media">
        <img
          src="/hero-scene.png"
          alt="Ray-traced concrete interior with metal and glass forms"
        />
      </figure>

      <section className="stats-rail" aria-label="Career summary">
        <Stat icon={Briefcase} title="8 years —" value="Software Engineering" />
        <Stat icon={GraduationCap} title="M.S. —" value="Computer Graphics" />
        <Stat icon={Target} title="Focus —" value="3D · Platform · Product" />
      </section>
    </div>
  );
}

function Experience() {
  return (
    <section className="content-view experience-view" aria-labelledby="experience-title">
      <div className="view-heading">
        <h1 id="experience-title">Experience</h1>
        <p>Product engineering across rendering, desktop systems, and platform reliability.</p>
      </div>
      <div className="experience-layout">
        <aside className="company-summary">
          <strong>ImagoWorks</strong>
          <span>Software Engineer</span>
        </aside>
        <div className="experience-detail">
          <p className="experience-summary">
            Built and modernized Web/Electron dental CAD/CAM products across 3D
            rendering, OAuth2/OIDC, performance, and delivery systems.
          </p>
          <div className="experience-areas">
            {EXPERIENCE_AREAS.map((area) => (
              <article className="experience-row" key={area.title}>
                <h2>{area.title}</h2>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="content-view portfolio-view" aria-labelledby="portfolio-title">
      <div className="view-heading">
        <h1 id="portfolio-title">Portfolio</h1>
        <p>Selected work that makes rendering and system behavior visible.</p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article className="project-card" key={project.title}>
            <figure className="project-media">
              <img src={project.image} alt={project.imageAlt} />
            </figure>
            <div className="project-copy">
              <div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <span className="tech-line">{project.tech}</span>
              </div>
              <ul className="project-details" aria-label={project.title + " capabilities"}>
                {project.details.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <Icon aria-hidden="true" size={20} weight="light" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="project-actions">
                <ExternalLink href={project.liveUrl} primary>
                  <ArrowUpRight aria-hidden="true" size={19} />
                  {project.liveLabel}
                </ExternalLink>
                {project.sourceUrl ? (
                  <ExternalLink href={project.sourceUrl}>
                    <GithubLogo aria-hidden="true" size={20} weight="fill" />
                    View source
                  </ExternalLink>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const PANELS = {
  "my-info": MyInfo,
  experience: Experience,
  portfolio: Portfolio,
};

export function App() {
  const [activeTab, setActiveTab] = useState(tabFromHash);

  useEffect(() => {
    const handleHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function navigate(tabId) {
    setActiveTab(tabId);
    if (window.location.hash !== "#" + tabId) {
      window.history.pushState(null, "", "#" + tabId);
    }
  }

  const ActivePanel = PANELS[activeTab];

  return (
    <div className="app-shell">
      <Header activeTab={activeTab} onNavigate={navigate} />
      <main
        className="tab-panel"
        id={"panel-" + activeTab}
        role="tabpanel"
        aria-labelledby={"tab-" + activeTab}
        tabIndex={0}
      >
        <div className="panel-transition" key={activeTab}>
          <ActivePanel onNavigate={navigate} />
        </div>
      </main>
    </div>
  );
}
