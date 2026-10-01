/**
 * Central site configuration.
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  ACTION REQUIRED: set WHATSAPP_NUMBER to Varshini's real number.        │
 * │  Format: full international number, digits only, no "+", spaces or "-". │
 * │  Example for India +91 98765 43210  ->  "919876543210"                  │
 * │  While left empty, the WhatsApp button falls back to email so it never  │
 * │  messages a wrong/stranger's number.                                    │
 * └────────────────────────────────────────────────────────────────────────┘
 */
export const WHATSAPP_NUMBER = '917259426670'; // +91 72594 26670

export const CONTACT_EMAIL = 'info@vidyuthlabs.com';

export const LINKEDIN = {
  varshini: 'https://www.linkedin.com/in/varshini-cb-821176360/',
  rishithej: 'https://www.linkedin.com/in/rishithej-bollam-5b7638362/',
  manjunatha: 'https://www.linkedin.com/in/manjunatha-channegowda-phd-21645a3a/',
};

/** Registered company details, shown in the footer and the legal pages. */
export const COMPANY = {
  legalName: 'VidyuthLabs Technologies Private Limited',
  cin: 'U62020KA2026PTC228561',
  incorporated: '25 September 2026',
  address: [
    'TSK Residency, 3rd Floor, 3rd, Annayappa Block',
    'Kumara Park, Seshadripuram, Bangalore North',
    'Bangalore - 560020, Karnataka, India',
  ],
};

/** DPIIT Startup India recognition, as printed on the certificate. */
export const DPIIT = {
  certificateNo: 'DIPP286055',
  issued: '30 September 2026',
  validUpto: '24 September 2036',
  industry: 'Technology Hardware',
  sector: 'Electronics',
  verifyUrl: 'https://www.startupindia.gov.in/content/sih/en/block-chain-recognised-certificate.html?DIPP=DIPP286055',
};

/** Google Apps Script endpoint that records pre-orders / notify requests into a sheet. */
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwt_dXRV9Dl6aUXOpXUS0NW_fPJzB7I6lHq6scKN-37oIr2pBiNqMBvU3D2cjvmtNqc/exec';

/** WhatsApp click-to-chat link, or an email fallback while the number is unset. */
export function whatsappLink(prefilled = "Hi Varshini, I'm interested in VidyuthLabs.") {
  if (WHATSAPP_NUMBER) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilled)}`;
  }
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('VidyuthLabs enquiry')}`;
}
