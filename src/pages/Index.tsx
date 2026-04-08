import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Database,
  Github,
  Globe,
  Linkedin,
  Mail,
  Moon,
  Rocket,
  Send,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profileImage450Webp from "@/assets/profile-universe-450.webp";
import profileImage900Webp from "@/assets/profile-universe-900.webp";
import profileImage450Jpg from "@/assets/profile-universe-450.jpg";
import profileImage900Jpg from "@/assets/profile-universe-900.jpg";
import projectAurora640Jpg from "@/assets/project-aurora-640.jpg";
import projectAurora960Jpg from "@/assets/project-aurora-960.jpg";
import projectAurora640Webp from "@/assets/project-aurora-640.webp";
import projectAurora960Webp from "@/assets/project-aurora-960.webp";
import projectNebula640Jpg from "@/assets/project-nebula-640.jpg";
import projectNebula960Jpg from "@/assets/project-nebula-960.jpg";
import projectNebula640Webp from "@/assets/project-nebula-640.webp";
import projectNebula960Webp from "@/assets/project-nebula-960.webp";
import projectOrbit640Jpg from "@/assets/project-orbit-640.jpg";
import projectOrbit960Jpg from "@/assets/project-orbit-960.jpg";
import projectOrbit640Webp from "@/assets/project-orbit-640.webp";
import projectOrbit960Webp from "@/assets/project-orbit-960.webp";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const timeline = [
  {
    role: "Java Backend Developer Intern",
    company: "JSpiders Training & Development Center, Bengaluru",
    date: "Aug 2025 — Jan 2026",
    points: [
      "Architected and delivered RESTful APIs using Spring Boot and Hibernate, supporting real-world data workflows.",
      "Enforced Role-Based Access Control (RBAC) for 2 distinct user roles (Admin and User), eliminating unauthorized endpoint access.",
      "Streamlined SQL query performance and relational schema design through normalization, reducing data redundancy and improving retrieval efficiency for high-frequency operations.",
    ],
  },
  {
    role: "Backend Systems Developer",
    company: "Academic & Personal Projects",
    date: "2024 — 2025",
    points: [
      "Engineered end-to-end e-commerce, online banking, hospital, and enrollment backend systems.",
      "Implemented transaction management and role-based authorization for secure, reliable API workflows.",
      "Designed optimized relational schemas with joins and indexing for complex entity operations.",
    ],
  },
  {
    role: "B.Tech in Information Technology",
    company: "Balasore College of Engineering and Technology",
    date: "2021 — 2025",
    points: [
      "Graduated with CGPA 8.28 / 10.",
      "Completed Java Full Stack Development (Backend Focus) at QSpiders, Marathahalli, Bengaluru.",
      "Built strong fundamentals in Java, Spring ecosystem, SQL, and production-grade API design.",
    ],
  },
];

const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    items: ["Java (OOP, Collections, Exception Handling)", "Java 8 (Streams, Lambdas)", "SQL", "HTML", "CSS", "JavaScript"],
  },
  {
    label: "Frameworks",
    icon: Briefcase,
    items: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate"],
  },
  {
    label: "API & Architecture",
    icon: Database,
    items: ["REST API Design", "DTO Pattern", "Pagination & Sorting", "Input Validation", "Layered Architecture", "Dependency Injection", "Transaction Management", "RBAC"],
  },
  {
    label: "Tools & Database",
    icon: Wrench,
    items: ["MySQL", "CRUD", "Joins", "Subqueries", "Indexing", "Schema Normalization", "Maven", "Git", "Postman", "Eclipse IDE"],
  },
];

const projects = [
  {
    title: "E-Commerce Order Management System",
    description: "Built 15+ RESTful API endpoints covering user authentication, product catalog, cart, and order management, enabling complete end-to-end e-commerce workflows.",
    images: {
      webp: { sm: projectNebula640Webp, lg: projectNebula960Webp },
      jpg: { sm: projectNebula640Jpg, lg: projectNebula960Jpg },
    },
    stack: ["Spring Boot", "Spring Data JPA", "Hibernate", "SQL"],
    live: "#",
    github: "#",
  },
  {
    title: "Online Banking & Transaction Management System",
    description: "Built REST APIs for account management, fund transfer, and transaction history with role-based authorization and an enhanced SQL schema for high-frequency queries.",
    images: {
      webp: { sm: projectAurora640Webp, lg: projectAurora960Webp },
      jpg: { sm: projectAurora640Jpg, lg: projectAurora960Jpg },
    },
    stack: ["Spring Boot", "Spring Data JPA", "Hibernate", "SQL"],
    live: "#",
    github: "#",
  },
  {
    title: "Hospital Management System",
    description: "Developed RESTful APIs for doctor registration, patient records, and appointment scheduling with optimized normalized relational schema.",
    images: {
      webp: { sm: projectOrbit640Webp, lg: projectOrbit960Webp },
      jpg: { sm: projectOrbit640Jpg, lg: projectOrbit960Jpg },
    },
    stack: ["Spring Boot", "Spring Data JPA", "Hibernate", "SQL"],
    live: "#",
    github: "#",
  },
];

