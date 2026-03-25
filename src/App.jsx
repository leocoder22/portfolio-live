import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Brain,
  Code2,
  Wrench,
  LineChart,
} from "lucide-react";

const navItems = ["Home", "About", "Skills", "Projects", "Journey", "Contact"];

const sectionIds = {
  Home: "home",
  About: "about",
  Skills: "skills",
  Projects: "projects",
  Journey: "journey",
  Contact: "contact",
};

const skillFilters = ["All", "Languages", "AI", "Tools", "Data Science"];

const skillsData = [

  { name: "Python", type: "Languages" },
  { name: "JavaScript", type: "Languages" },
  { name: "HTML", type: "Languages" },
  { name: "CSS", type: "Languages" },
  { name: "SQL", type: "Languages" },

  { name: "Machine Learning", type: "AI" },
  { name: "Deep Learning", type: "AI" },
  { name: "Scikit-learn", type: "AI" },

  { name: "Pandas", type: "Data Science" },
  { name: "NumPy", type: "Data Science" },
  { name: "Matplotlib", type: "Data Science" },
  { name: "Seaborn", type: "Data Science" },
  { name: "Plotly", type: "Data Science" },
  { name: "Statsmodels", type: "Data Science" },

  { name: "Git", type: "Tools" },
  { name: "GitHub", type: "Tools" },
  { name: "Excel", type: "Tools" },
  { name: "Word", type: "Tools" },
  { name: "Canva", type: "Tools" },

  { name: "ChatGPT", type: "AI Tools" },
  { name: "Gemini", type: "AI Tools" },
  { name: "Grok", type: "AI Tools" },
  
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useActiveSection() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(sectionIds[item]))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const id = visible[0].target.id;
          const match = Object.entries(sectionIds).find(([, value]) => value === id);
          if (match) setActive(match[0]);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-15% 0px -15% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function LoadingScreen({ darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center",
        darkMode ? "bg-[#060b16] text-white" : "bg-[#f3f8fe] text-slate-900"
      )}
    >
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className={cn(
            "relative h-20 w-20 rounded-full border",
            darkMode
              ? "border-sky-300/30 shadow-[0_0_45px_rgba(125,211,252,0.2)]"
              : "border-sky-500/25 shadow-[0_0_40px_rgba(14,165,233,0.14)]"
          )}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={cn(
              "absolute inset-2 rounded-full border border-dashed",
              darkMode ? "border-sky-200/20" : "border-sky-500/20"
            )}
          />
          <div
            className={cn(
              "absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
              darkMode ? "bg-sky-300" : "bg-sky-500"
            )}
          />
        </motion.div>

        <div>
          <h2 className="text-xl font-semibold uppercase tracking-[0.28em] sm:text-2xl">

          </h2>
          <p className={cn("mt-2 text-sm", darkMode ? "text-slate-300" : "text-slate-600")}>

          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StarBackground({ darkMode }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame;
    const stars = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;

      // 🔥 Increased particle density
      const count = Math.min(420, Math.floor((width * height) / 12000));

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: 0,
          baseY: 0,
          size: Math.random() * 2.2 + 0.4, // 🔥 more variation
          alpha: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.12,
          speedY: (Math.random() - 0.5) * 0.12,
        });
      }

      stars.forEach((s) => {
        s.baseX = s.x;
        s.baseY = s.y;
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (const star of stars) {
        star.baseX += star.speedX;
        star.baseY += star.speedY;

        if (star.baseX < 0) star.baseX = width;
        if (star.baseX > width) star.baseX = 0;
        if (star.baseY < 0) star.baseY = height;
        if (star.baseY > height) star.baseY = 0;

        let dx = 0;
        let dy = 0;

        if (mouse.active) {
          const distX = star.baseX - mouse.x;
          const distY = star.baseY - mouse.y;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const radius = 120;

          if (dist < radius && dist > 0.1) {
            const force = (radius - dist) / radius;
            dx = (distX / dist) * force * 18;
            dy = (distY / dist) * force * 18;
          }
        }

        star.x += (star.baseX + dx - star.x) * 0.08;
        star.y += (star.baseY + dy - star.y) * 0.08;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        // 🔥 darker particles in light mode
        ctx.fillStyle = darkMode
          ? `rgba(186, 230, 253, ${star.alpha})`
          : `rgba(15, 23, 42, ${Math.min(star.alpha * 0.85, 0.75)})`;

        ctx.fill();
      }

      animationFrame = requestAnimationFrame(render);
    };

    const handleMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
        active: true,
      };
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    handleResize();
    render();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-90"
    />
  );
}

