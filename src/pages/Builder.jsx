import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import html2pdf from 'html2pdf.js'
import { Download, Crown, Star, User, Camera, Target, GraduationCap, Brain, Lightbulb, Briefcase, Award, Palette } from 'lucide-react'

import SectionCard from "../components/SectionCard.jsx";
import FloatingInput from "../components/FloatingInput.jsx";
import FloatingTextArea from "../components/FloatingTextArea.jsx";
import LoadingButton from "../components/LoadingButton.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import { TEMPLATE_SAMPLES } from "../lib/templateSamples.js";
import { RESUME_DEFAULTS } from "../lib/resumeDefaults.js";
import { readJSON, writeJSON, STORAGE_KEYS } from "../lib/storage.js";
import { isValidEmail } from "../lib/validators.js";
import { splitSkillString } from "../lib/formatters.js";
import {
  sanitizeResumeData,
  validateResumeForExport,
} from "../lib/resumeSanitizer.js";
import ResumePrintable from "../components/resume/ResumePrintable.jsx";
import {
  getPdfOptions,
  getPageStyle,
  getContentStyle,
  PAGE_WIDTH_MM,
  PAGE_HEIGHT_MM,
  COLORS,
} from "../lib/resumeConfig.js";

const CLOUD_AUTO_KEY = STORAGE_KEYS.resume;

function mergeResume(prev, patch) {
  return { ...prev, ...patch };
}

function sanitizeText(s) {
  return String(s ?? "");
}

function useAutosave({ data, enabled, delayMs = 3000 }) {
  const timerRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      writeJSON(CLOUD_AUTO_KEY, data);
    }, delayMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, enabled, delayMs]);
}

