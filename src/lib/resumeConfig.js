/**
 * Shared resume configuration for consistent A4 layout across Preview and PDF export.
 *
 * All dimensions use real A4 paper size (210mm × 297mm).
 * Margins: Top 20mm, Bottom 20mm, Left 18mm, Right 18mm.
 * Content area: 210 - 18 - 18 = 174mm width, 297 - 20 - 20 = 257mm height.
 *
 * This ensures pixel-perfect match between preview and exported PDF.
 */

// A4 dimensions in mm (standard ISO 216)
export const PAGE_WIDTH_MM = 210
export const PAGE_HEIGHT_MM = 297

// Content area dimensions (A4 minus margins)
export const CONTENT_WIDTH_MM = 174 // 210 - 18 - 18
export const CONTENT_HEIGHT_MM = 257 // 297 - 20 - 20

// Margins in mm
export const MARGIN_TOP_MM = 20
export const MARGIN_BOTTOM_MM = 20
export const MARGIN_LEFT_MM = 18
export const MARGIN_RIGHT_MM = 18

// Convert mm to px at 96 DPI (screen resolution used by html2canvas)
// 1mm = 3.7795px at 96 DPI
export const MM_TO_PX = 3.7795275591

// Page dimensions in pixels at 96 DPI
export const PAGE_WIDTH_PX = Math.round(PAGE_WIDTH_MM * MM_TO_PX)
export const PAGE_HEIGHT_PX = Math.round(PAGE_HEIGHT_MM * MM_TO_PX)
export const CONTENT_WIDTH_PX = Math.round(CONTENT_WIDTH_MM * MM_TO_PX)
export const CONTENT_HEIGHT_PX = Math.round(CONTENT_HEIGHT_MM * MM_TO_PX)

// Margins in pixels
export const MARGIN_TOP_PX = Math.round(MARGIN_TOP_MM * MM_TO_PX)
export const MARGIN_BOTTOM_PX = Math.round(MARGIN_BOTTOM_MM * MM_TO_PX)
export const MARGIN_LEFT_PX = Math.round(MARGIN_LEFT_MM * MM_TO_PX)
export const MARGIN_RIGHT_PX = Math.round(MARGIN_RIGHT_MM * MM_TO_PX)

// Typography configuration
export const TYPOGRAPHY = {
  fontFamily: 'Inter, Arial, Helvetica, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  nameSize: '32px',
  nameWeight: 800,
  sectionHeadingSize: '18px',
  sectionHeadingWeight: 700,
  bodySize: '12px',
  lineHeight: 1.6,
}

// Color palette
export const COLORS = {
  primary: '#0F172A',
  accent: '#3B82F6',
  sectionTitle: '#60A5FA',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  background: '#FFFFFF',
  white: '#FFFFFF',
}

// PDF export settings - optimized for A4 matching preview
export const PDF_EXPORT_OPTIONS = {
  // Margins: [top, right, bottom, left] in mm
  margin: [MARGIN_TOP_MM, MARGIN_RIGHT_MM, MARGIN_BOTTOM_MM, MARGIN_LEFT_MM],
  // Use standard A4
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  },
  // High quality image capture
  html2canvas: {
    scale: 2, // 2x scale for crisp text
    useCORS: true,
    logging: false,
    backgroundColor: COLORS.background,
  },
  // filename will be set dynamically
  filename: 'resume.pdf',
  image: {
    type: 'jpeg',
    quality: 0.98,
  },
  // Smart page breaks
  pagebreak: {
    mode: ['css', 'legacy'],
    avoid: ['h1', 'h2', 'h3', 'h4', '.resume-section', '.resume-item'],
  },
}

// Print-specific styles to embed in HTML or apply via CSS-in-JS
export const PRINT_STYLES = `
  * {
    box-sizing: border-box !important;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: ${PAGE_WIDTH_MM}mm !important;
    height: auto !important;
    overflow: visible !important;
  }

  .resume-page {
    width: ${PAGE_WIDTH_MM}mm !important;
    min-height: ${PAGE_HEIGHT_MM}mm !important;
    max-height: ${PAGE_HEIGHT_MM}mm !important;
    overflow: hidden !important;
    page-break-after: auto !important;
    page-break-inside: avoid !important;
  }

  .resume-page:last-child {
    page-break-after: auto !important;
  }

  .resume-section {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .resume-item {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  /* Prevent horizontal overflow */
  .resume-content {
    overflow-wrap: break-word !important;
    word-wrap: break-word !important;
    word-break: break-word !important;
    white-space: pre-wrap !important;
  }

  /* Prevent text overflow */
  .resume-text {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    word-wrap: break-word !important;
  }
`

/**
 * Get the full A4 page style object for inline styles.
 * Use this for the main container styling.
 */
export function getPageStyle() {
  return {
    width: `${PAGE_WIDTH_MM}mm`,
    minHeight: `${PAGE_HEIGHT_MM}mm`,
    maxHeight: `${PAGE_HEIGHT_MM}mm`,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  }
}

/**
 * Get the content area style (within margins).
 */
export function getContentStyle() {
  return {
    paddingTop: `${MARGIN_TOP_MM}mm`,
    paddingBottom: `${MARGIN_BOTTOM_MM}mm`,
    paddingLeft: `${MARGIN_LEFT_MM}mm`,
    paddingRight: `${MARGIN_RIGHT_MM}mm`,
  }
}

/**
 * Get the PDF export options with dynamic filename.
 */
export function getPdfOptions(filename) {
  return {
    ...PDF_EXPORT_OPTIONS,
    filename: filename || 'resume.pdf',
  }
}

/**
 * Convert a value to safe text that won't overflow.
 */
export function safeText(value, maxLength = 500) {
  if (!value) return ''
  const str = String(value)
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength) + '...'
}