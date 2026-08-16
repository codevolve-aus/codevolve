// Seed fixtures for the tracks/modules/lessons/mentors/testimonials tables — read only by
// src/db/seed.ts. This is the same placeholder content the site launched with; edit it here
// (then re-run `npm run db:seed`) or edit the live content from /admin instead.
import type { EvolutionStage } from "@/lib/evolution";

export interface SeedLesson {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  xp: number;
  content: string;
}

export interface SeedModule {
  slug: string;
  title: string;
  summary: string;
  stage: EvolutionStage;
  lessons: SeedLesson[];
}

export interface SeedTrack {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  level: string;
  durationWeeks: number;
  gradient: string;
  icon: string;
  comingSoon?: boolean;
  outcomes: string[];
  modules: SeedModule[];
}

export const SEED_TRACKS: SeedTrack[] = [
  {
    slug: "full-stack-web",
    title: "Full-Stack Web Development",
    tagline: "Ship real web apps — frontend, backend, and everything between.",
    description:
      "The flagship track. You'll go from your first `<div>` to shipping a deployed, database-backed web app that you can point employers to — build alongside school or college, at a few hours a week.",
    category: "Software Engineering",
    level: "Beginner",
    durationWeeks: 16,
    gradient: "from-violet-500 to-cyan-400",
    icon: "code-2",
    outcomes: [
      "Build responsive UIs with HTML, CSS, and modern JavaScript",
      "Build and consume REST APIs with Node.js",
      "Model and query a real database",
      "Deploy a production app and keep it running",
      "Ship a portfolio project you built end-to-end",
    ],
    modules: [
      {
        slug: "foundations",
        title: "Foundations",
        summary: "How the web actually works, and your first working page.",
        stage: "init",
        lessons: [
          {
            slug: "how-the-web-works",
            title: "How the Web Works",
            summary: "Clients, servers, requests, and what happens when you hit Enter on a URL.",
            minutes: 20,
            xp: 20,
            content: `Every time you load a website, your browser sends a **request** across the internet to a **server**, which sends back a **response** — usually HTML, CSS, and JavaScript.

- The browser is the *client*.
- DNS turns \`codevolve.com.au\` into an IP address.
- HTTP is the protocol client and server speak to each other.

By the end of this track, you'll be running your own server and answering those requests yourself.`,
          },
          {
            slug: "html-css-basics",
            title: "HTML & CSS Basics",
            summary: "Structure a page with HTML, then style it with CSS.",
            minutes: 35,
            xp: 25,
            content: `HTML gives a page **structure** — headings, paragraphs, images, links. CSS gives it **style** — color, spacing, layout.

\`\`\`html
<h1>Hello, CodeVolve</h1>
<p class="tagline">init → commit → merge → deploy</p>
\`\`\`

\`\`\`css
.tagline { color: #8b6bff; font-family: monospace; }
\`\`\`

**Exercise:** build a single-page profile card with your name, a tagline, and a photo placeholder.`,
          },
          {
            slug: "javascript-fundamentals",
            title: "JavaScript Fundamentals",
            summary: "Variables, functions, and making a page respond to clicks.",
            minutes: 40,
            xp: 25,
            content: `JavaScript is what makes a page *interactive*. Variables hold data, functions do work, and event listeners react to what the user does.

\`\`\`js
const button = document.querySelector("#evolve");
button.addEventListener("click", () => {
  button.textContent = "Evolved ✔";
});
\`\`\`

**Exercise:** make your profile card's "Evolve" button change the page's theme color on click.`,
          },
        ],
      },
      {
        slug: "frontend-with-react",
        title: "Frontend with React",
        summary: "Componentize your UI and manage real state.",
        stage: "commit",
        lessons: [
          {
            slug: "components-and-props",
            title: "Components & Props",
            summary: "Break a UI into reusable, composable pieces.",
            minutes: 30,
            xp: 30,
            content: `A React **component** is a function that returns UI. **Props** are how you pass data into it.

\`\`\`jsx
function TrackCard({ title, level }) {
  return <div className="card"><h3>{title}</h3><span>{level}</span></div>;
}
\`\`\`

**Exercise:** turn your profile card into a \`ProfileCard\` component that accepts \`name\` and \`tagline\` as props.`,
          },
          {
            slug: "state-and-events",
            title: "State & Events",
            summary: "Give your components memory with useState.",
            minutes: 35,
            xp: 30,
            content: `**State** is data a component remembers between renders. \`useState\` is the hook that gives you a piece of it.

\`\`\`jsx
const [xp, setXp] = useState(0);
<button onClick={() => setXp(xp + 10)}>Complete lesson (+10 XP)</button>
\`\`\`

**Exercise:** build a tiny XP tracker component with a button that increments a counter on screen.`,
          },
          {
            slug: "fetching-data",
            title: "Fetching Data",
            summary: "Pull real data into your UI from an API.",
            minutes: 35,
            xp: 30,
            content: `Most real apps don't hardcode their data — they fetch it.

\`\`\`jsx
useEffect(() => {
  fetch("/api/tracks").then(r => r.json()).then(setTracks);
}, []);
\`\`\`

**Exercise:** render a list of track cards fetched from a mock JSON endpoint.`,
          },
        ],
      },
      {
        slug: "backend-and-data",
        title: "Backend & Data",
        summary: "Build the API and database behind your app.",
        stage: "merge",
        lessons: [
          {
            slug: "building-an-api",
            title: "Building an API",
            summary: "Write server routes that your frontend can call.",
            minutes: 40,
            xp: 35,
            content: `An API is a set of URLs your server understands. You'll build routes that return data as JSON.

\`\`\`js
app.get("/api/lessons/:id/complete", (req, res) => {
  markComplete(req.params.id);
  res.json({ ok: true });
});
\`\`\`

**Exercise:** build a "mark lesson complete" endpoint and call it from your frontend.`,
          },
          {
            slug: "databases-101",
            title: "Databases 101",
            summary: "Model your data and write your first real queries.",
            minutes: 45,
            xp: 35,
            content: `A database stores data that survives a server restart. You'll define **tables**, **columns**, and **relationships**.

\`\`\`sql
select title, xp from lessons where completed = true;
\`\`\`

**Exercise:** design a schema for tracking which lessons a student has completed.`,
          },
          {
            slug: "auth-basics",
            title: "Auth Basics",
            summary: "Let users sign up, sign in, and own their own data.",
            minutes: 40,
            xp: 35,
            content: `Authentication answers "who is this?" — authorization answers "what are they allowed to do?"

You'll wire up a real auth provider so every student has their own account, session, and saved progress — the same pattern production apps use.

**Exercise:** protect a route so it only renders for a signed-in user.`,
          },
        ],
      },
      {
        slug: "ship-it",
        title: "Ship It",
        summary: "Deploy your project and make it real.",
        stage: "deploy",
        lessons: [
          {
            slug: "git-and-github",
            title: "Git & GitHub",
            summary: "Version control — the industry-standard workflow.",
            minutes: 30,
            xp: 40,
            content: `Every engineering team uses version control. You'll learn the exact commands behind CodeVolve's own evolution metaphor.

\`\`\`bash
git init
git add .
git commit -m "feat: add xp tracker"
git push origin main
\`\`\`

**Exercise:** push your project to a public GitHub repo with a clear README.`,
          },
          {
            slug: "deploying-your-app",
            title: "Deploying Your App",
            summary: "Take your project from localhost to a live URL.",
            minutes: 35,
            xp: 40,
            content: `A project only counts once someone else can open it in a browser. You'll deploy your full-stack app to a live URL, wire up environment variables, and watch your first production deploy go out.

**Exercise:** deploy your project and share the live link.`,
          },
          {
            slug: "portfolio-and-interview-prep",
            title: "Portfolio & Interview Prep",
            summary: "Package your work so employers notice it.",
            minutes: 45,
            xp: 40,
            content: `Shipping code is half the job — explaining it is the other half. You'll write a project case study, prep answers for "walk me through something you built," and do a mock technical interview with a mentor.

**Exercise:** record a 2-minute walkthrough of your deployed project.`,
          },
        ],
      },
    ],
  },
  {
    slug: "data-ai-foundations",
    title: "Data, AI & Automation Foundations",
    tagline: "Python, real datasets, and your first AI-powered tools.",
    description:
      "Learn Python the way data and AI teams actually use it — cleaning real datasets, finding insights, and building small AI-powered tools. No prior coding experience required.",
    category: "Data & AI",
    level: "Beginner",
    durationWeeks: 14,
    gradient: "from-cyan-400 to-emerald-400",
    icon: "brain-circuit",
    outcomes: [
      "Write Python confidently — syntax, functions, and data structures",
      "Clean and analyze real-world datasets with pandas",
      "Visualize data and communicate findings",
      "Understand how modern AI models work and where they fit",
      "Build a small AI-powered project using a real API",
    ],
    modules: [
      {
        slug: "python-foundations",
        title: "Python Foundations",
        summary: "Your first programs, the data-science way.",
        stage: "init",
        lessons: [
          {
            slug: "why-python",
            title: "Why Python (and Why It Matters Here)",
            summary: "Set up your environment and run your first script.",
            minutes: 20,
            xp: 20,
            content: `Python is the language behind most modern data and AI work — readable syntax, a huge ecosystem, and a gentle learning curve.

\`\`\`python
print("init: environment ready")
\`\`\`

**Exercise:** install Python, run your first script, and print your evolution stage.`,
          },
          {
            slug: "variables-and-types",
            title: "Variables, Types & Control Flow",
            summary: "The building blocks every program is made of.",
            minutes: 35,
            xp: 25,
            content: `\`\`\`python
xp = 0
stage = "init"

if xp >= 100:
    stage = "commit"

print(f"You are at stage: {stage}")
\`\`\`

**Exercise:** write a function that takes total XP and returns the correct evolution stage.`,
          },
          {
            slug: "lists-and-dicts",
            title: "Lists & Dictionaries",
            summary: "The data structures you'll use constantly.",
            minutes: 30,
            xp: 25,
            content: `Lists hold ordered items; dictionaries map keys to values — the shape most real-world data comes in.

\`\`\`python
student = {"name": "Ada", "xp": 240, "tracks": ["data-ai-foundations"]}
\`\`\`

**Exercise:** model a small list of students as dictionaries and print each one's stage.`,
          },
        ],
      },
      {
        slug: "working-with-data",
        title: "Working with Data",
        summary: "pandas, real datasets, and your first analysis.",
        stage: "commit",
        lessons: [
          {
            slug: "intro-to-pandas",
            title: "Intro to pandas",
            summary: "Load and explore a real dataset in minutes.",
            minutes: 35,
            xp: 30,
            content: `\`\`\`python
import pandas as pd
df = pd.read_csv("students.csv")
df.describe()
\`\`\`

**Exercise:** load a public dataset and print its shape, columns, and first five rows.`,
          },
          {
            slug: "cleaning-data",
            title: "Cleaning Messy Data",
            summary: "Real data is never clean — here's how to fix it.",
            minutes: 40,
            xp: 30,
            content: `Missing values, duplicate rows, inconsistent formatting — this is most of a data professional's actual job.

\`\`\`python
df = df.dropna().drop_duplicates()
\`\`\`

**Exercise:** clean a deliberately messy dataset and document every decision you made.`,
          },
          {
            slug: "visualizing-data",
            title: "Visualizing Data",
            summary: "Turn numbers into a chart someone can act on.",
            minutes: 35,
            xp: 30,
            content: `A chart should answer a question at a glance.

\`\`\`python
df.groupby("track")["xp"].mean().plot(kind="bar")
\`\`\`

**Exercise:** build one chart that tells a clear story about your dataset.`,
          },
        ],
      },
      {
        slug: "intro-to-ai",
        title: "Intro to AI",
        summary: "How modern AI models actually work.",
        stage: "merge",
        lessons: [
          {
            slug: "how-models-work",
            title: "How AI Models Actually Work",
            summary: "A practical, non-hand-wavy mental model.",
            minutes: 30,
            xp: 35,
            content: `Modern AI models are trained on huge amounts of data to predict patterns — from "the next word in a sentence" to "the label of an image."

You don't need a PhD to use them well. You need to know what they're good at, what they're bad at, and how to check their work.`,
          },
          {
            slug: "calling-an-ai-api",
            title: "Calling an AI API",
            summary: "Make your first request to a real AI model.",
            minutes: 35,
            xp: 35,
            content: `\`\`\`python
response = client.chat("Summarize this dataset in one sentence.")
print(response)
\`\`\`

**Exercise:** call an AI API from Python and print the result.`,
          },
          {
            slug: "prompting-and-evaluation",
            title: "Prompting & Evaluation",
            summary: "Get reliable output — and know when to trust it.",
            minutes: 35,
            xp: 35,
            content: `A good prompt is specific about the task, the format, and the constraints. Always check AI output against ground truth before you trust it.

**Exercise:** write three prompt variations for the same task and compare the outputs.`,
          },
        ],
      },
      {
        slug: "ship-an-ai-tool",
        title: "Ship an AI Tool",
        summary: "Build and share a small, real AI-powered project.",
        stage: "deploy",
        lessons: [
          {
            slug: "planning-your-project",
            title: "Planning Your Project",
            summary: "Scope something you can actually finish.",
            minutes: 25,
            xp: 40,
            content: `The best portfolio projects are small, finished, and solve a real (even tiny) problem — not half-built and ambitious.

**Exercise:** write a one-paragraph spec for an AI-powered tool you'll build this week.`,
          },
          {
            slug: "building-the-tool",
            title: "Building the Tool",
            summary: "Wire your data pipeline to an AI API with a simple UI.",
            minutes: 60,
            xp: 40,
            content: `Combine what you've learned: load data with pandas, call an AI API, and present the result — a CLI script or a simple web page is enough.

**Exercise:** build a working end-to-end version, even if it's rough.`,
          },
          {
            slug: "presenting-your-work",
            title: "Presenting Your Work",
            summary: "Package it for a portfolio and an interview.",
            minutes: 30,
            xp: 40,
            content: `Write a short README: the problem, your approach, what you'd improve with more time. That last part matters more than students expect — it shows judgment.

**Exercise:** publish your project with a README and share it with a mentor for feedback.`,
          },
        ],
      },
    ],
  },
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    tagline: "Think like an attacker, defend like a professional.",
    description:
      "Network security, ethical hacking basics, and the fundamentals of keeping systems safe — taught hands-on, in a legal, sandboxed environment built for learning.",
    category: "Security",
    level: "Beginner–Intermediate",
    durationWeeks: 12,
    gradient: "from-emerald-400 to-cyan-400",
    icon: "shield-check",
    comingSoon: true,
    outcomes: [
      "Understand common attack vectors and how to defend against them",
      "Get hands-on with network security fundamentals",
      "Learn ethical hacking in a legal, sandboxed environment",
      "Understand the fundamentals behind industry certifications",
    ],
    modules: [],
  },
  {
    slug: "cloud-devops-essentials",
    title: "Cloud & DevOps Essentials",
    tagline: "Git, CI/CD, and shipping software the way real teams do.",
    description:
      "The workflows behind every modern engineering team: version control, continuous integration, containers, and deploying to the cloud with confidence.",
    category: "Infrastructure",
    level: "Beginner–Intermediate",
    durationWeeks: 10,
    gradient: "from-violet-500 to-indigo-400",
    icon: "cloud-cog",
    comingSoon: true,
    outcomes: [
      "Master Git workflows used by real engineering teams",
      "Set up continuous integration & deployment pipelines",
      "Understand containers and cloud deployment fundamentals",
      "Debug and monitor a live production system",
    ],
    modules: [],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Design and ship an app you can put on your own phone.",
    description:
      "Build cross-platform mobile apps from scratch — UI, state, device APIs, and shipping to a real device.",
    category: "Software Engineering",
    level: "Beginner",
    durationWeeks: 12,
    gradient: "from-cyan-400 to-violet-500",
    icon: "smartphone",
    comingSoon: true,
    outcomes: [
      "Build cross-platform mobile UIs",
      "Work with device APIs (camera, location, storage)",
      "Manage app state and navigation",
      "Ship a build to your own device",
    ],
    modules: [],
  },
  {
    slug: "game-development",
    title: "Game Development",
    tagline: "Build the games you actually want to play.",
    description:
      "Game loops, physics, sprites, and level design — a hands-on intro to game development that turns your favorite hobby into an engineering skill.",
    category: "Software Engineering",
    level: "Beginner",
    durationWeeks: 12,
    gradient: "from-fuchsia-400 to-violet-500",
    icon: "gamepad-2",
    comingSoon: true,
    outcomes: [
      "Understand game loops, physics, and collision",
      "Design and build playable levels",
      "Work with sprites, animation, and sound",
      "Ship a playable game",
    ],
    modules: [],
  },
];