const counters = [
  { value: 6, suffix: " month", label: "Experience" },
  { value: 4, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "REST APIs Built" },
];

const rotatingPhrases = ["Java Backend Developer", "Spring Boot API Engineer", "SQL Optimization Enthusiast"];
const promptLabels = ["cmd", "powershell", "bash"];
const terminalSnippetLines = [
  "const developer = {",
  '  name: "Subhashree Sahu",',
  '  role: "Java Full Stack Developer",',
  '  focus: "Spring Boot + React",',
  '  skills: ["Spring Boot", "Hibernate", "SQL", "React"],',
  '  motto: "Build secure APIs, ship clean UI.",',
  "  passionate: true",
  "};",
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const revealLeft = {
  hidden: { opacity: 0, x: -36, y: 18 },
  visible: { opacity: 1, x: 0, y: 0 },
};

const revealRight = {
  hidden: { opacity: 0, x: 36, y: 18 },
  visible: { opacity: 1, x: 0, y: 0 },
};

const StatCounter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 40;
    let currentStep = 0;
    const timer = window.setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      setCount(Math.round(progress * value));

      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, duration / steps);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-panel rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-cosmic md:text-3xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const TypewriterText = ({
  text,
  reducedMotion,
  speed = 26,
  startDelay = 0,
  className,
}: {
  text: string;
  reducedMotion: boolean;
  speed?: number;
  startDelay?: number;
  className?: string;
}) => {
  const [output, setOutput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = textRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!isVisible || reducedMotion) {
      setOutput(reducedMotion ? text : "");
      return;
    }

    let charIndex = 0;
    let timer: number | null = null;

    const typeNext = () => {
      setOutput(text.slice(0, charIndex));
      if (charIndex >= text.length) return;
      charIndex += 1;
      timer = window.setTimeout(typeNext, speed);
    };

    timer = window.setTimeout(typeNext, startDelay);

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isVisible, reducedMotion, speed, startDelay, text]);

  return (
    <span ref={textRef} className={className}>
      {output}
    </span>
  );
};

