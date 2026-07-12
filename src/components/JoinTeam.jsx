import { useState } from "react";
import { teamOptions, joinFormFields } from "../data/siteData";
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

function fieldClasses(hasError) {
  return `w-full rounded-lg bg-tedx-black border text-white placeholder-white/30 px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-1 ${
    hasError
      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400"
      : "border-white/15 focus:border-tedx-red focus:ring-tedx-red"
  }`;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-red-400 text-xs mt-1.5" role="alert">
      {message}
    </p>
  );
}

function Field({ label, htmlFor, optional, error, children }) {
  const errorId = `${htmlFor}-error`;
  return (
    <div>
      <label className={labelClasses} htmlFor={htmlFor}>
        {label} {optional && <span className="text-white/30 normal-case">(optional)</span>}
      </label>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function JoinTeam() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const showSocialHandle = form.team === "Media";
  const showToolsExperience = form.team === "Media" || form.team === "Tech";
  const showSpreadsheetExperience = form.team === "Treasurer & Budgeting";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.department.trim()) nextErrors.department = "This field is required.";
    if (!form.team) nextErrors.team = "Please select a team.";
    if (!form.why.trim()) nextErrors.why = "Tell us why you'd like to join.";
    if (!form.availability) nextErrors.availability = "Please select your availability.";
    if (!form.preferredPosition) nextErrors.preferredPosition = "Please choose a preferred position.";
    if (!form.scenarioResponse.trim()) nextErrors.scenarioResponse = "Please answer the scenario question.";
    if (showSocialHandle && !form.socialHandle.trim()) nextErrors.socialHandle = "Please share a handle we can find you at.";
    if (showToolsExperience && !form.toolsExperience.trim()) nextErrors.toolsExperience = "Please tell us about your tools experience.";
    if (showSpreadsheetExperience && !form.spreadsheetExperience.trim()) nextErrors.spreadsheetExperience = "Please tell us about your spreadsheet/accounting experience.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setSubmitError("");
  };

  const scenarioLabel = form.team
    ? `If something went wrong on event day in the ${form.team} team's area, how would you handle it in the moment?`
    : "If something went wrong on event day in your chosen team's area, how would you handle it in the moment?";

  return (
    <Section id="join" tone="charcoal" container="narrow">
      <SectionHeading
        eyebrow="Join Us"
        title="Join the Core Team"
        subtitle="We're recruiting a 23-person core team across three tiers."
      />

      <Reveal>
        <Card tone="black" hover={false} className="p-6 sm:p-10">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-tedx-red/15 border border-tedx-red flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-tedx-red" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="heading-lg text-white">Application received!</h3>
              <p className="text-white/60 text-sm mt-3 max-w-sm">
                Thanks, {form.name.split(" ")[0] || "there"} — we've got your application for {form.team || "the team"}.
                Shortlisted applicants will be invited for a short interview.
              </p>
              <Button variant="secondary" className="mt-8" onClick={handleReset}>
                Submit Another Response
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <Field label="Full Name" htmlFor="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClasses(errors.name)}
                />
              </Field>

              <Field label="Email" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClasses(errors.email)}
                />
              </Field>

              <Field label="Department & Year of Study" htmlFor="department" error={errors.department}>
                <input
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder={joinFormFields.departmentPlaceholder}
                  aria-invalid={Boolean(errors.department)}
                  className={fieldClasses(errors.department)}
                />
              </Field>

              <Field label="Preferred Team" htmlFor="preferredTeam" error={errors.team}>
                <select
                  id="preferredTeam"
                  name="team"
                  value={form.team}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.team)}
                  className={`${fieldClasses(errors.team)} appearance-none`}
                >
                  <option value="" disabled>Select a team</option>
                  {teamOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Field>

              <Field label="Availability — hours per week" htmlFor="availability" error={errors.availability}>
                <select
                  id="availability"
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.availability)}
                  className={`${fieldClasses(errors.availability)} appearance-none`}
                >
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
                    <label key={position} className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="preferredPosition"
                        value={position}
                        checked={form.preferredPosition === position}
                        onChange={handleChange}
                        className="w-4 h-4 accent-red-600 cursor-pointer"
                      />
                      {position}
                    </label>
                  ))}
                </div>
                <FieldError message={errors.preferredPosition} />
              </div>

              <Field label="Why do you want to join this team?" htmlFor="why" error={errors.why}>
                <textarea
                  id="why"
                  name="why"
                  rows={4}
                  value={form.why}
                  onChange={handleChange}
                  placeholder={joinFormFields.whyPlaceholder}
                  aria-invalid={Boolean(errors.why)}
                  className={`${fieldClasses(errors.why)} resize-none`}
                />
              </Field>

              <Field label="Prior event experience" htmlFor="priorExperience" optional>
                <textarea
                  id="priorExperience"
                  name="priorExperience"
                  rows={3}
                  value={form.priorExperience}
                  onChange={handleChange}
                  placeholder="Have you organized or volunteered for any event before?"
                  className={`${fieldClasses(false)} resize-none`}
                />
              </Field>

              <Field label="TEDx experience" htmlFor="tedxExperience" optional>
                <textarea
                  id="tedxExperience"
                  name="tedxExperience"
                  rows={3}
                  value={form.tedxExperience}
                  onChange={handleChange}
                  placeholder="Have you attended or watched a TEDx talk before? If so, which one stuck with you?"
                  className={`${fieldClasses(false)} resize-none`}
                />
              </Field>

              {showSocialHandle && (
                <Field label="Instagram or LinkedIn handle" htmlFor="socialHandle" error={errors.socialHandle}>
                  <input
                    id="socialHandle"
                    name="socialHandle"
                    value={form.socialHandle}
                    onChange={handleChange}
                    placeholder="@yourhandle or profile link"
                    aria-invalid={Boolean(errors.socialHandle)}
                    className={fieldClasses(errors.socialHandle)}
                  />
                </Field>
              )}

              {showToolsExperience && (
                <Field label="Tools & software experience" htmlFor="toolsExperience" error={errors.toolsExperience}>
                  <textarea
                    id="toolsExperience"
                    name="toolsExperience"
                    rows={2}
                    value={form.toolsExperience}
                    onChange={handleChange}
                    placeholder="Which editing, design, or AV/technical tools have you used?"
                    aria-invalid={Boolean(errors.toolsExperience)}
                    className={`${fieldClasses(errors.toolsExperience)} resize-none`}
                  />
                </Field>
              )}

              {showSpreadsheetExperience && (
                <Field label="Spreadsheet / accounting experience" htmlFor="spreadsheetExperience" error={errors.spreadsheetExperience}>
                  <textarea
                    id="spreadsheetExperience"
                    name="spreadsheetExperience"
                    rows={2}
                    value={form.spreadsheetExperience}
                    onChange={handleChange}
                    placeholder="Tell us about any spreadsheet or accounting experience you have."
                    aria-invalid={Boolean(errors.spreadsheetExperience)}
                    className={`${fieldClasses(errors.spreadsheetExperience)} resize-none`}
                  />
                </Field>
              )}

              <Field label={scenarioLabel} htmlFor="scenarioResponse" error={errors.scenarioResponse}>
                <textarea
                  id="scenarioResponse"
                  name="scenarioResponse"
                  rows={3}
                  value={form.scenarioResponse}
                  onChange={handleChange}
                  placeholder="Walk us through how you'd respond."
                  aria-invalid={Boolean(errors.scenarioResponse)}
                  className={`${fieldClasses(errors.scenarioResponse)} resize-none`}
                />
              </Field>

              <Field label="Relevant Experience or Portfolio Link" htmlFor="portfolio" optional>
                <input
                  id="portfolio"
                  name="portfolio"
                  value={form.portfolio}
                  onChange={handleChange}
                  placeholder={joinFormFields.portfolioPlaceholder}
                  className={fieldClasses(false)}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Reference — name" htmlFor="referenceName" optional>
                  <input
                    id="referenceName"
                    name="referenceName"
                    value={form.referenceName}
                    onChange={handleChange}
                    placeholder="Professor, senior, or club coordinator"
                    className={fieldClasses(false)}
                  />
                </Field>
                <Field label="Reference — contact" htmlFor="referenceContact" optional>
                  <input
                    id="referenceContact"
                    name="referenceContact"
                    value={form.referenceContact}
                    onChange={handleChange}
                    placeholder="Email or phone"
                    className={fieldClasses(false)}
                  />
                </Field>
              </div>

              {submitError && (
                <p className="text-red-400 text-sm text-center" role="alert">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={submitting}
                className="mt-2 w-full sm:w-fit self-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : "Submit Application"}
              </Button>

              <p className="text-white/40 text-xs text-center">
                Shortlisted applicants will be invited for a short interview.
              </p>
            </form>
          )}
        </Card>
      </Reveal>
    </Section>
  );
}
