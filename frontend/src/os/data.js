// Static content data for PrarthnaOS portfolio
export const PROFILE = {
  name: "Prarthna Tiwari",
  handle: "prarthna.exe",
  tagline: "full-stack engineer · y2k native · ships things that ship money",
  email: "prarthnatiwari04@gmail.com",
  phone: "+91 70690 55515",
  github: "https://github.com/prarthnat",
  linkedin: "https://www.linkedin.com/in/prarthna-tiwari/",
  behance: "https://www.behance.net/prarthna",
  resume:
    "https://customer-assets.emergentagent.com/job_fedc776b-34a8-490d-a326-880757b5d700/artifacts/u353852a_RenderCV_EngineeringResumes_Theme.pdf",
};

export const PROJECTS = [
  {
    id: "ai-investor",
    name: "AI Investor Dashboard",
    badge: "Hackathon · Ingenium '25",
    blurb:
      "AI-assisted investing companion that surfaces personalised insights, risk explainers and community trends.",
    why: "First-time investors get scared and freeze. We built a dashboard that explains every number in plain words.",
    story:
      "Recognised as Ingenium '25 Semifinalists. Parses portfolios, scores risk, and turns finance jargon into short readable lessons.",
    role: "Full-stack + AI workflows",
    tech: ["React", "Node.js", "Express", "Python", "AI APIs", "Charts"],
    github: "https://github.com/prarthnat/ai-investor-dashboard",
    live: null,
  },
  {
    id: "ratcode",
    name: "RatCode — Code Analysis",
    badge: "Web Tool",
    blurb:
      "Web platform to analyse and transform code snippets across languages. Built for fast developer feedback.",
    why: "Code reviewers waste hours pattern-matching by eye. RatCode automates the boring scan so humans focus on real bugs.",
    story:
      "Engineered the Node + Express backend that parses C++/Java logic, exposes a REST surface and renders interactive feedback.",
    role: "Backend lead + UI polish",
    tech: ["Node.js", "Express", "C++", "Java", "Regex"],
    github: "https://github.com/prarthnat/RatCode",
    live: "https://ratcode.onrender.com/",
  },
  {
    id: "bookstore",
    name: "Book Store Web App",
    badge: "Full-stack · MERN",
    blurb:
      "End-to-end book store with dynamic listings, search, auth, cart, and order management on clean MVC architecture.",
    why: "Local bookstores deserve an online presence that doesn't look like a 2008 PHP relic.",
    story:
      "Solo build. Focused on tidy data flow, secure session handling and a UI that actually feels nice to scroll.",
    role: "Solo build",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/prarthnat/Book-Store-Project",
    live: "https://book-store-project-ivory.vercel.app/",
  },
  {
    id: "mnist",
    name: "Handwritten Digit Recognition",
    badge: "Machine Learning",
    blurb:
      "MNIST digit classifier benchmarking multiple ML algorithms. Hit 99.55% accuracy on held-out data.",
    why: "I wanted to feel ML in my hands, not just read about it. Started small, measured everything, learned a lot.",
    story:
      "Deep-dived on preprocessing, model selection and evaluation metrics. Confusion matrices, finally, made sense.",
    role: "ML engineer",
    tech: ["Python", "Scikit-learn", "NumPy", "Pandas", "Matplotlib"],
    github: "https://github.com/prarthnat/Handwritten_digit_recognition",
    live: null,
  },
];

export const GAMING = {
  studio: "Bilions",
  duration: "6 months · Paid · Remote",
  title: "Web Developer Intern (Casino Backend)",
  why: "Slot maths is brutal. Get RTP wrong by 0.1% and the operator loses money. I wrote the validation suite that catches those.",
  titles: [
    "Slingo",
    "Buffalo Gold Rush",
    "Cleopatra",
    "Duck Splash",
    "Epic Summer",
    "Big Bass Bonanza",
  ],
  highlights: [
    "Built game APIs, RTP cron jobs and KPI dashboards in Node + Python",
    "Designed RTP calibration, paylines, bonus/free-spin mechanics and hit-rate optimisation",
    "Ran million-spin simulations to catch payout bugs before production",
    "Resolved live incidents: payout inconsistencies, infinite loops, stake desyncs, wallet API drift",
    "Integrated operator APIs, wallet settlement and game session management at scale",
  ],
};

export const BOOK_CHAPTERS = [
  {
    title: "Ch. 1 — A Less Secret Life",
    body: [
      "I'm Prarthna. Grew up moving cities every few years, which made me unreasonably good at packing and at landing softly in new rooms.",
      "Debate kid. Sketcher. School-level NCC. Three years of German (Guten Tag, hire me).",
      "Off the clock: thrifting, moodboards, replaying 2000s games for the soundtracks.",
    ],
  },
  {
    title: "Ch. 2 — A Technical Life",
    body: [
      "B.Tech, Information Technology · A D Patel Institute of Technology · CGPA 9.38/10 · Expected Jun '26.",
      "Languages: C, C++, JavaScript, Python, Java, HTML, CSS.",
      "Frameworks & libs: React, Angular, Node, Express, Pandas, NumPy, Scikit-learn, Matplotlib.",
      "Databases: MongoDB, MySQL. Tools: Figma, Git, Vercel, Render, VS Code.",
      "Certified in MEAN Stack (Board Infinity), Python DS (Univ. of Michigan), Linux + SQL (IBM), Advanced C (Dartmouth).",
    ],
  },
  {
    title: "Ch. 3 — Why You Should Hire Me",
    body: [
      "Six-month casino-backend internship — real production systems, real money, real bugs, real fixes.",
      "Hackathon semifinalist. Multiple stack certifications. Genuinely enjoys debugging at 2am.",
      "Frequent moves taught me resilience and adaptability — not a hire-me buzzword, a habit.",
      "I care about UX. Design brain + dev hands = interfaces that don't look like a tax form.",
      "Owns features end-to-end. Doesn't need to be nudged. Replies to messages.",
    ],
  },
];

export const OUTFITS = [
  { id: "y2k", name: "Y2K Princess", color: "#ff69b4", emoji: "👛" },
  { id: "tech", name: "Tech Goth", color: "#1a1a1a", emoji: "🖤" },
  { id: "summer", name: "Summer Lolly", color: "#ffd1dc", emoji: "🍦" },
  { id: "arcade", name: "Arcade Kid", color: "#39ff14", emoji: "🕹️" },
  { id: "denim", name: "Soft Denim", color: "#b9d6f2", emoji: "👖" },
];

// Music player tracks (visual only — audio is synth-loop driven by AudioContext)
export const TRACKS = [
  { id: "lipgloss", title: "lipgloss.dll", artist: "prarthnaOS", duration: "01:14" },
  { id: "after-hours", title: "after-hours debug", artist: "prarthnaOS", duration: "02:02" },
  { id: "mall-walk", title: "mall walk 2003", artist: "prarthnaOS", duration: "01:38" },
  { id: "boot-up", title: "boot-up dreamscape", artist: "prarthnaOS", duration: "01:51" },
];

// Thoughts the character says when no project is active
export const IDLE_THOUGHTS = [
  "double-click an icon — I'll tell you why each project exists.",
  "psst. the start menu has a resume button.",
  "fun fact: every label here is real, no lorem ipsum.",
  "press the sound icon for a little theme song.",
];
