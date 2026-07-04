// Free templates - available to all users
export const TEMPLATE_SAMPLES = {
  // Free templates
  ats: {
    id: 'ats',
    label: 'Basic ATS Template',
    tagline: 'Clean layout optimized for ATS',
    accent: '#93c5fd',
    headerBg: 'linear-gradient(180deg, #0a192f 0%, #0b1733 100%)',
    bg: svgDataUri({ a: '#061427', b: '#0b1733', accent: '#93c5fd', progress: 42 }),
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 42,
    premium: false,
  },
  corporate: {
    id: 'corporate',
    label: 'Professional Template',
    tagline: 'Executive readability + structure',
    accent: '#c5a045',
    headerBg: 'linear-gradient(135deg, #0a192f 0%, #0b1838 100%)',
    bg: svgDataUri({ a: '#0b1733', b: '#111c37', accent: '#c5a045', progress: 55 }),
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 55,
    premium: false,
  },
  minimal: {
    id: 'minimal',
    label: 'Minimal Template',
    tagline: 'Ultra minimal, print-ready',
    accent: '#111827',
    headerBg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    bg: svgDataUri({ a: '#f8fafc', b: '#e2e8f0', accent: '#111827' }),
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 35,
    premium: false,
  },

  // Premium templates - locked for free users
  modern: {
    id: 'modern',
    label: 'Modern Gradient Template',
    tagline: 'Modern ATS + premium polish',
    accent: '#c5a045',
    headerBg: 'linear-gradient(135deg, #0b1022 0%, #0d1734 40%, #0a192f 100%)',
    bg: svgDataUri({ a: '#0b1022', b: '#0d1734', accent: '#c5a045', progress: 50 }),
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 50,
    premium: true,
  },
  royal: {
    id: 'royal',
    label: 'Royal Template',
    tagline: 'Executive luxury for top careers',
    accent: '#F5C04A',
    headerBg: 'linear-gradient(135deg, #1a1510 0%, #2d2415 50%, #1a1510 100%)',
    bg: svgDataUri({ a: '#1a1510', b: '#2d2415', accent: '#F5C04A', progress: 72 }),
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 72,
    premium: true,
  },
  luxury: {
    id: 'luxury',
    label: 'Luxury Template',
    tagline: 'Premium design for executive roles',
    accent: '#7C3AED',
    headerBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    bg: svgDataUri({ a: '#1e1b4b', b: '#312e81', accent: '#7C3AED', progress: 68 }),
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 68,
    premium: true,
  },
  creative: {
    id: 'creative',
    label: 'Creative Portfolio Template',
    tagline: 'Creative flair without losing clarity',
    accent: '#c5a045',
    headerBg: 'radial-gradient(circle at 10% 20%, rgba(197,160,89,0.35) 0%, rgba(197,160,89,0) 45%), linear-gradient(135deg, #0a1020 0%, #111c37 100%)',
    bg: svgDataUri({ a: '#0a1020', b: '#111c37', accent: '#c5a045', glow: true, progress: 62 }),
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 62,
    premium: true,
  },
  executive: {
    id: 'executive',
    label: 'Executive Template',
    tagline: 'Senior executive presence',
    accent: '#0ea5e9',
    headerBg: 'linear-gradient(135deg, #0c1929 0%, #164e63 100%)',
    bg: svgDataUri({ a: '#0c1929', b: '#164e63', accent: '#0ea5e9', progress: 66 }),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 66,
    premium: true,
  },
  sleek: {
    id: 'sleek',
    label: 'Premium ATS Collection',
    tagline: 'ATS-optimized premium design',
    accent: '#60a5fa',
    headerBg: 'linear-gradient(135deg, #071023 0%, #0b1628 100%)',
    bg: svgDataUri({ a: '#071023', b: '#0b1628', accent: '#60a5fa' }),
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
    progress: 48,
    premium: true,
  },
};

// Filter templates by access level
export const FREE_TEMPLATES = Object.values(TEMPLATE_SAMPLES).filter(t => !t.premium);
export const PREMIUM_TEMPLATES = Object.values(TEMPLATE_SAMPLES).filter(t => t.premium);

// Helper to check if user can access a template
export function canAccessTemplate(templateId, isPremiumUser) {
  const template = TEMPLATE_SAMPLES[templateId];
  if (!template) return false;
  if (!template.premium) return true;
  return isPremiumUser;
}


export const TEMPLATE_LIST = Object.entries(TEMPLATE_SAMPLES).map(([id, sample]) => ({
  id,
  label: sample.label || id.charAt(0).toUpperCase() + id.slice(1),
  tagline: sample.tagline || '',
  accent: sample.accent || '#c5a045',
  premium: sample.premium || false,
}));

function svgDataUri({ a, b, accent, glow = false }) {
  const glowPart = glow
    ? `<circle cx="92" cy="22" r="28" fill="${accent}" opacity="0.18"/>`
    : '';

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="560" height="360" viewBox="0 0 560 360">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="1" stop-color="${b}"/>
      </linearGradient>
      <radialGradient id="r" cx="20%" cy="20%" r="70%">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.25"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="560" height="360" fill="url(#g)"/>
    <rect width="560" height="360" fill="url(#r)"/>
    ${glowPart}
    <path d="M0 250 C120 220, 210 310, 350 280 C470 255, 520 190, 560 180 L560 360 L0 360 Z" fill="${accent}" opacity="0.08"/>
    <g opacity="0.45" stroke="white" stroke-opacity="0.25">
      <path d="M40 80 H240" stroke-width="2" stroke-linecap="round"/>
      <path d="M40 120 H180" stroke-width="2" stroke-linecap="round"/>
      <path d="M40 160 H220" stroke-width="2" stroke-linecap="round"/>
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}
