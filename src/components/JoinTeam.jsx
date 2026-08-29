import { useState } from "react";
import { APPLY_FORM_URL, teamOptions, joinFormFields } from "../data/siteData";
import Button from "./Button";
import Card from "./Card";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const initialForm = {
  name: "",
  email: "",
  department: "",
  team: "",
  why: "",
  portfolio: "",
  availability: "",
  priorExperience: "",
  preferredPosition: "",
  tedxExperience: "",
  scenarioResponse: "",
  socialHandle: "",
  toolsExperience: "",
  spreadsheetExperience: "",
  referenceName: "",
  referenceContact: "",
};

const availabilityOptions = ["<3 hrs", "3-5 hrs", "5-10 hrs", "10+ hrs"];

const labelClasses = "text-xs font-semibold uppercase tracking-wide text-white/60 mb-2 block";

function fieldClasses() {
  return "w-full rounded-lg bg-tedx-black border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm";
}

function Field({ label, htmlFor, optional, children }) {
  return (
    <div>
      <label className={labelClasses} htmlFor={htmlFor}>
        {label} {optional && <span className="text-white/30 normal-case">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

// Once the real Google Form is live, the on-site multi-field form stays
// retired for good — it never becomes submittable again. It's shown here
// (disabled) purely as an honest preview of what applying involves while we
// wait, and it's fully replaced by the single ApplyCTA once APPLY_FORM_URL
// is set, so there's never a second, competing apply path.
function DisabledFormPreview() {
  const [form] = useState(initialForm);

  return (
    <fieldset disabled className="flex flex-col gap-6 opacity-40 cursor-not-allowed select-none">
      <Field label="Full Name" htmlFor="name">
        <input id="name" name="name" value={form.name} readOnly placeholder="Your full name" className={fieldClasses()} />
      </Field>

      <Field label="Email" htmlFor="email">
        <input id="email" name="email" type="email" value={form.email} readOnly placeholder="you@example.com" className={fieldClasses()} />
      </Field>

      <Field label="Department & Year of Study" htmlFor="department">
        <input
          id="department"
          name="department"
          value={form.department}
          readOnly
          placeholder={joinFormFields.departmentPlaceholder}
          className={fieldClasses()}
        />
      </Field>

      <Field label="Preferred Team" htmlFor="preferredTeam">
        <select id="preferredTeam" name="team" value={form.team} readOnly className={`${fieldClasses()} appearance-none`}>
          <option value="" disabled>Select a team</option>
          {teamOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </Field>

      <Field label="Availability — hours per week" htmlFor="availability">
        <select id="availability" name="availability" value={form.availability} readOnly className={`${fieldClasses()} appearance-none`}>
          <option value="" disabled>Select your availability</option>
          {availabilityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </Field>

      <div>
        <span className={labelClasses}>Preferred Position</span>
        <div className="flex gap-6">
          {["Head", "Member"].map((position) => (
            <label key={position} className="flex items-center gap-2 text-white/80 text-sm">
              <input type="radio" name="preferredPosition" checked={false} readOnly className="w-4 h-4 accent-red-600" />
              {position}
            </label>
          ))}
        </div>
      </div>

      <Field label="Why do you want to join this team?" htmlFor="why">
        <textarea id="why" name="why" rows={4} value={form.why} readOnly placeholder={joinFormFields.whyPlaceholder} className={`${fieldClasses()} resize-none`} />
      </Field>

      <Field label="Relevant Experience or Portfolio Link" htmlFor="portfolio" optional>
        <input id="portfolio" name="portfolio" value={form.portfolio} readOnly placeholder={joinFormFields.portfolioPlaceholder} className={fieldClasses()} />
      </Field>

      <Button type="button" variant="primary" disabled className="mt-2 w-full sm:w-fit self-center opacity-50 cursor-not-allowed">
        Submit Application
      </Button>
    </fieldset>
  );
}

export default function JoinTeam() {
  return (
    <Section id="join" tone="charcoal" container="narrow">
      <SectionHeading
        eyebrow="Join Us"
        title="Join the Core Team"
        subtitle="We're recruiting a 23-person core team across three tiers."
      />

      <Reveal>
        <Card tone="black" hover={false} className="p-6 sm:p-10">
          {APPLY_FORM_URL ? (
            <div className="flex flex-col items-center text-center py-6 gap-5">
              <p className="text-white/60 text-sm max-w-sm">
                Applications for the core team are open — apply through our Google Form.
              </p>
              <Button as="a" href={APPLY_FORM_URL} target="_blank" rel="noopener noreferrer" variant="primary">
                Apply via Google Form →
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8 rounded-lg bg-tedx-red/10 border border-tedx-red/30 text-center py-3 px-4">
                <p className="text-white/70 text-sm">Applications opening soon — this form isn't live yet.</p>
              </div>
              <DisabledFormPreview />
              <p className="text-white/40 text-xs text-center mt-6">
                Shortlisted applicants will be invited for a short interview.
              </p>
            </>
          )}
        </Card>
      </Reveal>
    </Section>
  );
}