function SectionHeading({ eyebrow, title, subtitle, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p
        className={cn(
          "mb-3 text-xs font-semibold uppercase tracking-[0.32em]",
          darkMode ? "text-sky-300/80" : "text-sky-700/75"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p
        className={cn(
          "mt-4 text-sm leading-7 sm:text-base",
          darkMode ? "text-slate-300/85" : "text-slate-600"
        )}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

function GlassCard({ children, darkMode, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-3xl border backdrop-blur-xl transition-all duration-300",
        darkMode
          ? "border-white/10 bg-white/[0.04] shadow-[0_8px_40px_rgba(56,189,248,0.06)]"
          : "border-slate-200/90 bg-white/70 shadow-[0_8px_35px_rgba(15,23,42,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Navbar({ darkMode }) {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  const scrollToSection = (item) => {
    const el = document.getElementById(sectionIds[item]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center px-2 py-1 sm:px-4">
          <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-300",
                  active === item
                    ? darkMode
                      ? "bg-sky-400/12 text-sky-300"
                      : "bg-sky-100 text-sky-800"
                    : darkMode
                      ? "text-slate-300 hover:bg-white/5 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100"
                )}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
              darkMode
                ? "bg-white/5 text-white hover:bg-white/10"
                : "bg-white/80 text-slate-900 hover:bg-slate-100"
            )}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-4 right-4 top-[74px] z-40 lg:hidden"
          >
            <GlassCard darkMode={darkMode} className="p-3">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-left text-sm",
                      active === item
                        ? darkMode
                          ? "bg-sky-400/10 text-sky-300"
                          : "bg-sky-100 text-sky-800"
                        : darkMode
                          ? "text-slate-200 hover:bg-white/5"
                          : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroVisual({ darkMode, setDarkMode }) {
  const orbitCards = [
    { text: "Analytical", delay: 0 },
    { text: "Logical", delay: -6 },
    { text: "Adaptive", delay: -12 },
  ];

  return (
    <motion.button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="relative mx-auto block w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[540px]"
    >
      <div className="relative aspect-square">

        {/* 🔹 ORBIT CARDS (NOW ALWAYS ON TOP) */}
        {orbitCards.map((card) => (
          <motion.div
            key={card.text}
            className="absolute left-1/2 top-1/2 z-50"   // ✅ added z-50
            animate={{
              x: [150, -75, -75, 150],
              y: [0, 130, -130, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: card.delay,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              className={cn(
                "rounded-xl border px-6 py-3 text-sm font-semibold shadow-lg backdrop-blur-md",
                darkMode
                  ? "border-white/10 bg-white/[0.06] text-slate-100"
                  : "border-slate-200 bg-white/90 text-slate-900" // ✅ darker text
              )}
              style={{
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
              }}
            >
              {card.text}
            </motion.div>
          </motion.div>
        ))}

        {/* 🔹 MOON / SUN */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute inset-[13%] rounded-full z-20", // keep below cards
            darkMode
              ? "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),rgba(186,230,253,0.18),rgba(15,23,42,0.86))] shadow-[0_0_90px_rgba(125,211,252,0.12)]"
              : "bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.98),rgba(254,240,138,0.92),rgba(251,191,36,0.78))] shadow-[0_0_80px_rgba(251,191,36,0.22)]"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full border",
              darkMode ? "border-white/8" : "border-yellow-200/60"
            )}
          />

          {darkMode ? (
            <>
              <div className="absolute left-[22%] top-[28%] h-[18%] w-[18%] rounded-full bg-black/20 blur-[1px]" />
              <div className="absolute right-[26%] top-[42%] h-[11%] w-[11%] rounded-full bg-black/16 blur-[1px]" />
              <div className="absolute bottom-[20%] left-[34%] h-[14%] w-[14%] rounded-full bg-black/16 blur-[1px]" />
            </>
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                const r = 44;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                return (
                  <div
                    key={i}
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/90"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  />
                );
              })}
            </>
          )}
        </motion.div>

        {/* 🔹 RINGS (BEHIND EVERYTHING) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute inset-[6%] rounded-full border border-dashed z-10", // behind cards
            darkMode ? "border-sky-300/12" : "border-yellow-400/30"
          )}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute inset-[2%] rounded-full border z-0", // farthest back
            darkMode ? "border-sky-300/8" : "border-yellow-300/30"
          )}
        />

      </div>
    </motion.button>
  );
}

function HeroSection({ darkMode, setDarkMode }) {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32"
    >
      <div
        className={cn(
          "absolute inset-0 opacity-70",
          darkMode
            ? "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.06),transparent_30%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.05),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(125,211,252,0.05),transparent_30%)]"
        )}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Sarthak Bankar
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
            className={cn(
              "mt-4 text-lg font-medium sm:text-2xl",
              darkMode ? "text-sky-200/90" : "text-sky-800"
            )}
          >
            Python Developer | Machine Learning & Data Science
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.7 }}
            className={cn(
              "mt-6 max-w-2xl text-base leading-8 sm:text-lg",
              darkMode ? "text-slate-300/90" : "text-slate-600"
            )}
          >
            {/* Creating intelligent systems, data-driven solutions, and modern digital experiences. */}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300",
                darkMode
                  ? "bg-sky-300 text-slate-950 hover:shadow-[0_0_30px_rgba(125,211,252,0.25)]"
                  : "bg-sky-700 text-white hover:shadow-[0_0_22px_rgba(14,165,233,0.2)]"
              )}
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className={cn(
                "inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-medium transition-all duration-300",
                darkMode
                  ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-200 bg-white/70 text-slate-900 hover:bg-slate-100"
              )}
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                darkMode
                  ? "border-white/10 bg-white/5 text-slate-200 hover:border-sky-300/30 hover:text-sky-300"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:text-sky-700"
              )}
              title="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href="https://linkedin.com/in/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                darkMode
                  ? "border-white/10 bg-white/5 text-slate-200 hover:border-sky-300/30 hover:text-sky-300"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:text-sky-700"
              )}
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <div className="relative">
              <button
                onClick={() => setShowEmail((prev) => !prev)}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                  darkMode
                    ? "border-white/10 bg-white/5 text-slate-200 hover:border-sky-300/30 hover:text-sky-300"
                    : "border-slate-200 bg-white/70 text-slate-700 hover:text-sky-700"
                )}
                title="Email"
                type="button"
              >
                <Mail size={18} />
              </button>

              <AnimatePresence>
                {showEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className={cn(
                      "absolute left-0 top-14 z-[60] min-w-[240px] rounded-2xl border p-3 shadow-xl backdrop-blur-xl",
                      darkMode
                        ? "border-white/10 bg-[#081120]/95 text-white"
                        : "border-slate-200 bg-white/95 text-slate-900"
                    )}
                  >
                    <div className="mb-1 text-xs uppercase tracking-[0.22em] text-sky-400">
                      Email
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          darkMode ? "text-slate-100" : "text-slate-900"
                        )}
                      >
                        sarthakbankar14@gmail.com
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("sarthakbankar14@gmail.com");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1200);
                        }}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300",
                          darkMode
                            ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                            : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                        )}
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mx-auto w-full"
        >
          <HeroVisual darkMode={darkMode} setDarkMode={setDarkMode} />
        </motion.div>
      </div>
    </section>
  );
}

