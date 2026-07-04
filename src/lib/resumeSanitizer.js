// Resume sanitizer + derived helpers
// Goals:
// - Remove null/undefined/whitespace-only values
// - Collapse whitespace for consistent layout
// - Provide derived normalized arrays for skills
// - Provide default values for missing arrays/collections

import { splitLinesToBullets, splitSkillString } from "./formatters.js";

export function normalizeText(value) {
  const s = value === null || value === undefined ? "" : String(value);
  // Trim but preserve line breaks in textarea-like fields
  // Also collapse consecutive spaces/tabs on each line.
  return s
    .split(/\r?\n/)
    .map((line) => line.replace(/[\t ]+/g, " ").trim())
    .join("\n")
    .trim();
}

export function isPresent(value) {
  return normalizeText(value).length > 0;
}

export function sanitizeResumeData(d) {
  const data = d || {};

  const out = {
    // Profile
    profileImageDataUrl: isPresent(data.profileImageDataUrl)
      ? String(data.profileImageDataUrl)
      : "",
    fullName: isPresent(data.fullName) ? normalizeText(data.fullName) : "",
    phone: isPresent(data.phone) ? normalizeText(data.phone) : "",
    email: isPresent(data.email) ? normalizeText(data.email) : "",
    linkedIn: isPresent(data.linkedIn) ? normalizeText(data.linkedIn) : "",
    portfolio: isPresent(data.portfolio) ? normalizeText(data.portfolio) : "",

    // Objective
    careerObjective: isPresent(data.careerObjective)
      ? normalizeText(data.careerObjective)
      : "",

    // Education
    educationDegree: isPresent(data.educationDegree)
      ? normalizeText(data.educationDegree)
      : "",
    educationCollege: isPresent(data.educationCollege)
      ? normalizeText(data.educationCollege)
      : "",
    educationYearCgpa: isPresent(data.educationYearCgpa)
      ? normalizeText(data.educationYearCgpa)
      : "",
    educationIntermediate: isPresent(data.educationIntermediate)
      ? normalizeText(data.educationIntermediate)
      : "",
    educationSSC: isPresent(data.educationSSC)
      ? normalizeText(data.educationSSC)
      : "",

    // Skills raw
    skillsTechnical: isPresent(data.skillsTechnical)
      ? normalizeText(data.skillsTechnical)
      : "",
    skillsTools: isPresent(data.skillsTools)
      ? normalizeText(data.skillsTools)
      : "",
    skillsSoft: isPresent(data.skillsSoft)
      ? normalizeText(data.skillsSoft)
      : "",

    // Projects legacy
    projects1: isPresent(data.projects1) ? normalizeText(data.projects1) : "",
    projects2: isPresent(data.projects2) ? normalizeText(data.projects2) : "",
    projects3: isPresent(data.projects3) ? normalizeText(data.projects3) : "",

    // New projects array (unlimited)
    projects: Array.isArray(data.projects)
      ? data.projects.map((p) => normalizeText(p)).filter(Boolean)
      : [],

    // Experience
    experienceRole: isPresent(data.experienceRole)
      ? normalizeText(data.experienceRole)
      : "",
    experienceCompany: isPresent(data.experienceCompany)
      ? normalizeText(data.experienceCompany)
      : "",
    experienceDuration: isPresent(data.experienceDuration)
      ? normalizeText(data.experienceDuration)
      : "",
    experienceWorkDetails: isPresent(data.experienceWorkDetails)
      ? normalizeText(data.experienceWorkDetails)
      : "",

    // Personal
    personalCertifications: isPresent(data.personalCertifications)
      ? normalizeText(data.personalCertifications)
      : "",
    personalAchievements: isPresent(data.personalAchievements)
      ? normalizeText(data.personalAchievements)
      : "",
    personalLanguages: isPresent(data.personalLanguages)
      ? normalizeText(data.personalLanguages)
      : "",
    personalDOB: isPresent(data.personalDOB)
      ? normalizeText(data.personalDOB)
      : "",
    personalHobbies: isPresent(data.personalHobbies)
      ? normalizeText(data.personalHobbies)
      : "",
  };

  // Back-compat: if legacy projects1..3 exist and new projects is empty, lift them.
  if (out.projects.length === 0) {
    const lifted = [out.projects1, out.projects2, out.projects3].filter(
      Boolean,
    );
    out.projects = lifted;
  }

  // Derived skills arrays
  out.skillsTechnicalList = splitSkillString(out.skillsTechnical);
  out.skillsToolsList = splitSkillString(out.skillsTools);
  out.skillsSoftList = splitSkillString(out.skillsSoft);

  // Also keep a bullet form for rendering (line breaks or commas)
  out.careerObjectiveBullets = splitLinesToBullets(out.careerObjective);

  return out;
}

export function validateResumeForExport(data) {
  const d = data || {};
  const errors = [];

  if (!isPresent(d.fullName)) errors.push("Full Name is required");
  if (!isPresent(d.email)) errors.push("Email is required");
  // phone is required based on current Builder behavior
  if (!isPresent(d.phone)) errors.push("Phone is required");
  if (!isPresent(d.careerObjective))
    errors.push("Career Objective is required");

  // Projects unlimited is optional; skills/education/experience optional.

  return errors;
}
