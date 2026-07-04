// ATS Score Engine
// Calculates resume ATS (Applicant Tracking System) compatibility score

// Weight configuration for each section
const WEIGHTS = {
  contactInfo: 10,
  skills: 20,
  projects: 15,
  education: 10,
  experience: 20,
  keywords: 15,
  formatting: 10,
}

// Common tech keywords for keyword density checking
const TECH_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'express',
  'mongodb', 'sql', 'postgresql', 'mysql', 'docker', 'kubernetes', 'aws', 'azure', 'gcp',
  'git', 'github', 'rest', 'api', 'graphql', 'html', 'css', 'tailwind', 'redux',
  'machine learning', 'ai', 'data science', 'analytics', 'testing', 'jest', 'cypress',
]

const SOFT_SKILL_KEYWORDS = [
  'leadership', 'teamwork', 'communication', 'problem-solving', 'analytical', 'creative',
  'collaboration', 'adaptable', 'initiative', 'time management', 'project management',
]

/**
 * Count words in a string
 */
function countWords(str) {
  if (!str || typeof str !== 'string') return 0
  return str.trim().split(/\s+/).filter(w => w.length > 0).length
}

/**
 * Check if a string has meaningful content
 */
function hasContent(str) {
  if (!str || typeof str !== 'string') return false
  const trimmed = str.trim()
  return trimmed.length > 2
}

/**
 * Calculate contact info score (up to 10 points)
 */
function calculateContactScore(resume) {
  let score = 0
  const fields = ['fullName', 'email', 'phone']

  fields.forEach(field => {
    if (hasContent(resume[field])) {
      score += 3.33
    }
  })

  // LinkedIn or portfolio adds extra points
  if (hasContent(resume.linkedIn) || hasContent(resume.portfolio)) {
    score += 1
  }

  // Simple email validation check
  if (resume.email && resume.email.includes('@') && resume.email.includes('.')) {
    // Valid email format
  }

  return Math.min(WEIGHTS.contactInfo, Math.round(score))
}

/**
 * Calculate skills score (up to 20 points)
 */
function calculateSkillsScore(resume) {
  let score = 0
  const skillsFields = ['skillsTechnical', 'skillsTools', 'skillsSoft']

  skillsFields.forEach(field => {
    const wordCount = countWords(resume[field])
    if (wordCount >= 3) score += 6
    else if (wordCount >= 1) score += 3
  })

  return Math.min(WEIGHTS.skills, score)
}

/**
 * Calculate projects score (up to 15 points)
 */
function calculateProjectsScore(resume) {
  let score = 0
  const projects = ['projects1', 'projects2', 'projects3']

  projects.forEach(field => {
    if (hasContent(resume[field])) {
      const wordCount = countWords(resume[field])
      if (wordCount >= 20) score += 5
      else if (wordCount >= 10) score += 4
      else if (wordCount >= 5) score += 3
      else score += 2
    }
  })

  return Math.min(WEIGHTS.projects, score)
}

/**
 * Calculate education score (up to 10 points)
 */
function calculateEducationScore(resume) {
  let score = 0

  if (hasContent(resume.educationDegree) || hasContent(resume.educationCollege)) {
    score += 6
  }

  if (hasContent(resume.educationYearCgpa) || hasContent(resume.educationIntermediate)) {
    score += 4
  }

  return Math.min(WEIGHTS.education, score)
}

/**
 * Calculate experience score (up to 20 points)
 */
function calculateExperienceScore(resume) {
  let score = 0

  if (hasContent(resume.experienceRole)) score += 6
  if (hasContent(resume.experienceCompany)) score += 4
  if (hasContent(resume.experienceDuration)) score += 4
  if (hasContent(resume.experienceWorkDetails)) {
    const wordCount = countWords(resume.experienceWorkDetails)
    if (wordCount >= 30) score += 6
    else if (wordCount >= 15) score += 4
    else score += 2
  }

  return Math.min(WEIGHTS.experience, score)
}

/**
 * Calculate keywords score (up to 15 points)
 */