function PlaceholderSection({ id, eyebrow, title, subtitle, darkMode, children }) {
  return (
    <section id={id} className="relative px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          darkMode={darkMode}
        />
        {children}
      </div>
    </section>
  );
}

function AboutSection({ darkMode }) {
  const aboutData = [
    {
      title: "Introduction",
      content:
        "I’m Sarthak Bankar, a third-year AI & Data Science engineering student with a strong interest in building intelligent and efficient systems. I enjoy working at the intersection of data, algorithms, and real-world problem solving.",
    },
    {
      title: "Current Focus",
      content:
        "Currently, I’m focused on strengthening my skills in machine learning, deep learning, and data-driven development. I actively explore new tools, frameworks, and techniques to build smarter and more efficient applications.",
    },
    {
      title: "What I Build",
      content:
        "I build projects that combine logic, data, and creativity — from machine learning models and analytical dashboards to full-stack applications. My goal is to create solutions that are practical, intuitive, and impactful.",
    },
  ];

  return (
    <PlaceholderSection
      id="about"
      eyebrow="Identity"
      title="About Me"
      subtitle="Turning data into intelligent systems and ideas into reality"
      darkMode={darkMode}
    >
      <GlassCard
        darkMode={darkMode}
        className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7"
      >
        {aboutData.map((item) => (
          <div
            key={item.title}
            className={cn(
              "rounded-2xl border p-5 transition hover:scale-[1.02]",
              darkMode
                ? "border-white/10 bg-white/[0.03]"
                : "border-slate-200 bg-white/60"
            )}
          >
            <h3 className="text-base font-medium sm:text-lg">
              {item.title}
            </h3>

            <p
              className={cn(
                "mt-3 text-sm leading-7",
                darkMode ? "text-slate-300/85" : "text-slate-600"
              )}
            >
              {item.content}
            </p>
          </div>
        ))}
      </GlassCard>
    </PlaceholderSection>
  );
}

