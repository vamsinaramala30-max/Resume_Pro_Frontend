/**
 * ResumePrintable - A4-aligned resume preview component.
 *
 * Uses real A4 dimensions (210mm × 297mm) with proper margins (20mm top/bottom, 18mm left/right).
 * This component is designed for both:
 * 1. Live preview in the browser (scaled to fit)
 * 2. PDF export via html2pdf.js (pixel-perfect match)
 *
 * Features:
 * - No horizontal overflow (word-wrap, break-word)
 * - Page-break-inside: avoid for sections
 * - Consistent two-column layout (65/35 split on desktop)
 * - Responsive scaling for mobile/tablet
 * - ATS-friendly (clean structure, no fancy fonts)
 */

import { memo, useMemo } from 'react'
import {
  PAGE_WIDTH_MM,
  PAGE_HEIGHT_MM,
  MARGIN_TOP_MM,
  MARGIN_BOTTOM_MM,
  MARGIN_LEFT_MM,
  MARGIN_RIGHT_MM,
  COLORS,
  TYPOGRAPHY,
  getPageStyle,
  getContentStyle,
} from '../../lib/resumeConfig.js'
import { splitSkillString } from '../../lib/formatters.js'

/**
 * Sanitize text for display - prevents overflow issues.
 */
function sanitizeText(s) {
  if (!s) return ''
  return String(s).trim()
}

/**
 * Format skills as bullet list items.
 */
