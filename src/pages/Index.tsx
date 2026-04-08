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
  Menu,
  Moon,
  Rocket,
  Send,
  Sparkles,
  Sun,
  Wrench,
  X,
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
  { label: "Architecture", href: "#architecture" },
  { label: "Contact", href: "#contact" },
];

const timeline = [
  {
    role: "Java Backend Engineer Intern",
    company: "JSpiders Training & Development Center, Bengaluru",
    date: "Aug 2025 — Jan 2026",
    points: [
      "Architected and deployed enterprise-grade RESTful APIs using Spring Boot 3.x and Hibernate, handling complex data orchestration for 10k+ simulated daily requests.",
      "Implemented robust security protocols including Role-Based Access Control (RBAC) and JWT authentication, ensuring 100% endpoint isolation across administrative and client roles.",
      "Optimized SQL query performance by 40% through advanced indexing strategies and schema normalization (3NF), significantly reducing database I/O latency.",
      "Collaborated on the transition from monolithic to modular architecture, improving code maintainability and deployment speed."
    ],
  },
  {
    role: "Full Stack Developer (Academic)",
    company: "Engineering Capstone Projects",
    date: "2024 — 2025",
    points: [
      "Engineered a distributed e-commerce backend with Spring Boot, managing transactional integrity across inventory and order services.",
      "Designed and implemented a Hospital Management System with multi-entity relational schemas, focusing on data consistency and high availability.",
      "Developed a secure Online Banking prototype with ACID-compliant transaction management and comprehensive auditing logs.",
    ],
  },
  {
    role: "B.Tech in Information Technology",
    company: "Balasore College of Engineering and Technology",
    date: "2021 — 2025",
    points: [
      "Graduated with a strong academic standing (CGPA 8.28 / 10), specializing in Distributed Systems and Database Management.",
      "Completed intensive Java Full Stack specialization at QSpiders, mastering the Spring ecosystem and production-grade API design.",
      "Actively participated in technical hackathons, focusing on backend scalability and algorithmic problem-solving.",
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
    title: "Enterprise E-Commerce Engine",
    problem: "Small businesses struggle with inventory synchronization and secure checkout workflows in high-traffic environments.",
    solution: "Developed a Spring Boot micro-services ready backend with centralized inventory tracking, secure JWT-based checkout, and automated email notifications.",
    description: "Built 20+ specialized RESTful API endpoints. Implemented concurrent order handling using Spring Transactional management and optimized search with SQL indexing.",
    images: {
      webp: { sm: projectNebula640Webp, lg: projectNebula960Webp },
      jpg: { sm: projectNebula640Jpg, lg: projectNebula960Jpg },
    },
    stack: ["Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "JWT"],
    live: "#",
    github: "#",
  },
  {
    title: "Secure FinTech API Gateway",
    problem: "Financial applications require strict ACID compliance and multi-level authorization to prevent fraudulent transactions.",
    solution: "Engineered a robust banking API featuring double-entry bookkeeping logic, RBAC, and real-time transaction auditing.",
    description: "Managed high-frequency ledger updates with 99.9% data consistency. Integrated custom exception handling and global validation filters for sanitizing inputs.",
    images: {
      webp: { sm: projectAurora640Webp, lg: projectAurora960Webp },
      jpg: { sm: projectAurora640Jpg, lg: projectAurora960Jpg },
    },
    stack: ["Java 17", "Spring Boot", "Hibernate", "MySQL", "Spring Security"],
    live: "#",
    github: "#",
  },
  {
    title: "HealthCare Data Orchestrator",
    problem: "Hospitals face data silos between departments, leading to inefficient patient scheduling and record management.",
    solution: "Designed a normalized relational schema with complex entity mapping (One-to-Many, Many-to-Many) to unify doctor, patient, and lab data.",
    description: "Developed a comprehensive scheduling engine that prevents double-booking and automates record retrieval using Spring Data JPA specifications.",
    images: {
      webp: { sm: projectOrbit640Webp, lg: projectOrbit960Webp },
      jpg: { sm: projectOrbit640Jpg, lg: projectOrbit960Jpg },
    },
    stack: ["Spring Boot", "Spring MVC", "Hibernate", "PostgreSQL"],
    live: "#",
    github: "#",
  },
];

const counters = [
  { value: 200, suffix: "k+", label: "Lines of Code" },
  { value: 12, suffix: " / 10", label: "Clean Code Focus" }, // This is a bit weird, let's change
  { value: 50, suffix: "+", label: "REST Endpoints" },
  { value: 6, suffix: "+", label: "Core Modules" },
];

const realisticCounters = [
  { value: 50, suffix: "+", label: "REST Endpoints" },
  { value: 3, suffix: "+", label: "Full-Scale Systems" },
  { value: 100, suffix: "%", label: "API Uptime Focus" },
];

const rotatingPhrases = [
  "Backend Systems Engineer",
  "Spring Boot & Microservices Specialist",
  "SQL Performance & Schema Architect",
  "Full Stack Java Developer",
];
const promptLabels = ["maven", "gradle", "bash"];
const terminalSnippetLines = [
  "@Service",
  "public class BackendEngineer {",
  '  private String focus = "Scalable Architecture";',
  '  private List<String> stack = List.of("Spring Boot", "Hibernate", "MySQL");',
  "",
  "  @Transactional",
  "  public void buildFuture() {",
  '    System.out.println("Building secure and performant APIs.");',
  "  }",
  "}",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mailData, setMailData] = useState({ name: "", email: "", message: "" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme !== "light";
  const themeFadeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 1;
      const prog = document.getElementById("scroll-progress");
      if (prog) prog.style.transform = `scaleX(${scrolled})`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="fixed top-0 left-0 right-0 h-1 bg-brand/30 z-[100] origin-left scale-x-0" id="scroll-progress" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border/15 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8">
          <a href="#" className="text-xl font-bold uppercase tracking-[0.3em] text-cosmic story-link hover:scale-105 transition-transform duration-300">
            Subh.
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-muted-foreground tracking-wide transition-all hover:text-brand hover:scale-110 active:scale-95"
                whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
              className="border-glass-border/25 bg-surface/60 hover:bg-surface-alt rounded-full h-10 w-10 flex items-center justify-center p-0"
              aria-label="Toggle color mode"
            >
              <div className="flex items-center justify-center">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </div>
            </Button>
            <Button asChild size="lg" className="hidden sm:flex bg-brand text-brand-foreground hover:bg-brand/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand/25 px-6 font-bold text-base tracking-tight rounded-full">
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        </div>

      </header>

      {/* Modern Floating Bottom Nav for Mobile Reachability */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] w-full max-w-[92vw] sm:max-w-sm md:hidden">
        <div className="glass-panel border-glass-border/20 bg-background/60 backdrop-blur-3xl rounded-full p-1.5 flex items-center justify-around shadow-2xl shadow-black/60">
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1 p-1.5 text-muted-foreground hover:text-brand active:scale-90 transition-all font-bold"
            >
              <span className="text-[8px] uppercase tracking-tighter">{link.label}</span>
            </a>
          ))}
          <div className="h-6 w-px bg-glass-border/20 mx-1" />
          <a
            href="#contact"
            className="flex items-center justify-center h-9 w-9 rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/20 active:scale-90 transition-all"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>

      <main>
        <section className="cosmic-grid relative min-h-screen pt-28">
          <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }} className="text-center lg:text-left px-2 sm:px-0">
              <Badge className="mb-5 border border-glass-border/20 bg-surface/70 text-brand">Welcome to my Universe</Badge>
              <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl md:text-6xl lg:text-7xl tracking-tighter">
                <TypewriterText text="Backend Systems Engineer" reducedMotion={prefersReducedMotion} speed={46} />
              </h1>
              <p className="mono-code mt-4 flex min-h-8 items-center justify-center lg:justify-start gap-2 text-sm sm:text-base text-muted-foreground md:text-lg">
                <span className="rounded border border-glass-border/35 bg-surface/70 px-2 py-0.5 text-xs uppercase tracking-[0.14em] text-brand">
                  {promptLabels[activePhrase % promptLabels.length]}
                </span>
                <span className="text-brand">&gt;</span>
                <span>{typedText}</span>
                <span className={`${prefersReducedMotion ? "" : "animate-blink"} text-brand`}>|</span>
              </p>
              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-muted-foreground text-base sm:text-lg leading-relaxed">
                Specializing in <span className="text-foreground font-semibold">Spring Boot</span>, <span className="text-foreground font-semibold">Microservices</span>, and <span className="text-foreground font-semibold">High-Performance SQL</span>. I build secure, scalable backend architectures that power modern enterprise applications.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <motion.a
                  href="https://github.com/subhashree0454"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel hover-scale rounded-xl p-2.5 sm:p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/subhashreesahu705026287/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel hover-scale rounded-xl p-2.5 sm:p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: 2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="mailto:sahusubhashree045@gmail.com"
                  className="glass-panel hover-scale rounded-xl p-2.5 sm:p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -1.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="bg-brand text-brand-foreground shadow-2xl shadow-brand/35 hover:bg-brand/90 transition-all hover:scale-105 rounded-full px-8 font-bold">
                  <a href="#contact">Build My Project <ArrowUpRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-glass-border/25 bg-surface/60 hover:bg-surface-alt backdrop-blur-sm rounded-full px-8 font-semibold">
                  <a href="https://drive.google.com/file/d/1GQjN9FAbbJsH6SQi0DXZRl21gj46oFes/view?usp=sharing" target="_blank" rel="noreferrer">
                    Download Resume
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
              <pre className="overflow-x-auto text-brand custom-scrollbar">
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
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                <TypewriterText text="Engineering products where performance meets imagination." reducedMotion={prefersReducedMotion} speed={18} />
              </h2>
              <p className="mt-5 text-muted-foreground mx-auto lg:mx-0 max-w-2xl">
                I specialize in Java, SQL, and Spring ecosystem technologies with proficiency in layered architecture, role-based access control, and transaction management.
                Seeking a backend engineering role to deliver scalable, production-ready systems.
              </p>
              <div className="mt-8 grid gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
                {realisticCounters.map((counter, index) => (
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

        <section id="skills" className="section-shell relative overflow-hidden">
          <div className="absolute -right-24 top-0 h-64 w-64 bg-brand/10 blur-[120px] pointer-events-none" />
          <span className="section-label">
            <TypewriterText text="Technical Arsenal" reducedMotion={prefersReducedMotion} speed={30} />
          </span>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 px-1 sm:px-0">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel hover-scale group rounded-2xl p-6 border-brand/10 hover:border-brand/30"
              >
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-2xl bg-brand/10 p-3 text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
                    <group.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{group.label}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-surface-alt/50 text-xs font-medium hover:bg-brand/20 hover:text-brand transition-colors">
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
          <div className="mt-4 grid gap-6 sm:gap-8 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel group flex flex-col hover-scale overflow-hidden rounded-3xl border-brand/5 hover:border-brand/20 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
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
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} className="bg-brand/20 text-brand border-none backdrop-blur-md text-[10px] uppercase font-bold py-0.5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-brand font-bold mb-1">The Challenge</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-brand font-bold mb-1">The Solution</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-brand font-bold mb-1">Key Impact</h4>
                      <p className="text-sm text-foreground/90 leading-relaxed italic">{project.description}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-glass-border/10">
                    <div className="flex items-center gap-3">
                      <a href={project.live} className="p-2 rounded-full bg-surface-alt hover:bg-brand hover:text-brand-foreground transition-all duration-300" title="Live Preview">
                        <Globe className="h-4 w-4" />
                      </a>
                      <a href={project.github} className="p-2 rounded-full bg-surface-alt hover:bg-brand hover:text-brand-foreground transition-all duration-300" title="Source Code">
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs font-bold hover:bg-brand/5 text-brand group/btn">
                      Case Study <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="architecture" className="section-shell relative">
          <div className="absolute left-0 top-1/2 -z-10 h-64 w-64 bg-brand/5 blur-[100px] pointer-events-none" />
          <span className="section-label">
            <TypewriterText text="Deep Dive" reducedMotion={prefersReducedMotion} speed={28} />
          </span>
          <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 lg:opacity-10 pointer-events-none">
              <Database className="h-40 w-40 lg:h-64 lg:w-64 text-brand" />
            </div>
            
            <div className="max-w-3xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Architectural Thinking: Scaling the E-Commerce Engine</h2>
              <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
                Beyond just writing code, I focus on system reliability and data integrity. Here's how I approached the backend architecture for my enterprise e-commerce project:
              </p>
              
              <div className="grid gap-8 md:grid-cols-2 text-left">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Concurrency & Transactions</h4>
                      <p className="text-sm text-muted-foreground">Used Spring's @Transactional with Isolation levels to prevent race conditions during high-volume flash sales.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Service Layer Pattern</h4>
                      <p className="text-sm text-muted-foreground">Implemented a strict layered architecture to decouple business logic from API controllers and data access.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Database Optimization</h4>
                      <p className="text-sm text-muted-foreground">Applied 3rd Normal Form (3NF) to ensure data consistency and utilized B-Tree indexing for sub-second query execution.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Security-First Design</h4>
                      <p className="text-sm text-muted-foreground">Integrated Spring Security with JWT for stateless authentication and RBAC for granular resource protection.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 rounded-2xl bg-surface-alt/50 border border-glass-border/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand mb-4">Core Principles</h4>
                <div className="flex flex-wrap gap-4">
                  {["SOLID Principles", "DRY Code", "RESTful Maturity", "TDD Mindset", "Clean Architecture"].map(p => (
                    <div key={p} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                      <Sparkles className="h-3 w-3 text-brand" /> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                <a href="mailto:sahusubhashree045@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-glass-border/5 bg-surface/50 hover:bg-surface-alt transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">Email</p>
                    <p className="font-semibold text-foreground">sahusubhashree045@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/subhashreesahu705026287/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-glass-border/5 bg-surface/50 hover:bg-surface-alt transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">LinkedIn</p>
                    <p className="font-semibold text-foreground">subhashreesahu705026287</p>
                  </div>
                </a>
                <a href="https://github.com/subhashree0454" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-glass-border/5 bg-surface/50 hover:bg-surface-alt transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold">GitHub</p>
                    <p className="font-semibold text-foreground">subhashree0454</p>
                  </div>
                </a>
              </div>
              <div className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
                  <Rocket className="h-24 w-24" />
                </div>
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-brand font-bold mb-3">
                  <Sparkles className="h-3.5 w-3.5" /> Open to Opportunities
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  I'm currently seeking <span className="font-bold">Software Engineer / Java Backend</span> roles where I can contribute to complex systems and grow with a world-class engineering team.
                </p>
                <Button asChild className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  <a href="https://drive.google.com/file/d/1GQjN9FAbbJsH6SQi0DXZRl21gj46oFes/view?usp=sharing" target="_blank" rel="noreferrer">Download Resume</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-glass-border/15 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom)+5rem)] md:pb-10">
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
