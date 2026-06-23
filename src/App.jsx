import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

const navItems = ["About", "Expertise", "Work", "Contact"];

const skills = [
  "Python",
  "SQL",
  "Machine Learning",
  "Deep Learning",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "Git & GitHub",
  "Flask",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "Data Visualization",
  "Artificial Intelligence"
];

const projects = [
  {
    number: "01",
    title: "Search vs. Price",
    type: "Data exploration",
    description:
      "An analytical study of the relationship between Google search interest and real-world price data, translated into accessible visuals.",
    stack: ["Pandas", "NumPy", "Matplotlib"],
    image: "/projects/SearchvsPrice Visuals.png",
    github: "https://github.com/leocoder22/Search-vs-Price-Data-Science",
  },
  {
    number: "02",
    title: "Diabetes Prediction",
    type: "Machine learning research",
    description:
      "Classification research on the PIMA dataset, covering feature analysis and evaluation of prediction algorithms.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    image: "/projects/research image.png",
    github: "https://github.com/leocoder22/Research-Paper-Diabetes-Prediction",
  },
  {
    number: "03",
    title: "MAHATROPACON 2026",
    type: "Conference platform",
    description:
      "Official event platform built around clear information architecture, schedules, registration flows, and a responsive attendee experience.",
    stack: ["React", "Next.js", "Tailwind CSS"],
    image: "/projects/mahatropacon.png",
    github: "https://github.com/leocoder22/Medical-Conference-Website",
    demo: "https://www.mahatropacon2026.com/",
  },
  {
    number: "04",
    title: "Habit Streak Tracker",
    type: "Mobile application",
    description:
      "A focused Flutter app for building daily consistency, with local persistence, thoughtful micro-interactions, and celebratory streak moments.",
    stack: ["Flutter", "Dart", "SharedPreferences"],
    image: "/projects/habit-streak-app.png",
    github: "https://github.com/leocoder22/Flutter-Streak-App",
    demo: "https://drive.google.com/uc?export=download&id=1HX4SbwC5r1O7CaSPpQXsMSR8Ob03oiZ6",
  },
  {
    number: "05",
    title: "Snake Game",
    type: "Game development",
    description:
      "A classic Snake game built around responsive controls, scoring logic, and a playful focus on core programming fundamentals.",
    stack: ["Python", "Turtle", "Pygame"],
    image: "/projects/snake image.png",
    github: "https://github.com/leocoder22/Snake-Game",
  },
];