function calculateKeywordsScore(resume) {
  let score = 0

  // Combine all text fields
  const allText = [
    resume.skillsTechnical,
    resume.skillsTools,
    resume.experienceWorkDetails,
    resume.projects1,
    resume.projects2,
    resume.projects3,
    resume.careerObjective,
  ].join(' ').toLowerCase()

  // Check tech keywords
  let techMatches = 0
  TECH_KEYWORDS.forEach(keyword => {
    if (allText.includes(keyword)) techMatches++
  })

  if (techMatches >= 8) score += 8
  else if (techMatches >= 5) score += 6
  else if (techMatches >= 3) score += 4
  else if (techMatches >= 1) score += 2

  // Check soft skill keywords
  let softMatches = 0
  SOFT_SKILL_KEYWORDS.forEach(keyword => {
    if (allText.includes(keyword)) softMatches++
  })

  if (softMatches >= 3) score += 4
  else if (softMatches >= 1) score += 2

  // Career objective adds points
  if (hasContent(resume.careerObjective)) {
    const wordCount = countWords(resume.careerObjective)
    if (wordCount >= 15) score += 3
    else if (wordCount >= 5) score += 1
  }

  return Math.min(WEIGHTS.keywords, score)
}

/**
 * Calculate formatting score (up to 10 points)
 * This is a basic heuristic check
 */
function calculateFormattingScore(resume) {
  let score = 10 // Start with full score, deduct for issues

  // Check for empty required sections
  const requiredSections = 6 // Basic sections every resume should have
  let filledSections = 0

  if (hasContent(resume.fullName) || hasContent(resume.email)) filledSections++
  if (hasContent(resume.skillsTechnical)) filledSections++
  if (hasContent(resume.educationDegree) || hasContent(resume.educationCollege)) filledSections++
  if (hasContent(resume.projects1)) filledSections++
  if (hasContent(resume.experienceRole) || hasContent(resume.experienceWorkDetails)) filledSections++
  if (hasContent(resume.careerObjective)) filledSections++

  if (filledSections < 3) return 3
  if (filledSections < 5) return 6

  return score
}

/**
 * Calculate overall ATS score for a resume
 * @param {Object} resume - Resume data object
 * @returns {Object} Score breakdown and total
 */
export function calculateATSScore(resume) {
  if (!resume || typeof resume !== 'object') {
    return {
      total: 0,
      breakdown: {},
      grade: 'F',
    }
  }

  const contactScore = calculateContactScore(resume)
  const skillsScore = calculateSkillsScore(resume)
  const projectsScore = calculateProjectsScore(resume)
  const educationScore = calculateEducationScore(resume)
  const experienceScore = calculateExperienceScore(resume)
  const keywordsScore = calculateKeywordsScore(resume)
  const formattingScore = calculateFormattingScore(resume)

  const total = contactScore + skillsScore + projectsScore + educationScore +
               experienceScore + keywordsScore + formattingScore

  const breakdown = {
    contactInfo: { score: contactScore, max: WEIGHTS.contactInfo },
    skills: { score: skillsScore, max: WEIGHTS.skills },
    projects: { score: projectsScore, max: WEIGHTS.projects },
    education: { score: educationScore, max: WEIGHTS.education },
    experience: { score: experienceScore, max: WEIGHTS.experience },
    keywords: { score: keywordsScore, max: WEIGHTS.keywords },
    formatting: { score: formattingScore, max: WEIGHTS.formatting },
  }

  let grade = 'F'
  if (total >= 90) grade = 'A+'
  else if (total >= 80) grade = 'A'
  else if (total >= 70) grade = 'B'
  else if (total >= 60) grade = 'C'
  else if (total >= 50) grade = 'D'

  return {
    total: Math.round(total),
    breakdown,
    grade,
  }
}

/**
 * Get color for score
 */
export function getScoreColor(score) {
  if (score >= 80) return '#22c55e' // green
  if (score >= 60) return '#f59e0b' // orange
  return '#ef4444' // red
}

/**
 * Get grade color
 */
export function getGradeColor(grade) {
  if (grade.startsWith('A')) return '#22c55e' // green
  if (grade === 'B') return '#84cc16' // lime
  if (grade === 'C') return '#f59e0b' // orange
  if (grade === 'D') return '#f97316' // orange-red
  return '#ef4444' // red
}