export interface SeedMentor {
  slug: string;
  name: string;
  role: string;
  companyType: string;
  bio: string;
  focus: string[];
  initials: string;
}

// Placeholder mentor profiles — illustrative of the kind of industry mentors CodeVolve
// recruits (practicing engineers, adjunct hours). Swap for real mentor bios before launch.
export const SEED_MENTORS: SeedMentor[] = [
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Senior Software Engineer",
    companyType: "Developer tools startup",
    bio: "8 years building developer tools. Priya mentors the Full-Stack Web track and runs monthly mock-interview sessions.",
    focus: ["Full-Stack Web", "Interview Prep"],
    initials: "PN",
  },
  {
    slug: "daniel-oconnor",
    name: "Daniel O'Connor",
    role: "Data Engineer",
    companyType: "Enterprise SaaS company",
    bio: "Works on large-scale data pipelines by day, teaches pandas and SQL fundamentals to CodeVolve students by night.",
    focus: ["Data & AI", "SQL"],
    initials: "DO",
  },
  {
    slug: "amelia-tran",
    name: "Amelia Tran",
    role: "Frontend Lead",
    companyType: "Product & design software company",
    bio: "Leads a team of frontend engineers. Amelia reviews student portfolio projects line-by-line before deploy.",
    focus: ["React", "Portfolio Review"],
    initials: "AT",
  },
  {
    slug: "jordan-mills",
    name: "Jordan Mills",
    role: "Security Engineer",
    companyType: "Telecommunications company",
    bio: "Former penetration tester. Jordan is building out CodeVolve's Cybersecurity Fundamentals track from the ground up.",
    focus: ["Security", "Networking"],
    initials: "JM",
  },
  {
    slug: "harpreet-singh",
    name: "Harpreet Singh",
    role: "Platform Engineer",
    companyType: "Online marketplace",
    bio: "Runs CI/CD for a team shipping deploys daily. Teaches the Cloud & DevOps Essentials track.",
    focus: ["DevOps", "Cloud"],
    initials: "HS",
  },
  {
    slug: "sofia-marino",
    name: "Sofia Marino",
    role: "Engineering Manager",
    companyType: "Fintech company",
    bio: "Hires new grads every year. Sofia runs CodeVolve's careers workshops — resumes, portfolios, and what actually gets you hired.",
    focus: ["Careers", "Full-Stack Web"],
    initials: "SM",
  },
];