function SkillIcon({ type }) {
  if (type === "Languages") return <Code2 size={15} />;
  if (type === "Frontend") return <Sparkles size={15} />;
  if (type === "AI") return <Brain size={15} />;
  if (type === "Data Science") return <LineChart size={15} />;
  return <Wrench size={15} />;
}

function SkillsSection({ darkMode }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleSkills = useMemo(() => {
    if (activeFilter === "All") return skillsData;
    return skillsData.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <PlaceholderSection
      id="skills"
      eyebrow="Arsenal"
      title="Skills & Tech Stack"
      subtitle="Skills that power my projects and passion for building intelligent systems."
      darkMode={darkMode}
    >
      <GlassCard darkMode={darkMode} className="p-5 sm:p-7">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {skillFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-all duration-300",
                activeFilter === filter
                  ? darkMode
                    ? "bg-sky-300/12 text-sky-300"
                    : "bg-sky-100 text-sky-800"
                  : darkMode
                    ? "bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="grid grid-cols-2 gap-3 [perspective:1200px] sm:grid-cols-3 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                initial={{
                  opacity: 0,
                  rotateY: 90,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0,
                  rotateY: 90,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0,
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.6 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <button
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-medium transition-all duration-300 backface-hidden",
                    darkMode
                      ? "border-white/10 bg-white/[0.03] text-slate-200 hover:border-sky-300/25 hover:bg-white/[0.06]"
                      : "border-slate-200 bg-white/75 text-slate-800 hover:bg-sky-50"
                  )}
                >
                  <span className={cn(darkMode ? "text-sky-300" : "text-sky-700")}>
                    <SkillIcon type={skill.type} />
                  </span>
                  {skill.name}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </GlassCard>
    </PlaceholderSection>
  );
}

function ProjectsSection({ darkMode }) {
  const projects = [
    {
      title: "Blog Website",
      tag: "Web App",
      description:
        "A modern responsive blog platform with clean UI, allowing users to read, create, and manage posts efficiently.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/leocoder22/Blog-Website",
      demo: "https://five4day-py.onrender.com",
      image: "./projects/image.png",
    },
    {
      title: "Data Science Project",
      tag: "Data",
      description:
        "Google Trends gives us an estimate of search volume for specific terms. This project explores whether search popularity relates to other types of data.",
      tech: ["Pandas", "NumPy", "Matplotlib"],
      github: "https://github.com/leocoder22/Search-vs-Price-Data-Science",
      demo: "",
      image: "/projects/SearchvsPrice Visuals.png",
    },
    {
      title: "Snake Game",
      tag: "Game",
      description:
        "Classic snake game built with smooth controls and scoring system, focusing on logic building and UI interaction.",
      tech: ["Python", "Turtle", "Pygame"],
      github: "https://github.com/leocoder22/Snake-Game",
      demo: "",
      image: "/projects/snake image.png",
    },
    {
      title: "Research Paper: Diabetes Prediction",
      tag: "Data",
      description:
        "Implemented and evaluated classification algorithms on the PIMA dataset for accurate diabetes prediction and feature analysis.",
      tech: ["Python", "Pandas", "Scikit-learn"],
      github: "https://github.com/leocoder22/Research-Paper-Diabetes-Prediction",
      demo: "",
      image: "/projects/research image.png",
    },
  ];

  return (
    <PlaceholderSection
      id="projects"
      eyebrow="Builds"
      title="Projects Showcase"
      subtitle="A collection of my work combining logic, design, and real-world problem solving."
      darkMode={darkMode}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: idx * 0.1 }}
          >
            <GlassCard
              darkMode={darkMode}
              className="h-full p-5 sm:p-6 transition duration-300 hover:-translate-y-1"
            >
              {/* Preview */}
              <div
                className={cn(
                  "mb-5 h-44 overflow-hidden rounded-2xl border",
                  darkMode
                    ? "border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(15,23,42,0.08))]"
                    : "border-slate-200 bg-[linear-gradient(135deg,rgba(224,242,254,0.9),rgba(255,255,255,0.85))]"
                )}
              >
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("flex", "items-center", "justify-center");
                    e.currentTarget.parentElement.innerHTML =
                      '<span class="text-sm font-medium opacity-70">Project Preview</span>';
                  }}
                />
              </div>

              {/* Title + tag */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium sm:text-xl">
                  {project.title}
                </h3>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs",
                    darkMode
                      ? "bg-sky-300/10 text-sky-300"
                      : "bg-sky-100 text-sky-700"
                  )}
                >
                  {project.tag}
                </span>
              </div>

              {/* Description */}
              <p
                className={cn(
                  "mt-4 text-sm leading-7",
                  darkMode ? "text-slate-300/85" : "text-slate-600"
                )}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs",
                      darkMode
                        ? "bg-white/5 text-slate-300"
                        : "bg-slate-100 text-slate-700"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "rounded-lg border px-4 py-2 text-xs font-medium transition hover:scale-105",
                    darkMode
                      ? "border-white/10 bg-white/5 text-white"
                      : "bg-slate-100 text-slate-800"
                  )}
                >
                  GitHub
                </a>

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "rounded-lg px-4 py-2 text-xs font-medium transition hover:scale-105",
                      darkMode
                        ? "border border-sky-400/20 bg-sky-500/20 text-sky-300"
                        : "bg-sky-600 text-white"
                    )}
                  >
                    Live Demo
                  </a>
                ) : (
                  <span
                    className={cn(
                      "rounded-lg px-4 py-2 text-xs font-medium opacity-70",
                      darkMode
                        ? "border border-white/10 bg-white/5 text-slate-400"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    Demo Soon
                  </span>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PlaceholderSection>
  );
}

function JourneySection({ darkMode }) {
  const items = [
    {
      title: "Starting Point",
      content:
        "Began my journey in 2022 by exploring programming basics and developing an interest in technology and problem solving.",
    },
    {
      title: "Learning Phase",
      content:
        "Built a strong foundation in Python, data structures, and core concepts of programming through courses, tutorials, and hands-on practice.",
    },
    {
      title: "Projects & Growth",
      content:
        "Applied my knowledge by building real-world projects including web applications, data analysis models, and machine learning experiments, continuously learning.",
    },
    {
      title: "Next Milestone",
      content:
        "Focused on advancing my skills in AI and research. Looking for work opportunities and aiming to grow as a researcher.",
    },
  ];

  return (
    <PlaceholderSection
      id="journey"
      eyebrow="Timeline"
      title="My Journey"
      subtitle="My journey began in 2022 when I started exploring programming and data science."
      darkMode={darkMode}
    >
      <div className="relative mx-auto max-w-4xl">

        {/* 🔹 Vertical Line */}
        <div
          className={cn(
            "absolute left-[18px] top-0 h-full w-px sm:left-[22px]",
            darkMode ? "bg-sky-300/20" : "bg-sky-200"
          )}
        />

        <div className="space-y-6 sm:space-y-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className="relative pl-12 sm:pl-16"
            >

              {/* 🔹 Timeline Dot */}
              <div
                className={cn(
                  "absolute left-0 top-5 h-9 w-9 rounded-full border sm:h-11 sm:w-11",
                  darkMode
                    ? "border-sky-300/30 bg-[#081120]"
                    : "border-sky-300 bg-white"
                )}
              >
                <div
                  className={cn(
                    "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                    darkMode ? "bg-sky-300" : "bg-sky-600"
                  )}
                />
              </div>

              {/* 🔹 Card */}
              <GlassCard darkMode={darkMode} className="p-5 sm:p-6">
                <h3 className="text-base font-medium sm:text-lg">
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "mt-3 text-sm leading-7",
                    darkMode ? "text-slate-300/85" : "text-slate-600"
                  )}
                >
                  {item.content}
                </p>
              </GlassCard>

            </motion.div>
          ))}
        </div>
      </div>
    </PlaceholderSection>
  );
}

