// Central config for TEDxJECC. Swap placeholder names/photos/copy with real
// data as it becomes available — nothing elsewhere in the app should need to change.

export const eventInfo = {
  name: "TEDxJECC",
  date: "Saturday, 10 October 2026",
  time: "10:00 AM – 1:20 PM",
  venue: "College Auditorium",
  tagline: "Ideas worth spreading, right here on campus",
  affiliation: "Organized in association with IEEE Student Chapter & Dept. of Computer Science",
  contactEmail: "team@tedxjecc.org",
};

// Placeholder event theme — swap `name`/copy for the real one once decided.
// Alternate placeholder names to consider: "Uncharted", "The Next Frontier", "Convergence".
export const eventTheme = {
  name: "Beyond Boundaries",
  oneLiner: "Exploring the ideas that push past what we think is possible.",
  description:
    "Beyond Boundaries is a call to question the limits we take for granted — in technology, in society, and in ourselves. This year's speakers explore what happens when curiosity refuses to stop at the edge of the known.",
  disciplines: ["Technology", "Social Impact", "Science", "Art", "Personal Growth"],
};

export const navLinks = [
  { label: "Speakers", href: "#speakers" },
  { label: "Tickets", href: "#tickets" },
  { label: "Team", href: "#team" },
  { label: "Join Us", href: "#join" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X", href: "#" },
];

// Deterministic placeholder contact details — swap for real profile links later.
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function placeholderContact(name) {
  const slug = slugify(name);
  return {
    linkedin: `https://linkedin.com/in/${slug}`,
    whatsapp: "https://wa.me/91XXXXXXXXXX",
    email: `${slug}@tedxjecc.org`,
  };
}

export const featuredSpeakers = [
  {
    name: "Ananya Rao",
    photo: "https://i.pravatar.cc/300?img=32",
    bio: "AI Researcher & Ethicist",
    talkTitle: "Teaching Machines to Say 'I Don't Know'",
    talkDescription: "Why the most responsible AI systems are the ones that know the limits of their own knowledge.",
    longBio:
      "Ananya studies the boundary between machine confidence and machine competence. Her work with model uncertainty has shaped how several labs think about deploying AI in high-stakes settings. She's spoken at three national conferences on responsible AI.",
    ...placeholderContact("Ananya Rao"),
  },
  {
    name: "Rohan Mehta",
    photo: "https://i.pravatar.cc/300?img=12",
    bio: "Climate-Tech Founder",
    talkTitle: "Carbon Capture at the Speed of Startups",
    talkDescription: "How founder-speed thinking can compress a decade of climate R&D into eighteen months.",
    longBio:
      "Rohan founded his first carbon-capture startup at 22, straight out of a mechanical engineering degree. He now advises two more, and spends most of his time convincing investors that climate hardware can move as fast as software.",
    ...placeholderContact("Rohan Mehta"),
  },
  {
    name: "Dr. Leela Nair",
    photo: "https://i.pravatar.cc/300?img=45",
    bio: "Neuroscientist",
    talkTitle: "The Brain's Blueprint for Creativity",
    talkDescription: "What fMRI scans of jazz musicians reveal about where new ideas actually come from.",
    longBio:
      "Dr. Nair runs a cognitive neuroscience lab studying creativity under improvisational pressure. Her research has been featured in several science journals, and she still plays semi-professional jazz piano on weekends.",
    ...placeholderContact("Leela Nair"),
  },
  {
    name: "Kabir Sen",
    photo: "https://i.pravatar.cc/300?img=15",
    bio: "Documentary Filmmaker",
    talkTitle: "Bearing Witness in the Age of Deepfakes",
    talkDescription: "How documentary ethics have to evolve when video can no longer be trusted at face value.",
    longBio:
      "Kabir has spent a decade filming conflict zones and quiet rural stories alike. His latest project examines how synthetic media is changing what audiences believe — and what filmmakers owe them in return.",
    ...placeholderContact("Kabir Sen"),
  },
  {
    name: "Meera Iyer",
    photo: "https://i.pravatar.cc/300?img=47",
    bio: "Urban Designer",
    talkTitle: "Cities That Heal Instead of Harm",
    talkDescription: "Small, cheap design interventions that measurably improve mental health in dense cities.",
    longBio:
      "Meera designs public spaces for municipal governments across the country, with a focus on low-cost interventions that improve wellbeing. She believes the best urban design is the kind residents barely notice.",
    ...placeholderContact("Meera Iyer"),
  },
];

export const openCallSpeakers = [
  {
    name: "Arjun Vashisht",
    photo: "https://i.pravatar.cc/300?img=51",
    bio: "Final-Year CS Student",
    talkTitle: "What Debugging Taught Me About Patience",
    talkDescription: "Lessons from a thousand stack traces, and why the bug is rarely where you first look.",
    longBio:
      "Arjun spends most nights deep in compiler errors and most mornings explaining them to confused juniors. He's building a small open-source tool to help students debug faster — and better understand why they were stuck.",
    ...placeholderContact("Arjun Vashisht"),
  },
  {
    name: "Sneha Kulkarni",
    photo: "https://i.pravatar.cc/300?img=26",
    bio: "Student Entrepreneur",
    talkTitle: "Building a Business Out of a Hostel Room",
    talkDescription: "How a ₹2,000 budget and a hostel Wi-Fi connection became a real, paying business.",
    longBio:
      "Sneha started selling handmade notebooks out of her hostel room in first year. Eighteen months later, she runs a small team and ships across three cities — all while finishing her degree.",
    ...placeholderContact("Sneha Kulkarni"),
  },
  {
    name: "Farhan Ali",
    photo: "https://i.pravatar.cc/300?img=13",
    bio: "Para-Athlete",
    talkTitle: "Redefining the Finish Line",
    talkDescription: "What competitive para-athletics taught him about setting goals nobody else can see.",
    longBio:
      "Farhan competes nationally in para-athletics after an accident changed his relationship with his own body. He now coaches younger athletes and speaks about redefining what a finish line even means.",
    ...placeholderContact("Farhan Ali"),
  },
  {
    name: "Priya Deshmukh",
    photo: "https://i.pravatar.cc/300?img=44",
    bio: "Folk Musician",
    talkTitle: "Keeping Ancestral Melodies Alive",
    talkDescription: "Why she travels to remote villages recording folk songs before the last singers are gone.",
    longBio:
      "Priya has spent three years documenting disappearing folk traditions from her grandmother's region. She performs these songs herself, blending them with contemporary arrangements for new audiences.",
    ...placeholderContact("Priya Deshmukh"),
  },
  {
    name: "Devansh Kapoor",
    photo: "https://i.pravatar.cc/300?img=8",
    bio: "Robotics Hobbyist",
    talkTitle: "Building Robots With Spare Parts",
    talkDescription: "What years of scavenging old electronics taught him about resourceful engineering.",
    longBio:
      "Devansh builds functioning robots almost entirely from parts salvaged from broken appliances. His workshop, run out of a garage, has produced three competition-winning bots on a shoestring budget.",
    ...placeholderContact("Devansh Kapoor"),
  },
];

export const ticketTiers = [
  {
    id: "student",
    name: "Student",
    price: "₹250",
    recommended: true,
    perks: ["Full-day entry", "Refreshments included", "Participation certificate"],
  },
  {
    id: "guest",
    name: "Guest / Public",
    price: "₹300",
    recommended: false,
    perks: ["Full-day entry", "Refreshments included", "Participation certificate", "Reserved seating"],
  },
];

// Tier 1 — overall event leadership. Displayed larger/more prominent than
// the tier 2/3 team blocks below.
export const leadership = {
  description: "Overall event leadership, final decisions, and the required TEDx/institutional liaison.",
  members: [
    {
      name: "Ishaan Kapoor",
      photo: "https://i.pravatar.cc/300?img=33",
      role: "Co-Organizer",
      description: "Oversees speaker relations, curation, and the overall event vision.",
      longBio:
        "Ishaan has been part of the organizing committee since its first year and now leads overall event direction, shaping the speaker lineup and representing TEDxJECC to the college administration.",
      ...placeholderContact("Ishaan Kapoor"),
    },
    {
      name: "Diya Sharma",
      photo: "https://i.pravatar.cc/300?img=48",
      role: "Co-Organizer",
      description: "Oversees operations and cross-team coordination across all three tiers.",
      longBio:
        "Diya keeps all three tiers moving in sync — from budgeting to volunteer logistics — and focuses on the operational backbone that makes event day possible.",
      ...placeholderContact("Diya Sharma"),
    },
    {
      name: "Prof. Meenal Kulkarni",
      photo: "https://i.pravatar.cc/300?img=70",
      role: "Faculty Coordinator",
      description: "Serves as the required TEDx institutional liaison and signs off on content and logistics.",
      longBio:
        "Prof. Kulkarni oversees compliance with TEDx's institutional guidelines and serves as the primary point of contact between the organizing committee and college administration. She reviews the final speaker lineup and stage content before the event.",
      ...placeholderContact("Meenal Kulkarni"),
    },
  ],
};

// Generic, data-driven bio for the tier 2/3 team heads/members below — swap
// in real bios once collected. Keeps the source data itself short (name + photo).
function withProfile(person, { team, role }) {
  const bio =
    role === "Head"
      ? `${person.name} leads the ${team} team, setting direction and keeping the crew aligned with the rest of TEDxJECC.`
      : `${person.name} is a core member of the ${team} team, contributing hands-on to everything the team ships.`;

  return {
    ...person,
    role,
    team,
    bio,
    ...placeholderContact(person.name),
  };
}

function buildTeam(team) {
  return {
    ...team,
    head: withProfile(team.head, { team: team.name, role: "Head" }),
    members: team.members.map((member) => withProfile(member, { team: team.name, role: "Member" })),
  };
}

const rawTier2Teams = [
  {
    id: "treasurer-budgeting",
    name: "Treasurer & Budgeting",
    description: "Tracks the budget, manages vendor and sponsor payments, and leads sponsorship outreach.",
    head: { name: "Ansh Dixit", photo: "https://i.pravatar.cc/300?img=60" },
    members: [
      { name: "Riya Thakur", photo: "https://i.pravatar.cc/300?img=61" },
      { name: "Om Bajaj", photo: "https://i.pravatar.cc/300?img=62" },
      { name: "Vivaan Joshi", photo: "https://i.pravatar.cc/300?img=25" },
    ],
  },
  {
    id: "volunteer",
    name: "Volunteer",
    description: "Recruits volunteers and manages on-ground logistics — ushers, registration, seating, and hospitality.",
    head: { name: "Vansh Rawat", photo: "https://i.pravatar.cc/300?img=64" },
    members: [
      { name: "Ishita Grover", photo: "https://i.pravatar.cc/300?img=65" },
      { name: "Parth Wadhwa", photo: "https://i.pravatar.cc/300?img=66" },
      { name: "Gauri Nanda", photo: "https://i.pravatar.cc/300?img=67" },
    ],
  },
];

const rawTier3Teams = [
  {
    id: "media",
    name: "Media",
    description: "Photography, videography, social media, and all written/visual content for the event.",
    head: { name: "Aditi Verma", photo: "https://i.pravatar.cc/300?img=29" },
    members: [
      { name: "Kunal Bhatt", photo: "https://i.pravatar.cc/300?img=30" },
      { name: "Simran Kaur", photo: "https://i.pravatar.cc/300?img=31" },
      { name: "Rudra Pillai", photo: "https://i.pravatar.cc/300?img=34" },
    ],
  },
  {
    id: "ambience",
    name: "Ambience",
    description: "Stage design, venue decor, signage, and the overall look of the space.",
    head: { name: "Aryan Khanna", photo: "https://i.pravatar.cc/300?img=43" },
    members: [
      { name: "Naina Reddy", photo: "https://i.pravatar.cc/300?img=46" },
      { name: "Dhruv Saxena", photo: "https://i.pravatar.cc/300?img=49" },
      { name: "Pihu Agarwal", photo: "https://i.pravatar.cc/300?img=50" },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    description: "AV/lighting coordination, the recording feed, and the event website.",
    head: { name: "Aditya Rana", photo: "https://i.pravatar.cc/300?img=52" },
    members: [
      { name: "Ridhima Sood", photo: "https://i.pravatar.cc/300?img=53" },
      { name: "Karan Oberoi", photo: "https://i.pravatar.cc/300?img=54" },
      { name: "Esha Bakshi", photo: "https://i.pravatar.cc/300?img=55" },
    ],
  },
];

export const tier2Teams = rawTier2Teams.map(buildTeam);
export const tier3Teams = rawTier3Teams.map(buildTeam);

export const teamOptions = [...tier2Teams, ...tier3Teams].map((t) => t.name);

// Display labels for each tier in the Meet the Team section.
export const tierLabels = {
  tier1: "Leadership",
  tier2: "Core Teams",
  tier3: "Outreach and Production",
};

export const joinFormFields = {
  departmentPlaceholder: "e.g. Computer Science, 3rd Year",
  whyPlaceholder: "Tell us why this team excites you and what you'd bring to it...",
  portfolioPlaceholder: "Link to your work, resume, or social profile (optional)",
};