function cn(...values) {
  return values.filter(Boolean).join(" ");
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-500 dark:text-indigo-300">
      <span className="h-px w-7 bg-current opacity-70" />
      {children}
    </p>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("All");
  const [themeTransition, setThemeTransition] = useState(null);

  const categories = useMemo(
    () => ({
      All: skills,
      Engineering: ["Python","Flask", "SQL", "Git & GitHub"],
      Intelligence: ["Machine Learning", "Deep Learning", "Scikit-learn", "Pandas", "NumPy", "Artificial Intelligence"],
      Data: ["Pandas", "NumPy", "SQL", "Matplotlib", "Seaborn", "Plotly", "Data Visualization"],
    }),
    []
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const toggleTheme = (event) => {
    if (themeTransition) return;

    const nextDarkMode = !darkMode;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDarkMode(nextDarkMode);
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    setThemeTransition({ x, y, radius, nextDarkMode });
    window.setTimeout(() => setDarkMode(nextDarkMode), 480);
    window.setTimeout(() => setThemeTransition(null), 760);
  };

  const surface = darkMode
    ? "border-white/[0.09] bg-white/[0.035]"
    : "border-stone-200 bg-white/[0.76]";
  const muted = darkMode ? "text-stone-400" : "text-stone-500";

  return (
    <div className={cn("min-h-screen overflow-x-hidden transition-colors duration-500", darkMode ? "bg-[#101114] text-[#f4f3ef]" : "bg-[#f7f6f2] text-[#1d1d20]")}>
      <AnimatePresence>
        {themeTransition && (
          <motion.div
            initial={{ clipPath: `circle(0px at ${themeTransition.x}px ${themeTransition.y}px)` }}
            animate={{ clipPath: `circle(${themeTransition.radius}px at ${themeTransition.x}px ${themeTransition.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ clipPath: { duration: 0.58, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.18 } }}
            className={cn("pointer-events-none fixed inset-0 z-[100]", themeTransition.nextDarkMode ? "bg-[#101114]" : "bg-[#f7f6f2]")}
          />
        )}
      </AnimatePresence>
      <div className="pointer-events-none fixed inset-0 opacity-80 [background-image:linear-gradient(to_right,rgba(128,128,128,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,.055)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none fixed left-[10%] top-0 h-96 w-96 rounded-full bg-indigo-500/[0.07] blur-[120px]" />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-8">
        <div className={cn("mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl", surface)}>
          <button onClick={() => scrollTo("home")} className="text-sm font-semibold tracking-[-0.03em]" aria-label="Back to home">
            SB<span className="text-indigo-400">.</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className={cn("rounded-full px-3 py-1.5 text-xs transition", muted, "hover:bg-black/5 hover:text-indigo-500 dark:hover:bg-white/[0.07] dark:hover:text-indigo-200")}>
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button onClick={toggleTheme} className={cn("grid h-8 w-8 place-items-center rounded-full transition", darkMode ? "hover:bg-white/[0.08]" : "hover:bg-stone-100")} aria-label="Toggle colour theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={darkMode ? "sun" : "moon"} initial={{ opacity: 0, rotate: -45, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 45, scale: 0.7 }} transition={{ duration: 0.18 }}>
                  {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button onClick={() => setMenuOpen((value) => !value)} className="grid h-8 w-8 place-items-center rounded-full md:hidden" aria-label="Toggle menu">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={cn("mx-auto mt-2 max-w-6xl rounded-3xl border p-2 backdrop-blur-xl md:hidden", surface)}>
              {navItems.map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className={cn("block w-full rounded-2xl px-4 py-3 text-left text-sm", "hover:bg-black/5 dark:hover:bg-white/[0.07]")}>
                  {item}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section id="home" className="mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-16 pt-28 sm:px-8">
          <div className="grid w-full items-end gap-14 lg:grid-cols-[1.4fr_.6fr]">
            <Reveal>
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300">Portfolio / 2026</p>
              <h1 className="max-w-5xl text-[clamp(3.4rem,9vw,8.6rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                <span className="font-serif font-normal italic text-indigo-500 dark:text-indigo-300">Sarthak Bankar.</span>
              </h1>
              <div className="mt-9 flex max-w-xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <p className={cn("max-w-sm text-sm leading-7 sm:text-base", muted)}>
                  An AI & Data Science student turning complex ideas into useful, considered digital products.
                </p>
                <a href="#work" className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-200">
                  Explore selected work <ArrowDownRight size={17} className="transition-transform group-hover:translate-y-1" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="hidden lg:block">
              <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[2rem] border", surface)}>
                <img src={darkMode ? "/sarthak-portrait.png" : "/sarthak-portrait-light.png"} alt="Sarthak Bankar" className="h-full w-full object-cover object-center" />
                <div className={cn("absolute inset-0", darkMode ? "bg-[linear-gradient(to_top,rgba(10,12,18,.78),transparent_45%)]" : "bg-[linear-gradient(to_top,rgba(29,29,32,.70),transparent_45%)]")} />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-5 top-5 rounded-full border border-white/30 bg-[#101114]/65 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">
                  AI & Data Science
                </motion.div>
                <div className="absolute inset-x-6 bottom-6 border-t border-white/20 pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Currently</p>
                  <p className="mt-2 text-sm leading-6 text-stone-200">Exploring machine learning, thoughtful interfaces, and research-led product work.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <Reveal><SectionLabel>About</SectionLabel></Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-3xl text-3xl font-medium leading-[1.12] tracking-[-0.045em] sm:text-5xl">
                I’m interested in the point where <span className="text-indigo-500 dark:text-indigo-300">data, design, and real problems</span> meet.
              </p>
              <div className={cn("mt-10 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-3", surface)}>
                {[["01", "Think clearly", "Break complex problems into understandable, useful systems."], ["02", "Build deliberately", "Use the right tools, strong fundamentals, and careful detail."], ["03", "Keep learning", "Stay curious about new research, methods, and technology."]].map(([number, title, copy]) => (
                  <div key={number} className={cn("p-6", darkMode ? "bg-[#141518]" : "bg-[#fbfaf7]")}>
                    <span className="text-xs text-indigo-500 dark:text-indigo-300">{number}</span>
                    <h3 className="mt-9 text-base font-semibold">{title}</h3>
                    <p className={cn("mt-3 text-sm leading-6", muted)}>{copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="expertise" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal><SectionLabel>Expertise</SectionLabel></Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal delay={0.05}>
              <h2 className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl">A practical toolkit for intelligent work.</h2>
              <div className="mt-10 flex flex-wrap gap-2">
                {Object.keys(categories).map((category) => (
                  <button key={category} onClick={() => setActiveSkill(category)} className={cn("rounded-full border px-4 py-2 text-xs font-medium transition", activeSkill === category ? "border-indigo-500 bg-indigo-500 text-white dark:border-indigo-300 dark:bg-indigo-200 dark:text-indigo-950" : cn(surface, "hover:border-indigo-400"))}>
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12} className={cn("rounded-3xl border p-5 sm:p-7", surface)}>
              <AnimatePresence mode="wait">
                <motion.div key={activeSkill} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {categories[activeSkill].map((skill, index) => (
                    <motion.div key={skill} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }} className={cn("rounded-2xl border p-4", darkMode ? "border-white/[0.08] bg-black/10" : "border-stone-200 bg-white") }>
                      <span className="mb-7 block text-indigo-500 dark:text-indigo-300">{index % 3 === 0 ? <Code2 size={17} /> : index % 3 === 1 ? <BrainCircuit size={17} /> : <Database size={17} />}</span>
                      <p className="text-sm font-medium">{skill}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal><SectionLabel>Selected work</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 className="max-w-2xl text-4xl font-medium tracking-[-0.055em] sm:text-6xl">Projects shaped by logic, empathy, and clean execution.</h2></Reveal>
          <div className="mt-14 space-y-5">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.06}>
                <article className={cn("group grid gap-6 rounded-[2rem] border p-4 transition duration-500 hover:-translate-y-1 md:grid-cols-[.8fr_1.2fr] md:p-5", surface)}>
                  <div className="relative min-h-60 overflow-hidden rounded-[1.45rem] bg-stone-200 dark:bg-white/[0.05]">
                    <img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#101114]/80 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">{project.number}</span>
                  </div>
                  <div className="flex min-h-60 flex-col justify-between py-3 pr-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">{project.type}</p>
                      <h3 className="mt-3 text-2xl font-medium tracking-[-0.045em] sm:text-3xl">{project.title}</h3>
                      <p className={cn("mt-4 max-w-xl text-sm leading-7", muted)}>{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className={cn("rounded-full px-3 py-1 text-[11px]", darkMode ? "bg-white/[0.07] text-stone-300" : "bg-stone-100 text-stone-600")}>{item}</span>)}</div>
                    </div>
                    <div className="mt-8 flex gap-4 text-sm font-medium">
                      <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-200">Code <Github size={15} /></a>
                      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-200">View project <ArrowUpRight size={15} /></a>}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-10 pt-24 sm:px-8">
          <Reveal className={cn("overflow-hidden rounded-[2rem] border p-7 sm:p-12", darkMode ? "border-indigo-300/20 bg-indigo-400/[0.08]" : "border-indigo-200 bg-indigo-50/70")}>
            <SectionLabel>Contact</SectionLabel>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <h2 className="text-4xl font-medium leading-[.98] tracking-[-0.065em] sm:text-7xl">Let’s make something <span className="font-serif font-normal italic text-indigo-600">useful.</span></h2>
              <div className="space-y-4">
                <a href="mailto:sarthakbankar14@gmail.com" className="group flex items-center justify-between border-b border-current/15 pb-4 text-sm font-medium">sarthakbankar14@gmail.com <ArrowUpRight size={17} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
                <div className="flex gap-4 text-sm"><a href="https://github.com/leocoder22" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-indigo-600"><Github size={16} /> GitHub</a><a href="https://www.linkedin.com/in/sarthak-bankar-219758290/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-indigo-600"><Linkedin size={16} /> LinkedIn</a><a href="mailto:sarthakbankar14@gmail.com" className="inline-flex items-center gap-2 hover:text-indigo-600"><Mail size={16} /> Email</a></div>
              </div>
            </div>
          </Reveal>
          <footer className={cn("flex flex-col justify-between gap-2 py-7 text-xs sm:flex-row", muted)}><span>© 2026 Sarthak Bankar</span><span>Designed with focus.</span></footer>
        </section>
      </main>
    </div>
  );
}

export default App;