function ContactSection({ darkMode }) {
  const contactData = [
    {
      title: "Email",
      value: "sarthakbankar14@gmail.com",
      link: "mailto:sarthakbankar14@gmail.com",
    },
    {
      title: "GitHub",
      value: "github.com/leocoder22",
      link: "https://github.com/leocoder22",
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/sarthak-bankar",
      link: "https://www.linkedin.com/in/sarthak-bankar-219758290/",
    },
    {
      title: "Resume",
      value: "Download CV",
      link: "./public/projects/resume.pdf",
    },
  ];

  return (
    <PlaceholderSection
      id="contact"
      eyebrow="Connect"
      title="Let’s Build Something Amazing"
      subtitle="Contact me for collaboration, or just to say hi. I’m open to new community interactions."
      darkMode={darkMode}
    >
      <GlassCard
        darkMode={darkMode}
        className="mx-auto max-w-4xl p-6 sm:p-8 md:p-10"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">

          {/* 🔹 LEFT TEXT */}
          <div>
            <h3 className="text-2xl font-medium sm:text-3xl">
              Open for collaboration, research, and creative ideas.
            </h3>

            {/* <p
              className={cn(
                "mt-4 max-w-xl text-sm leading-7 sm:text-base",
                darkMode ? "text-slate-300/85" : "text-slate-600"
              )}
            >
            
            </p> */}
          </div>

          {/* 🔹 CONTACT CARDS */}
          <div className="grid gap-3 sm:grid-cols-2">
            {contactData.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-2xl border px-5 py-4 transition hover:scale-[1.03]",
                  darkMode
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-slate-200 bg-white/60"
                )}
              >
                <div className="text-sm font-medium">{item.title}</div>

                <div
                  className={cn(
                    "mt-2 text-xs",
                    darkMode ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  {item.value}
                </div>
              </a>
            ))}
          </div>

        </div>
      </GlassCard>
    </PlaceholderSection>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("sarthak-theme");
    if (saved) setDarkMode(saved === "dark");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sarthak-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen scroll-smooth overflow-x-hidden transition-colors duration-500",
        darkMode ? "bg-[#060b16] text-white" : "bg-[#f4f9ff] text-slate-900"
      )}
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <AnimatePresence>{loading && <LoadingScreen darkMode={darkMode} />}</AnimatePresence>

      <div className="relative overflow-x-hidden">
        <StarBackground darkMode={darkMode} />
        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-0",
            darkMode
              ? "bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,0.07),transparent_28%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.05),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,0.03),transparent_28%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.02),transparent_30%)]"
          )}
        />

        <Navbar darkMode={darkMode} />

        <main className="relative z-10">
          <HeroSection darkMode={darkMode} setDarkMode={setDarkMode} />
          <AboutSection darkMode={darkMode} />
          <SkillsSection darkMode={darkMode} />
          <ProjectsSection darkMode={darkMode} />
          <JourneySection darkMode={darkMode} />
          <ContactSection darkMode={darkMode} />
        </main>
      </div>
    </div>
  );
}