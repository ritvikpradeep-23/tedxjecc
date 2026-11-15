// Central config for TEDxJEC. Swap placeholder names/photos/copy with real
// data as it becomes available — nothing elsewhere in the app should need to change.

export const eventInfo = {
  name: "TEDxJEC",
  date: "Saturday, 10 October 2026",
  time: "10:00 AM – 1:20 PM",
  venue: "Decinal Hall",
  tagline: "Ideas worth spreading, right here on campus",
  affiliation: "Organized in association with IEEE Student Chapter & Dept. of Computer Science",
  contactEmail: "team@tedxjec.org",
  // Placeholder UPI ID for the ticket payment QR — swap for the real one
  // whenever it's ready. Nothing else needs to change; the QR is generated
  // live from this value plus each ticket's price.
  upiId: "tedxjec@upi",
};

// Placeholder event theme — swap `name`/copy for the real one once decided.
// Alternate placeholder names to consider: "Uncharted", "The Next Frontier", "Convergence".
export const eventTheme = {
  name: "Beyond Boundaries",
  oneLiner: "Exploring the ideas that push past what we think is possible.",
  description:
    "Beyond Boundaries is about the limits we stop noticing after a while — in technology, in society, in ourselves. This year's speakers don't treat those limits as fixed; some will challenge them outright, others will simply follow a question further than most people bother to. Either way, the theme is less a topic than an attitude — curiosity that doesn't stop at the edge of the known.",
  disciplines: ["Technology", "Social Impact", "Science", "Art", "Personal Growth"],
};

export const navLinks = [
  { label: "Speakers", href: "#speakers" },
  { label: "Tickets", href: "#tickets" },
  { label: "Team", href: "#team" },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X", href: "#" },
];

// Deterministic placeholder contact details — swap for real profile links
// later. Exported so the phone-reveal button and lib/teamContacts.js (the
// server-only file that actually holds numbers) key off the exact same slug
// — see src/components/PhoneReveal.jsx.
export function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function placeholderContact(name) {
  const slug = slugify(name);
  return {
    linkedin: `https://linkedin.com/in/${slug}`,
    whatsapp: "https://wa.me/91XXXXXXXXXX",
    email: `${slug}@tedxjec.org`,
  };
}

// Fills in placeholder linkedin/whatsapp/email, but any of those fields you
// set directly on a person always wins — this can go anywhere in that
// person's object, order doesn't matter.
function withContact(person) {
  return { ...placeholderContact(person.name), ...person };
}

// Shared placeholder for Meet the Team members who haven't been confirmed
// yet. To fill someone in once you have their real info, replace `name`,
// `photo` (a real image URL), and the bio/contact fields directly on their
// entry below — see README.md for the full walkthrough. An empty `photo`
// renders no avatar at all — this data only ever surfaces confirmed people
// with real photos in "Meet the Team"; everyone still `name: "TBD"` shows up
// instead as an aggregate "Open Roles" stub, never as a placeholder card.
const ANON_BIO = "To be announced";
const anonContact = { linkedin: "", whatsapp: "", email: "" };