const Index = () => {
  const [activePhrase, setActivePhrase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeletingText, setIsDeletingText] = useState(false);
  const [mailData, setMailData] = useState({ name: "", email: "", message: "" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme !== "light";
  const themeFadeTimer = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    document.title = "Full Stack Developer Portfolio | Digital Universe";
    const description = "Animated premium portfolio for a Full Stack Developer specializing in TypeScript, React, Next.js, and AI automation.";
    const existing = document.querySelector('meta[name="description"]');
    if (existing) {
      existing.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActivePhrase(0);
      setTypedText(rotatingPhrases[0]);
      setIsDeletingText(false);
      return;
    }

    const currentPhrase = rotatingPhrases[activePhrase];

    if (!isDeletingText && typedText === currentPhrase) {
      const pauseTimer = window.setTimeout(() => setIsDeletingText(true), 1300);
      return () => window.clearTimeout(pauseTimer);
    }

    if (isDeletingText && typedText === "") {
      setIsDeletingText(false);
      setActivePhrase((prev) => (prev + 1) % rotatingPhrases.length);
      return;
    }

    const nextText = isDeletingText
      ? currentPhrase.slice(0, Math.max(typedText.length - 1, 0))
      : currentPhrase.slice(0, typedText.length + 1);

    const stepTimer = window.setTimeout(
      () => setTypedText(nextText),
      isDeletingText ? 40 : 85,
    );

    return () => window.clearTimeout(stepTimer);
  }, [activePhrase, isDeletingText, prefersReducedMotion, typedText]);

  useEffect(
    () => () => {
      if (themeFadeTimer.current) {
        window.clearTimeout(themeFadeTimer.current);
      }
    },
    [],
  );

  const subject = useMemo(() => `Portfolio inquiry from ${mailData.name || "Visitor"}`, [mailData.name]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mailTo = `mailto:sahusubhashree045@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${mailData.name}\nEmail: ${mailData.email}\n\n${mailData.message}`,
    )}`;
    window.location.href = mailTo;
  };

  const handleThemeToggle = () => {
    if (prefersReducedMotion) {
      setTheme(isDarkMode ? "light" : "dark");
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-fade");
    setTheme(isDarkMode ? "light" : "dark");

    if (themeFadeTimer.current) {
      window.clearTimeout(themeFadeTimer.current);
    }

    themeFadeTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-fade");
    }, 420);
  };

  return (
    <div className="relative overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border/15 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8">
          <a href="#" className="text-sm font-semibold uppercase tracking-[0.2em] text-cosmic story-link">
            SS
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleThemeToggle}
              className="border-glass-border/25 bg-surface/60 hover:bg-surface-alt"
              aria-label="Toggle color mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90">
              <a href="#contact">Let's Collaborate</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="cosmic-grid relative min-h-screen pt-28">
          <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <Badge className="mb-5 border border-glass-border/20 bg-surface/70 text-brand">Welcome to my Universe</Badge>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                <TypewriterText text="Java Full Stack Developer" reducedMotion={prefersReducedMotion} speed={46} />
              </h1>
              <p className="mono-code mt-4 flex min-h-8 items-center gap-2 text-base text-muted-foreground md:text-lg">
                <span className="rounded border border-glass-border/35 bg-surface/70 px-2 py-0.5 text-xs uppercase tracking-[0.14em] text-brand">
                  {promptLabels[activePhrase % promptLabels.length]}
                </span>
                <span className="text-brand">&gt;</span>
                <span>{typedText}</span>
                <span className={`${prefersReducedMotion ? "" : "animate-blink"} text-brand`}>|</span>
              </p>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Result-oriented Java Backend Developer with hands-on internship experience building RESTful APIs using Spring Boot and Hibernate.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <motion.a
                  href="https://github.com/subhashree045"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel hover-scale rounded-xl p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/subhashree-sahu"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel hover-scale rounded-xl p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: 2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="mailto:sahusubhashree045@gmail.com"
                  className="glass-panel hover-scale rounded-xl p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -1.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-brand text-brand-foreground shadow-[0_0_30px_hsl(var(--brand)/0.35)] hover:bg-brand/90">
                  <a href="#contact">Let's Collaborate</a>
                </Button>
                <Button asChild variant="outline" className="border-glass-border/25 bg-surface/60 hover:bg-surface-alt">
                  <a href="https://example.com/resume.pdf" target="_blank" rel="noreferrer">
                    Get Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mono-code animate-float rounded-3xl border border-glass-border/30 bg-background/95 p-5 text-sm shadow-[0_20px_60px_-35px_hsl(var(--foreground)/0.55)]"
            >
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded border border-glass-border/40 bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-brand">
                  termux
                </span>
                <span className="ml-2">
                  <TypewriterText text="developer.ts" reducedMotion={prefersReducedMotion} speed={28} />
                </span>
              </div>
              <pre className="overflow-x-auto text-brand">
{terminalSnippetLines.map((line, index) => (
                <div key={`${line}-${index}`} className="leading-7">
                  <span className="mr-2 text-muted-foreground">$</span>
                  <TypewriterText
                    text={line}
                    reducedMotion={prefersReducedMotion}
                    speed={16}
                    startDelay={index * 260}
                    className="text-surface-foreground"
                  />
                </div>
              ))}
              </pre>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-shell">
          <span className="section-label">
            <TypewriterText text="Discovery" reducedMotion={prefersReducedMotion} speed={30} />
          </span>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-bold md:text-4xl">
                <TypewriterText text="Engineering products where performance meets imagination." reducedMotion={prefersReducedMotion} speed={18} />
              </h2>
              <p className="mt-5 text-muted-foreground">
                I specialize in Java, SQL, and Spring ecosystem technologies with proficiency in layered architecture, role-based access control, and transaction management.
                Seeking a backend engineering role to deliver scalable, production-ready systems.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {counters.map((counter, index) => (
                  <motion.div
                    key={counter.label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    <StatCounter {...counter} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel overflow-hidden rounded-2xl"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${profileImage450Webp} 450w, ${profileImage900Webp} 900w`}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 420px"
                />
                <img
                  src={profileImage900Jpg}
                  srcSet={`${profileImage450Jpg} 450w, ${profileImage900Jpg} 900w`}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 420px"
                  alt="Subhashree Sahu professional portrait"
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="h-full w-full object-cover"
                />
              </picture>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="section-shell">
          <span className="section-label">
            <TypewriterText text="Professional Journey" reducedMotion={prefersReducedMotion} speed={28} />
          </span>
          <div className="relative mt-6 space-y-8 before:absolute before:left-[0.55rem] before:top-2 before:h-[94%] before:w-px before:bg-border sm:before:left-[0.7rem]">
            {timeline.map((item, index) => (
              <motion.article
                key={item.role}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView={prefersReducedMotion ? {} : "visible"}
                viewport={{ once: true }}
                variants={index % 2 === 0 ? revealLeft : revealRight}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-brand shadow-[0_0_18px_hsl(var(--glow)/0.7)]" />
                <div className="glass-panel rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{item.date}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                  <p className="text-sm text-cosmic">{item.company}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell">
          <span className="section-label">
            <TypewriterText text="Inventory" reducedMotion={prefersReducedMotion} speed={30} />
          </span>
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26, x: idx % 2 === 0 ? -20 : 20, scale: 0.98 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel hover-scale rounded-2xl p-5"
              >
                <div className="mb-4 flex items-center gap-2">
                  <group.icon className="h-5 w-5 text-brand" />
                  <h3 className="font-semibold">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-surface-alt text-surface-alt-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell">
          <span className="section-label">
            <TypewriterText text="Featured Creations" reducedMotion={prefersReducedMotion} speed={26} />
          </span>
          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="glass-panel group hover-scale overflow-hidden rounded-2xl"
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${project.images.webp.sm} 640w, ${project.images.webp.lg} 960w`}
                    sizes="(max-width: 1024px) 92vw, 30vw"
                  />
                  <img
                    src={project.images.jpg.lg}
                    srcSet={`${project.images.jpg.sm} 640w, ${project.images.jpg.lg} 960w`}
                    sizes="(max-width: 1024px) 92vw, 30vw"
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    width={960}
                    height={675}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </picture>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-surface-alt text-surface-alt-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4 text-sm">
                    <a href={project.live} className="inline-flex items-center gap-1 text-brand transition-colors hover:text-brand-alt">
                      <Globe className="h-4 w-4" /> Live Demo
                    </a>
                    <a href={project.github} className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-alt">
              Explore Full Archive <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="contact" className="section-shell">
          <span className="section-label">
            <TypewriterText text="Communication" reducedMotion={prefersReducedMotion} speed={28} />
          </span>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold">
                <TypewriterText text="Let's Connect" reducedMotion={prefersReducedMotion} speed={34} />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Tell me about your product goals and timeline.</p>
              <div className="mt-5 space-y-4">
                <Input
                  required
                  placeholder="Name"
                  value={mailData.name}
                  onChange={(event) => setMailData((prev) => ({ ...prev, name: event.target.value }))}
                  className="border-glass-border/20 bg-surface"
                />
                <Input
                  required
                  type="email"
                  placeholder="Email"
                  value={mailData.email}
                  onChange={(event) => setMailData((prev) => ({ ...prev, email: event.target.value }))}
                  className="border-glass-border/20 bg-surface"
                />
                <Textarea
                  required
                  placeholder="Message"
                  rows={6}
                  value={mailData.message}
                  onChange={(event) => setMailData((prev) => ({ ...prev, message: event.target.value }))}
                  className="border-glass-border/20 bg-surface"
                />
              </div>
              <Button type="submit" className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold">
                <TypewriterText text="Signal Channels" reducedMotion={prefersReducedMotion} speed={34} />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Open for freelance, full-time, and product collaborations.</p>
              <div className="mt-6 space-y-4 text-sm">
                <a href="mailto:sahusubhashree045@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4 text-brand" /> sahusubhashree045@gmail.com
                </a>
                <a href="https://linkedin.com/in/subhashree-sahu" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-4 w-4 text-brand" /> LinkedIn Profile
                </a>
                <a href="https://github.com/subhashree045" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Github className="h-4 w-4 text-brand" /> GitHub Repositories
                </a>
                <a href="tel:+919040270454" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4 text-brand" /> +91 9040270454
                </a>
              </div>
              <div className="mt-8 rounded-xl border border-glass-border/20 bg-surface/60 p-4">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cosmic">
                  <Rocket className="h-3.5 w-3.5" /> Current Focus
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Building high-performance Java backend systems with secure APIs and clean architecture.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-glass-border/15 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
             <p className="text-lg font-semibold text-cosmic">
               <TypewriterText text="Dev Universe" reducedMotion={prefersReducedMotion} speed={34} />
             </p>
            <p className="text-sm text-muted-foreground">Designing scalable backend software for tomorrow's internet.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} • Made with ❤️ in Bengaluru</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