function ResumePreview({ data, templateId }) {
  const skills = splitSkillString(data.skillsTechnical);
  const tools = splitSkillString(data.skillsTools);
  const soft = splitSkillString(data.skillsSoft);

  const templateTheme = TEMPLATE_SAMPLES[templateId] || TEMPLATE_SAMPLES.modern;
  const accent = templateTheme.accent || "#3B82F6";

  // A4 page style for container
  const pageStyle = getPageStyle()
  const contentStyle = getContentStyle()

  return (
    <div className="relative">
      <div
        className="rounded-3xl border border-white/15 shadow-2xl overflow-hidden"
        style={{
          width: 'fit-content',
          maxWidth: '100%',
        }}
      >
        <div
          className="p-5 md:p-7"
          style={{
            background: templateTheme.headerBg,
            minWidth: PAGE_WIDTH_MM + 'mm',
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-4">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/10 border border-white/15 overflow-hidden flex-shrink-0 shadow-inner"
              style={{ boxShadow: `inset 0 0 0 1px ${accent}22` }}
            >
              {data.profileImageDataUrl ? (
                <img
                  src={data.profileImageDataUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  {sanitizeText(data.fullName) || "Your Name"}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-200">
                  Royal Resume
                </span>
              </div>

              <div className="mt-2 text-sm text-slate-200/90 flex flex-wrap gap-3">
                <span>{sanitizeText(data.phone) || "Phone"}</span>
                <span className="opacity-60">•</span>
                <span>{sanitizeText(data.email) || "Email"}</span>
                {data.linkedIn ? (
                  <>
                    <span className="opacity-60">•</span>
                    <span>
                      LinkedIn: <span className="text-primary">{data.linkedIn}</span>
                    </span>
                  </>
                ) : null}
              </div>

              {data.portfolio ? (
                <div className="text-xs mt-1 text-slate-300">
                  Portfolio: <span className="text-primary">{data.portfolio}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Skill sidebar (left) + content */}
          <div className="mt-6 grid md:grid-cols-[240px_1fr] gap-6">
            <aside>
              <div className="text-primary font-black text-sm uppercase tracking-wider mb-3">Skills</div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-bold text-white/90 mb-2">
                    Technical
                  </div>
                  <div className="space-y-2">
                    {skills.length ? (
                      skills.slice(0, 10).map((s) => (
                        <div key={s}>
                          <div className="flex items-center justify-between text-xs text-slate-200">
                            <span className="truncate pr-3">{s}</span>
                            <span className="text-primary/90">{Math.min(95, 45 + s.length * 2)}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${Math.min(95, 45 + s.length * 2)}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-300">
                        Add technical skills
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-white/90 mb-2">
                    Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tools.length ? (
                      tools.slice(0, 12).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-300">
                        Add tools/platforms
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-white/90 mb-2">
                    Soft Skills
                  </div>
                  <div className="text-xs text-slate-200/90 leading-relaxed">
                    {soft.length ? soft.join(" • ") : "Add soft skills"}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-white/90 mb-2">
                    Personal
                  </div>
                  <div className="text-xs text-slate-200/90 leading-relaxed">
                    <div>
                      <span className="text-slate-300">DOB:</span> <span className="text-primary">{data.personalDOB || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-300">Hobbies:</span>{" "}
                      <span className="text-slate-200">
                        {data.personalHobbies || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-300">Languages:</span>{" "}
                      <span className="text-slate-200">
                        {data.personalLanguages || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="space-y-5">
              <div className="border-t border-white/10 pt-5">
                <div className="text-primary font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>Career Objective</span> <Target className="w-4 h-4 ml-1" />
                </div>
                <p className="text-sm text-slate-200/95 leading-relaxed whitespace-pre-wrap">
                  {data.careerObjective || "Add your career objective..."}
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="text-primary font-black text-sm uppercase tracking-wider mb-2">Education</div>
                <div className="space-y-2">
                  <div className="font-bold text-white/95">
                    {data.educationDegree || "Degree / Branch"}
                  </div>
                  <div className="text-sm text-slate-200/90">
                    {data.educationCollege || "College Name"}
                  </div>
                  <div className="text-sm text-slate-200/90">
                    {data.educationYearCgpa || "Year & CGPA"}
                  </div>
                  <div className="text-sm text-slate-200/80">
                    Intermediate: {data.educationIntermediate || "—"}
                  </div>
                  <div className="text-sm text-slate-200/80">
                    SSC: {data.educationSSC || "—"}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="text-primary font-black text-sm uppercase tracking-wider mb-2">Projects</div>
                <div className="space-y-3">
                  {[data.projects1, data.projects2, data.projects3].map(
                    (p, idx) => (
                      <div key={idx}>
                        <div className="font-bold text-white/95 text-sm">
                          Project {idx + 1}
                        </div>
                        <div className="text-sm text-slate-200/90 whitespace-pre-wrap">
                          {p || "Add project impact..."}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="text-primary font-black text-sm uppercase tracking-wider mb-2">Internship / Experience</div>
                <div>
                  <div className="font-bold text-white/95 text-sm">
                    {data.experienceRole || "Role / Company"}
                  </div>
                  <div className="text-sm text-slate-200/90">
                    {data.experienceCompany || "Company"}
                  </div>
                  <div className="text-sm text-slate-200/80 mt-1">
                    {data.experienceDuration || "Duration"}
                  </div>
                  <div className="text-sm text-slate-200/90 mt-2 whitespace-pre-wrap">
                    {data.experienceWorkDetails || "Work details..."}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="text-primary font-black text-sm uppercase tracking-wider mb-2">Certifications & Personal</div>
                <div className="space-y-2">
                  <div className="text-sm text-slate-200/90"><span className="text-primary font-bold">Certifications:</span> {data.personalCertifications || '—'}</div>
                  <div className="text-sm text-slate-200/90"><span className="text-primary font-bold">Achievements:</span> {data.personalAchievements || '—'}</div>
                  <div className="text-sm text-slate-200/90"><span className="text-primary font-bold">Languages:</span> {data.personalLanguages || '—'}</div>
                  <div className="text-sm text-slate-200/90"><span className="text-primary font-bold">DOB:</span> {data.personalDOB || '—'}</div>
                  <div className="text-sm text-slate-200/90"><span className="text-primary font-bold">Hobbies:</span> {data.personalHobbies || '—'}</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-300/80">
                Template: <span className="text-primary">{templateId}</span>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuilderForm({ data, setData, templateId, setTemplateId, showToast }) {
  const fileInputRef = useRef(null);

  const set = (patch) => setData((prev) => mergeResume(prev, patch));

  const validate = () => {
    if (!data.fullName.trim()) return "Full Name is required";
    if (!data.email.trim() || !isValidEmail(data.email))
      return "Please enter a valid Email";
    if (!data.phone.trim()) return "Phone is required";
    if (!data.careerObjective.trim()) return "Career Objective is required";
    return "";
  };

  const exportPdf = async () => {
    const err = validate();
    if (err) {
      showToast("error", "Fix required", err);
      return;
    }
    try {
      showToast("info", "Preparing PDF", "Generating A4 resume…");
      const el = document.getElementById("resume-preview-print");
      if (!el) throw new Error("Preview not found");

      const filename = `${(data.fullName || "resume").replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
      const opt = getPdfOptions(filename)

      await html2pdf().set(opt).from(el).save();
      showToast("success", "Exported", "PDF downloaded successfully.");
    } catch (e) {
      showToast("error", "PDF failed", e?.message || "Try again");
    }
  };

  return (
    <div className="space-y-6">
      {/* Royal Profile */}
      <SectionCard icon={<User className="w-5 h-5" />} title="Royal Profile Info" subtitle="Identity & contact (premium formatting)" >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-primary/40 overflow-hidden flex-shrink-0">
                {data.profileImageDataUrl ? (
                  <img
                    src={data.profileImageDataUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary">
                    <Camera className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const reader = new FileReader();
                    reader.onload = () =>
                      set({ profileImageDataUrl: String(reader.result || "") });
                    reader.readAsDataURL(f);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-primary transition text-sm font-bold"
                >
                  Upload Profile Image
                </button>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FloatingInput
              label="Full Name"
              value={data.fullName}
              onChange={(e) => set({ fullName: e.target.value })}
            />
            <FloatingInput
              label="Phone"
              value={data.phone}
              onChange={(e) => set({ phone: e.target.value })}
            />
            <FloatingInput
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => set({ email: e.target.value })}
            />
            <FloatingInput
              label="LinkedIn"
              value={data.linkedIn}
              onChange={(e) => set({ linkedIn: e.target.value })}
            />
            <div className="sm:col-span-2">
              <FloatingInput
                label="Portfolio"
                value={data.portfolio}
                onChange={(e) => set({ portfolio: e.target.value })}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Career Objective */}
      <SectionCard icon={<Target className="w-5 h-5" />} title="Career Objective" subtitle="Auto-formatted and live preview synced">
        <FloatingTextArea label="Career Objective" value={data.careerObjective} onChange={(e) => set({ careerObjective: e.target.value })} rows={4} />
      </SectionCard>

      {/* Education */}
      <SectionCard icon={<GraduationCap className="w-5 h-5" />} title="Education History" subtitle="Degree, college, and summary">
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Degree / Branch"
            value={data.educationDegree}
            onChange={(e) => set({ educationDegree: e.target.value })}
          />
          <FloatingInput
            label="College Name"
            value={data.educationCollege}
            onChange={(e) => set({ educationCollege: e.target.value })}
          />
          <FloatingInput
            label="Year & CGPA"
            value={data.educationYearCgpa}
            onChange={(e) => set({ educationYearCgpa: e.target.value })}
          />
          <FloatingInput
            label="Intermediate"
            value={data.educationIntermediate}
            onChange={(e) => set({ educationIntermediate: e.target.value })}
          />
          <div className="md:col-span-2">
            <FloatingInput
              label="SSC"
              value={data.educationSSC}
              onChange={(e) => set({ educationSSC: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>

      {/* Skills */}
      <SectionCard icon={<Brain className="w-5 h-5" />} title="Skills & Expertise" subtitle="Technical + tools + soft skills">
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Technical Skills (comma separated)"
            value={data.skillsTechnical}
            onChange={(e) => set({ skillsTechnical: e.target.value })}
          />
          <FloatingInput
            label="Tools & Platforms (comma separated)"
            value={data.skillsTools}
            onChange={(e) => set({ skillsTools: e.target.value })}
          />
          <div className="md:col-span-2">
            <FloatingInput
              label="Soft Skills (comma separated)"
              value={data.skillsSoft}
              onChange={(e) => set({ skillsSoft: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>

      {/* Projects */}
      <SectionCard icon={<Lightbulb className="w-5 h-5" />} title="Projects (Key Impact)" subtitle="Add what you built and impact">
        <div className="grid md:grid-cols-3 gap-4">
          <FloatingTextArea
            label="Project 1"
            value={data.projects1}
            onChange={(e) => set({ projects1: e.target.value })}
            rows={4}
          />
          <FloatingTextArea
            label="Project 2"
            value={data.projects2}
            onChange={(e) => set({ projects2: e.target.value })}
            rows={4}
          />
          <FloatingTextArea
            label="Project 3"
            value={data.projects3}
            onChange={(e) => set({ projects3: e.target.value })}
            rows={4}
          />
        </div>
      </SectionCard>

      {/* Internship / Experience */}
      <SectionCard icon={<Briefcase className="w-5 h-5" />} title="Internship / Experience" subtitle="Role, duration and responsibilities">
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Role / Company"
            value={data.experienceRole}
            onChange={(e) => set({ experienceRole: e.target.value })}
          />
          <FloatingInput
            label="Duration"
            value={data.experienceDuration}
            onChange={(e) => set({ experienceDuration: e.target.value })}
          />
          <FloatingInput
            label="Work Company"
            value={data.experienceCompany}
            onChange={(e) => set({ experienceCompany: e.target.value })}
          />
          <div className="md:col-span-2">
            <FloatingTextArea
              label="Work Details"
              value={data.experienceWorkDetails}
              onChange={(e) => set({ experienceWorkDetails: e.target.value })}
              rows={4}
            />
          </div>
        </div>
      </SectionCard>

      {/* Personal */}
      <SectionCard icon={<Award className="w-5 h-5" />} title="Accomplishments & Personal" subtitle="Certifications, languages, DOB and hobbies">
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Certifications"
            value={data.personalCertifications}
            onChange={(e) => set({ personalCertifications: e.target.value })}
          />
          <FloatingInput
            label="Achievements"
            value={data.personalAchievements}
            onChange={(e) => set({ personalAchievements: e.target.value })}
          />
          <FloatingInput
            label="Languages"
            value={data.personalLanguages}
            onChange={(e) => set({ personalLanguages: e.target.value })}
          />
          <FloatingInput
            label="DOB"
            value={data.personalDOB}
            onChange={(e) => set({ personalDOB: e.target.value })}
          />
          <div className="md:col-span-2">
            <FloatingInput
              label="Hobbies"
              value={data.personalHobbies}
              onChange={(e) => set({ personalHobbies: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>

      {/* Template + actions */}
      <SectionCard icon={<Palette className="w-5 h-5" />} title="Resume Theme & Export" subtitle="Templates + PDF/Print">
        <div className="space-y-5">
          <div>
            <div className="text-sm font-bold text-slate-100 mb-2">
              Choose a template
            </div>
            <TemplateSelector
              template={templateId}
              setTemplate={setTemplateId}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <LoadingButton
              onClick={exportPdf}
              loading={false}
              type="button"
              className="bg-primary text-royal-navy hover:brightness-110"
            >
              Save to Cloud
            </LoadingButton>

            <LoadingButton onClick={exportPdf} loading={false} type="button" className="bg-white/5 border border-white/10 text-white hover:border-primary">
              <Download className="w-5 h-5" /> Download PDF
            </LoadingButton>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 text-white hover:border-primary transition"
            >
              Print Resume
            </button>
          </div>


          <div className="text-xs text-slate-300/80">
            Auto-save runs every few seconds. Export uses A4 multi-page PDF via
            html2pdf.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default function Builder({ user, showToast = (type, title, message) => {
  window.dispatchEvent(
    new CustomEvent('royal-toast', { detail: { type, title, message } }),
  )
}, initialTab = "builder" }) {
  const [templateId, setTemplateId] = useState("modern");
  const [tabMode, setTabMode] = useState(
    initialTab === "preview" ? "preview" : "builder",
  );

  const [data, setData] = useState(() => {
    const saved = readJSON(CLOUD_AUTO_KEY, null);
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS };
  });

  useAutosave({ data, enabled: Boolean(user), delayMs: 2500 });

  // Live sync: typing animations (lightweight)
  const [typingPulse, setTypingPulse] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setTypingPulse((x) => x + 1), 10);
    return () => clearTimeout(t);
  }, [data]);

  // gate preview tab (done at App routing)
  const previewTitle =
    tabMode === "preview" ? "Royal Preview" : "Royal Builder";

  return (
    <div className="relative z-10 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-primary font-black text-h2 tracking-tight">{previewTitle}</h1>
          <p className="text-foreground/70 mt-2 text-body-large">Real-time synchronization, templates, and premium export.</p>
        </div>

        <div className="flex items-center gap-3 bg-surface-elevated/50 p-1.5 rounded-2xl border border-border">
          <button
            type="button"
            onClick={() => setTabMode("builder")}
            className={
              'px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ' +
              (tabMode === 'builder'
                ? 'bg-surface text-foreground shadow-elevation-1'
                : 'text-foreground/60 hover:text-foreground')
            }
          >
            <Crown className="w-4 h-4 text-primary" /> Builder
          </button>
          <button
            type="button"
            onClick={() => setTabMode("preview")}
            className={
              'px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ' +
              (tabMode === 'preview'
                ? 'bg-surface text-foreground shadow-elevation-1'
                : 'text-foreground/60 hover:text-foreground')
            }
          >
            <Crown className="w-4 h-4 text-primary" /> Preview
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabMode}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {tabMode === "builder" ? (
            <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
              <div>
                <BuilderForm
                  data={data}
                  setData={setData}
                  templateId={templateId}
                  setTemplateId={setTemplateId}
                  showToast={showToast}
                />
              </div>

              <div className="sticky top-24 self-start">
                {/* Live preview container - show at 45% scale for readability, maintains A4 dimensions for PDF */}
                <div className="mb-3 text-sm font-bold text-slate-200/90">
                  Live preview
                </div>
                <div
                  className="overflow-x-auto"
                  style={{
                    width: '420px',
                    maxWidth: '100%',
                  }}
                >
                  <div
                    className="origin-top"
                    style={{
                      transform: 'scale(0.45)',
                      transformOrigin: 'top left',
                      width: PAGE_WIDTH_MM + 'mm',
                      minWidth: PAGE_WIDTH_MM + 'mm',
                    }}
                  >
                      <ResumePrintable
                        data={sanitizeResumeData(data)}
                        templateId={templateId}
                      />
                  </div>
                  </div>
                </div>
              </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
              <div className="lg:order-2">
                <BuilderForm
                  data={data}
                  setData={setData}
                  templateId={templateId}
                  setTemplateId={setTemplateId}
                  showToast={showToast}
                />
              </div>
              <div className="lg:order-1">
                <div className="mb-3 text-sm font-bold text-slate-200/90">
                  Royal resume paper
                </div>
                <div className="overflow-x-auto">
                  <ResumePrintable
                    data={sanitizeResumeData(data)}
                    templateId={templateId}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
