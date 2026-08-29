import { APPLY_FORM_URL } from "../data/siteData";
import ApplyCTA from "./ApplyCTA";
import Card from "./Card";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// No on-site application form — applying happens entirely through the
// Google Form at APPLY_FORM_URL. Until that's set, this is just a disabled
// "coming soon" CTA (same ApplyCTA used by the Open Roles stubs); the moment
// it's set, this becomes a live link to it, opened in a new tab.
export default function JoinTeam() {
  return (
    <Section id="join" tone="charcoal" container="narrow">
      <SectionHeading
        eyebrow="Join Us"
        title="Join the Core Team"
        subtitle="We're recruiting a 23-person core team across three tiers."
      />

      <Reveal>
        <Card tone="black" hover={false} className="p-10 sm:p-14 flex flex-col items-center text-center gap-5">
          <p className="text-white/60 text-sm max-w-sm">
            {APPLY_FORM_URL
              ? "Applications for the core team are open — apply through our Google Form."
              : "We're not taking applications on-site — the Google Form will be linked here once it's ready."}
          </p>
          <ApplyCTA label="Apply via Google Form" size="lg" />
        </Card>
      </Reveal>
    </Section>
  );
}