export interface SeedTestimonial {
  name: string;
  context: string;
  quote: string;
  outcome: string;
  track: string;
}

// Placeholder alumni stories — illustrative of target outcomes. Swap for real
// student stories (with permission) before launch.
export const SEED_TESTIMONIALS: SeedTestimonial[] = [
  {
    name: "Ravi K.",
    context: "Year 11 student",
    quote:
      "I started CodeVolve not knowing what a function was. Eight months later I deployed my own app and my school's careers advisor asked me to talk to the whole cohort about it.",
    outcome: "Now building a second project in the Data & AI track",
    track: "Full-Stack Web Development",
  },
  {
    name: "Meg T.",
    context: "First-year computer science student",
    quote:
      "The commit-log framing actually changed how I think about learning — every small win is a real commit, not just a grade. It made the whole thing feel like progress I could point to.",
    outcome: "Landed a part-time junior dev internship",
    track: "Full-Stack Web Development",
  },
  {
    name: "Aiden P.",
    context: "Year 12 student",
    quote:
      "My mentor reviewed my portfolio project like I was a real junior dev on their team, not a school kid. That's the difference — it felt like the real thing.",
    outcome: "Accepted into a university software engineering program",
    track: "Data, AI & Automation Foundations",
  },
  {
    name: "Chloe W.",
    context: "Final-year college student",
    quote:
      "I'd tried three different 'learn to code' apps before this. What actually got me unstuck was having a mentor to ask 'is this good?' — not just 'does this run.'",
    outcome: "Shipped a portfolio project used in job applications",
    track: "Full-Stack Web Development",
  },
  {
    name: "Tomasi F.",
    context: "Year 10 student",
    quote:
      "I do CodeVolve two evenings a week alongside school. It doesn't feel like homework — it feels like the one class where I get to build something that's actually mine.",
    outcome: "Reached the 'commit' evolution stage in 10 weeks",
    track: "Data, AI & Automation Foundations",
  },
  {
    name: "Isla R.",
    context: "Second-year college student",
    quote:
      "The evolution path gave me a way to explain my own progress in an interview — I could literally walk through init to deploy and show the projects at each stage.",
    outcome: "Now mentoring newer students in the Discord community",
    track: "Full-Stack Web Development",
  },
];