const rawFeaturedSpeakers = [
  {
    name: "Test Speaker 1",
    photo: "https://i.pravatar.cc/300?img=32",
    bio: "AI Researcher & Ethicist",
    talkTitle: "Teaching Machines to Say 'I Don't Know'",
    talkDescription: "Why the most responsible AI systems are the ones that know the limits of their own knowledge.",
    longBio:
      "Ananya studies the boundary between machine confidence and machine competence. Her work with model uncertainty has shaped how several labs think about deploying AI in high-stakes settings. She's spoken at three national conferences on responsible AI.",
  },
  {
    name: "Test Speaker 2",
    photo: "https://i.pravatar.cc/300?img=12",
    bio: "Climate-Tech Founder",
    talkTitle: "Carbon Capture at the Speed of Startups",
    talkDescription: "How founder-speed thinking can compress a decade of climate R&D into eighteen months.",
    longBio:
      "Rohan founded his first carbon-capture startup at 22, straight out of a mechanical engineering degree. He now advises two more, and spends most of his time convincing investors that climate hardware can move as fast as software.",
  },
  {
    name: "Test Speaker 3",
    photo: "https://i.pravatar.cc/300?img=45",
    bio: "Neuroscientist",
    talkTitle: "The Brain's Blueprint for Creativity",
    talkDescription: "What fMRI scans of jazz musicians reveal about where new ideas actually come from.",
    longBio:
      "Dr. Nair runs a cognitive neuroscience lab studying creativity under improvisational pressure. Her research has been featured in several science journals, and she still plays semi-professional jazz piano on weekends.",
  },
  {
    name: "Test Speaker 4",
    photo: "https://i.pravatar.cc/300?img=15",
    bio: "Documentary Filmmaker",
    talkTitle: "Bearing Witness in the Age of Deepfakes",
    talkDescription: "How documentary ethics have to evolve when video can no longer be trusted at face value.",
    longBio:
      "Kabir has spent a decade filming conflict zones and quiet rural stories alike. His latest project examines how synthetic media is changing what audiences believe — and what filmmakers owe them in return.",
  },
  {
    name: "Test Speaker 5",
    photo: "https://i.pravatar.cc/300?img=47",
    bio: "Urban Designer",
    talkTitle: "Cities That Heal Instead of Harm",
    talkDescription: "Small, cheap design interventions that measurably improve mental health in dense cities.",
    longBio:
      "Meera designs public spaces for municipal governments across the country, with a focus on low-cost interventions that improve wellbeing. She believes the best urban design is the kind residents barely notice.",
  },
];

const rawOpenCallSpeakers = [
  {
    name: "Test Speaker 6",
    photo: "https://i.pravatar.cc/300?img=51",
    bio: "Final-Year CS Student",
    talkTitle: "What Debugging Taught Me About Patience",
    talkDescription: "Lessons from a thousand stack traces, and why the bug is rarely where you first look.",
    longBio:
      "Arjun spends most nights deep in compiler errors and most mornings explaining them to confused juniors. He's building a small open-source tool to help students debug faster — and better understand why they were stuck.",
  },
  {
    name: "Test Speaker 7",
    photo: "https://i.pravatar.cc/300?img=26",
    bio: "Student Entrepreneur",
    talkTitle: "Building a Business Out of a Hostel Room",
    talkDescription: "How a ₹2,000 budget and a hostel Wi-Fi connection became a real, paying business.",
    longBio:
      "Sneha started selling handmade notebooks out of her hostel room in first year. Eighteen months later, she runs a small team and ships across three cities — all while finishing her degree.",
  },
  {
    name: "Test Speaker 8",
    photo: "https://i.pravatar.cc/300?img=13",
    bio: "Para-Athlete",
    talkTitle: "Redefining the Finish Line",
    talkDescription: "What competitive para-athletics taught him about setting goals nobody else can see.",
    longBio:
      "Farhan competes nationally in para-athletics after an accident changed his relationship with his own body. He now coaches younger athletes and speaks about redefining what a finish line even means.",
  },
  {
    name: "Test Speaker 9",
    photo: "https://i.pravatar.cc/300?img=44",
    bio: "Folk Musician",
    talkTitle: "Keeping Ancestral Melodies Alive",
    talkDescription: "Why she travels to remote villages recording folk songs before the last singers are gone.",
    longBio:
      "Priya has spent three years documenting disappearing folk traditions from her grandmother's region. She performs these songs herself, blending them with contemporary arrangements for new audiences.",
  },
  {
    name: "Test Speaker 10",
    photo: "https://i.pravatar.cc/300?img=8",
    bio: "Robotics Hobbyist",
    talkTitle: "Building Robots With Spare Parts",
    talkDescription: "What years of scavenging old electronics taught him about resourceful engineering.",
    longBio:
      "Devansh builds functioning robots almost entirely from parts salvaged from broken appliances. His workshop, run out of a garage, has produced three competition-winning bots on a shoestring budget.",
  },
];

