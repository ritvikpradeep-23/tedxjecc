// Server-only mobile numbers for confirmed team members, keyed by
// slugify(person.name) from src/data/siteData.js. Deliberately kept in its
// own file that only api/team/phone.js ever imports — nothing under src/
// touches this, so a number never ends up in the client JS bundle. The
// "Show number" button on each Meet the Team card fetches this endpoint
// only when clicked, so the number isn't sitting in the page as scrapeable
// plain text either.
//
// Fill in real numbers as they're collected: "slugifiedname": "+91XXXXXXXXXX".
const PHONES = {
  // "ritvikpradeep": "+91XXXXXXXXXX",
  // "sanvyasandeep": "+91XXXXXXXXXX",
  // "melvinrajcr": "+91XXXXXXXXXX",
  // "pallaviv": "+91XXXXXXXXXX",
  // "muhammedalsabithabu": "+91XXXXXXXXXX",
};

export function getPhoneForSlug(slug) {
  return PHONES[slug] || null;
}