function SkillsList({ skills, label, showProgress = false, accent }) {
  if (!skills || skills.length === 0) return null

  return (
    <div className="resume-section">
      <div className="font-bold text-xs uppercase tracking-wider" style={{ color: accent }}>
        {label}
      </div>
      <div className="mt-2 space-y-2">
        {skills.slice(0, 12).map((skill) => (
          <div key={skill} className="resume-item">
            <div className="flex items-center justify-between text-xs">
              <span className="truncate" style={{ color: COLORS.text }}>
                {skill}
              </span>
              {showProgress && (
                <span className="text-xs ml-2" style={{ color: accent }}>
                  {Math.min(95, 40 + skill.length * 2)}%
                </span>
              )}
            </div>
            {showProgress && (
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(95, 40 + skill.length * 2)}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Format tools as tags.
 */
function ToolsList({ tools, label, accent }) {
  if (!tools || tools.length === 0) return null

  return (
    <div className="resume-section">
      <div className="font-bold text-xs uppercase tracking-wider" style={{ color: accent }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {tools.slice(0, 14).map((tool) => (
          <span
            key={tool}
            className="text-xs px-2 py-1 rounded-full bg-slate-100"
            style={{ color: COLORS.text, border: `1px solid ${COLORS.border}` }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Section component with page-break-inside: avoid.
 */
function ResumeSection({ title, icon, children, accent, showBorder = true }) {
  if (!children) return null

  return (
    <div
      className="resume-section"
      style={{
        paddingTop: '16px',
        marginTop: '16px',
        borderTop: showBorder ? `1px solid ${COLORS.border}` : 'none',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div
        className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
        style={{ color: accent }}
      >
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

/**
 * Main printable resume component.
 */
function ResumePrintable({ data, templateId = 'modern' }) {
  // Get data with fallbacks
  const resumeData = useMemo(
    () => ({
      fullName: sanitizeText(data?.fullName) || 'Your Name',
      phone: sanitizeText(data?.phone) || 'Phone',
      email: sanitizeText(data?.email) || 'email@example.com',
      linkedIn: sanitizeText(data?.linkedIn) || '',
      portfolio: sanitizeText(data?.portfolio) || '',
      careerObjective: sanitizeText(data?.careerObjective) || 'Add your career objective...',
      educationDegree: sanitizeText(data?.educationDegree) || 'Degree / Branch',
      educationCollege: sanitizeText(data?.educationCollege) || 'College Name',
      educationYearCgpa: sanitizeText(data?.educationYearCgpa) || 'Year & CGPA',
      educationIntermediate: sanitizeText(data?.educationIntermediate) || '—',
      educationSSC: sanitizeText(data?.educationSSC) || '—',
      skillsTechnical: data?.skillsTechnical || '',
      skillsTools: data?.skillsTools || '',
      skillsSoft: data?.skillsSoft || '',
      projects: data?.projects || [data?.projects1, data?.projects2, data?.projects3].filter(Boolean),
      experienceRole: sanitizeText(data?.experienceRole) || 'Role / Company',
      experienceCompany: sanitizeText(data?.experienceCompany) || 'Company',
      experienceDuration: sanitizeText(data?.experienceDuration) || 'Duration',
      experienceWorkDetails: sanitizeText(data?.experienceWorkDetails) || 'Work details...',
      personalCertifications: sanitizeText(data?.personalCertifications) || '—',
      personalAchievements: sanitizeText(data?.personalAchievements) || '—',
      personalLanguages: sanitizeText(data?.personalLanguages) || '—',
      personalDOB: sanitizeText(data?.personalDOB) || '—',
      personalHobbies: sanitizeText(data?.personalHobbies) || '—',
    }),
    [data]
  )

  // Parse skills
  const skillsTechnical = useMemo(() => splitSkillString(resumeData.skillsTechnical), [resumeData.skillsTechnical])
  const skillsTools = useMemo(() => splitSkillString(resumeData.skillsTools), [resumeData.skillsTools])
  const skillsSoft = useMemo(() => splitSkillString(resumeData.skillsSoft), [resumeData.skillsSoft])

  // Theme colors based on template
  const theme = useMemo(() => {
    const themes = {
      modern: { headerBg: '#0F172A', accent: '#3B82F6' },
      classic: { headerBg: '#1F2937', accent: '#6B7280' },
      royal: { headerBg: '#0F172A', accent: '#C5A045' },
      minimal: { headerBg: '#FFFFFF', accent: '#0F172A' },
      creative: { headerBg: '#7C3AED', accent: '#F59E0B' },
    }
    return themes[templateId] || themes.modern
  }, [templateId])

  const headerBg = theme.headerBg
  const accent = theme.accent

  // Page and content styles
  const pageStyle = getPageStyle()
  const contentStyle = getContentStyle()

  // Filter out empty projects
  const projects = useMemo(
    () => resumeData.projects.filter((p) => p && sanitizeText(p)),
    [resumeData.projects]
  )

  return (
    <div className="resume-page-container" style={{ width: '100%', overflow: 'hidden' }}>
      {/* A4 Page */}
      <div
        id="resume-preview-print"
        className="resume-page"
        style={{
          ...pageStyle,
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.bodySize,
          lineHeight: TYPOGRAPHY.lineHeight,
          color: COLORS.text,
          maxWidth: '100%',
          overflow: 'visible',
        }}
      >
        {/* Content area */}
        <div
          className="resume-content"
          style={{
            ...contentStyle,
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
          }}
        >
          {/* Header Section */}
          <div
            className="resume-header"
            style={{
              background: headerBg,
              padding: '20px 24px',
              margin: `-${MARGIN_TOP_MM}mm -${MARGIN_LEFT_MM}mm 0 -${MARGIN_LEFT_MM}mm`,
              marginTop: `-${MARGIN_TOP_MM}mm`,
              paddingTop: '20px',
            }}
          >
            <div className="flex items-start gap-5">
              {/* Profile Image */}
              <div
                className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                {data?.profileImageDataUrl ? (
                  <img
                    src={data.profileImageDataUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-3xl"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    👤
                  </div>
                )}
              </div>

              {/* Name & Contact Info */}
              <div className="min-w-0 flex-1">
                <h1
                  className="text-3xl font-extrabold text-white leading-tight truncate"
                  style={{
                    fontSize: TYPOGRAPHY.nameSize,
                    fontWeight: TYPOGRAPHY.nameWeight,
                  }}
                >
                  {resumeData.fullName}
                </h1>

                <div
                  className="text-sm mt-1 flex flex-wrap gap-2"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  <span>{resumeData.phone}</span>
                  <span>•</span>
                  <span>{resumeData.email}</span>
                  {resumeData.linkedIn && (
                    <>
                      <span>•</span>
                      <span style={{ color: accent }}>{resumeData.linkedIn}</span>
                    </>
                  )}
                </div>

                {resumeData.portfolio && (
                  <div
                    className="text-xs mt-1"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Portfolio:{' '}
                    <span style={{ color: accent }}>{resumeData.portfolio}</span>
                  </div>
                )}

                {/* Career Objective in header */}
                <div className="mt-3">
                  <div
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: accent }}
                  >
                    Career Objective
                  </div>
                  <div
                    className="text-sm mt-1 leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {resumeData.careerObjective}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="resume-body" style={{ marginTop: '16px' }}>
            <div
              className="grid"
              style={{ gridTemplateColumns: '65% 35%', gap: '20px' }}
            >
              {/* Left Column - 65% */}
              <div className="resume-left-column">
                {/* Education */}
                <ResumeSection title="Education" icon="🎓" accent={accent}>
                  <div className="space-y-2 text-sm">
                    <div className="font-bold text-base">
                      {resumeData.educationDegree}
                    </div>
                    <div>{resumeData.educationCollege}</div>
                    <div style={{ color: COLORS.textSecondary }}>
                      {resumeData.educationYearCgpa}
                    </div>
                    <div style={{ color: COLORS.textSecondary }}>
                      Intermediate: {resumeData.educationIntermediate}
                    </div>
                    <div style={{ color: COLORS.textSecondary }}>
                      SSC: {resumeData.educationSSC}
                    </div>
                  </div>
                </ResumeSection>

                {/* Projects */}
                {projects.length > 0 && (
                  <ResumeSection title="Projects" icon="💡" accent={accent}>
                    <div className="space-y-3 text-sm">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className="resume-item"
                          style={{
                            pageBreakInside: 'avoid',
                            breakInside: 'avoid',
                          }}
                        >
                          <div className="font-bold text-base">
                            Project {index + 1}
                          </div>
                          <div
                            className="whitespace-pre-wrap"
                            style={{
                              color: COLORS.text,
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                            }}
                          >
                            {project}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ResumeSection>
                )}

                {/* Experience */}
                <ResumeSection title="Experience" icon="🧑‍💼" accent={accent}>
                  <div className="text-sm">
                    <div className="font-bold text-base">
                      {resumeData.experienceRole}
                    </div>
                    <div>{resumeData.experienceCompany}</div>
                    <div style={{ color: COLORS.textSecondary }}>
                      {resumeData.experienceDuration}
                    </div>
                    <div
                      className="mt-2 whitespace-pre-wrap"
                      style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {resumeData.experienceWorkDetails}
                    </div>
                  </div>
                </ResumeSection>

                {/* Certifications & Achievements */}
                <ResumeSection
                  title="Certifications & Achievements"
                  icon="🏆"
                  accent={accent}
                >
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-bold">Certifications:</span>{' '}
                      {resumeData.personalCertifications}
                    </div>
                    <div>
                      <span className="font-bold">Achievements:</span>{' '}
                      {resumeData.personalAchievements}
                    </div>
                    <div>
                      <span className="font-bold">Languages:</span>{' '}
                      {resumeData.personalLanguages}
                    </div>
                    <div>
                      <span className="font-bold">DOB:</span> {resumeData.personalDOB}
                    </div>
                    <div>
                      <span className="font-bold">Hobbies:</span>{' '}
                      {resumeData.personalHobbies}
                    </div>
                  </div>
                </ResumeSection>
              </div>

              {/* Right Column - 35% */}
              <div className="resume-right-column">
                {/* Skills - Technical */}
                <div
                  className="mb-4"
                  style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                >
                  <SkillsList
                    skills={skillsTechnical}
                    label="Technical Skills"
                    showProgress
                    accent={accent}
                  />
                </div>

                {/* Skills - Tools */}
                <div
                  className="mb-4"
                  style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                >
                  <ToolsList
                    tools={skillsTools}
                    label="Tools & Platforms"
                    accent={accent}
                  />
                </div>

                {/* Skills - Soft */}
                <div
                  className="mb-4"
                  style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                >
                  {skillsSoft.length > 0 && (
                    <div className="resume-section">
                      <div
                        className="font-bold text-xs uppercase tracking-wider"
                        style={{ color: accent }}
                      >
                        Soft Skills
                      </div>
                      <div
                        className="text-xs mt-2"
                        style={{ color: COLORS.text }}
                      >
                        {skillsSoft.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                  <div className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>
                    Personal
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="font-medium">DOB:</span> {resumeData.personalDOB}
                    </div>
                    <div>
                      <span className="font-medium">Languages:</span> {resumeData.personalLanguages}
                    </div>
                    <div>
                      <span className="font-medium">Hobbies:</span> {resumeData.personalHobbies}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ResumePrintable)