export const featuredSpeakers = rawFeaturedSpeakers.map(withContact);
export const openCallSpeakers = rawOpenCallSpeakers.map(withContact);

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
//
// Names/photos below are unconfirmed placeholders — the `role` field (what
// each seat is for) is real and should stay as-is. Once a person is
// confirmed, replace their `name`, `photo`, `description`, `longBio`, and
// contact fields directly.
const rawLeadership = {
  description:
    "This tier holds overall responsibility for the event. They make the final calls and serve as the required liaison between TEDxJEC and the institution, as well as the TEDx program itself.",
  members: [
    {
      name: "Sanvya Sandeep",
      photo: "",
      role: "Organizer",
      description:
        "Runs point on the big calls — budget sign-off, vendor decisions, what happens if something goes wrong on the day — and represents TEDxJEC to the college administration and the TEDx licensing team.",
      longBio:
        "Runs point on the big calls — budget sign-off, vendor decisions, what happens if something goes wrong on the day — and represents TEDxJEC to the college administration and the TEDx licensing team.",
      roleDescription:
        "Runs point on the big calls — budget sign-off, vendor decisions, what happens if something goes wrong on the day — and represents TEDxJEC to the college administration and the TEDx licensing team.",
      ...anonContact,
    },
    {
      name: "Melvin Raj",
      photo: "",
      role: "Faculty Advisor",
      description:
        "The formal link to the institution — signs off on venue bookings and funding, and is the name attached whenever a decision needs faculty authority behind it.",
      longBio:
        "The formal link to the institution — signs off on venue bookings and funding, and is the name attached whenever a decision needs faculty authority behind it.",
      roleDescription:
        "The formal link to the institution — signs off on venue bookings and funding, and is the name attached whenever a decision needs faculty authority behind it.",
      ...anonContact,
    },
    {
      // Second faculty advisor.
      name: "Anto Zacharia",
      photo: "",
      role: "Faculty Advisor",
      description:
        "The formal link to the institution — signs off on venue bookings and funding, and is the name attached whenever a decision needs faculty authority behind it.",
      longBio:
        "The formal link to the institution — signs off on venue bookings and funding, and is the name attached whenever a decision needs faculty authority behind it.",
      roleDescription:
        "The formal link to the institution — signs off on venue bookings and funding, and is the name attached whenever a decision needs faculty authority behind it.",
      ...anonContact,
    },
  ],
};

export const leadership = {
  ...rawLeadership,
  members: rawLeadership.members.map(withContact),
};

// Generic, data-driven bio for the tier 2/3 team heads/members below — swap
// in real bios once collected. Keeps the source data itself short (name +
// photo). Any `bio`/`linkedin`/`whatsapp`/`email` you set directly on a
// person always wins over the generated ones — can go anywhere in that
// person's object.
function withProfile(person, { team, role }) {
  const defaultBio =
    role === "Head"
      ? `${person.name} heads the ${team} team, setting the direction and keeping everyone moving toward it together.`
      : `${person.name} is part of the ${team} team, pitching in on whatever that team needs to get done.`;

  return {
    bio: defaultBio,
    ...placeholderContact(person.name),
    ...person,
    role,
    team,
  };
}

function buildTeam(team) {
  return {
    ...team,
    head: withProfile(team.head, { team: team.name, role: "Head" }),
    members: team.members.map((member) => withProfile(member, { team: team.name, role: "Member" })),
  };
}

// Names/photos for every head and member below are unconfirmed placeholders
// — team names and descriptions are real and should stay as-is. Once a
// person is confirmed, replace their `name` and `photo` directly (add
// `bio`/`linkedin`/`whatsapp`/`email` too if you have them — they'll
// override the "To be announced" placeholder automatically).
const rawTier2Teams = [
  {
    id: "treasurer-budgeting",
    name: "Treasurer & Budgeting",
    description:
      "This team keeps the budget honest. They handle vendor and sponsor payments day to day, and lead the outreach that brings sponsors on board in the first place.",
    headDescription:
      "Owns the budget end to end — approves spends, chases sponsor payments, and is the one every vendor invoice actually goes through.",
    memberDescription:
      "Tracks incoming and outgoing payments day to day and helps with sponsor outreach — cold emails, follow-ups, keeping the numbers straight.",
    head: { name: "Pallavi V", photo: "", ...anonContact },
    members: [
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
    ],
  },
  {
    id: "volunteer",
    name: "Volunteer",
    description:
      "This team recruits and manages the volunteers who keep event day running. That covers ushering, registration, seating, and hospitality — basically anywhere attendees need a hand.",
    headDescription:
      "Recruits and trains the volunteer team, builds the day-of schedule, then runs the floor on event day — who's on the door, who's seating people, who's making sure speakers have water.",
    memberDescription:
      "Works an assigned station on event day — door, registration, seating, or hospitality — and does whatever that shift needs in the moment.",
    head: { name: "Muhammed Alsabith Abu", photo: "", ...anonContact },
    members: [
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
    ],
  },
  {
    id: "logistics",
    name: "Logistics",
    description:
      "This team makes sure everything and everyone ends up in the right place at the right time — equipment, supplies, transport, and the venue setup schedule.",
    headDescription:
      "Plans and tracks every physical moving part — equipment hire, supplies, transport for speakers, and the setup and teardown timeline for the venue.",
    memberDescription:
      "Helps move, set up and pack down equipment and supplies, and runs errands wherever the day needs them.",
    head: { name: "Akash Aravind", photo: "", ...anonContact },
    members: [],
  },
];

const rawTier3Teams = [
  {
    id: "outreach",
    name: "Outreach",
    description:
      "This team runs everything that reaches the outside world: outreach and partnerships, photography and video, social media, and the stage, decor and tech that make the event work on the day.",
    headDescription:
      "Leads outreach and sets the direction for the team: speakers, sponsors and partners, the public face of the event, and what gets posted and when.",
    memberDescription:
      "Pitches in wherever the team needs it: reaching out to sponsors and partners, shooting or editing content, running stage, decor or tech on the day.",
    head: { name: "Ritvik Pradeep", photo: "", ...anonContact },
    members: [
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
      { name: "TBD", photo: "", bio: ANON_BIO, ...anonContact },
    ],
  },
];

export const tier2Teams = rawTier2Teams.map(buildTeam);
export const tier3Teams = rawTier3Teams.map(buildTeam);

// Display labels for each tier in the Meet the Team section.
export const tierLabels = {
  tier1: "Leadership",
  tier2: "Core Teams",
  tier3: "Outreach and Production",
};

// "Meet the Team": real, confirmed people only (every entry still named
// "TBD" is excluded, never rendered as a placeholder row) and "Open Roles"
// (every still-unfilled seat, grouped by team + role so three identical open
// "Member" seats on one team collapse into a single stub with a seat count,
// Derived from the leadership/tier2Teams/tier3Teams data above, so a person
// appears in the team list the moment you replace their `name`.
function computeConfirmedMembers() {
  const list = [];
  leadership.members.forEach((person) => {
    if (person.name !== "TBD") list.push({ ...person, team: null });
  });
  [...tier2Teams, ...tier3Teams].forEach((team) => {
    if (team.head.name !== "TBD") list.push(team.head);
    team.members.forEach((member) => {
      if (member.name !== "TBD") list.push(member);
    });
  });
  return list;
}

export const confirmedMembers = computeConfirmedMembers();
