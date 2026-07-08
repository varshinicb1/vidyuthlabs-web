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

export const CONTACT_EMAIL = 'varshinicb.ee23@rvce.edu.in';

export const LINKEDIN = {
  varshini: 'https://www.linkedin.com/in/varshini-cb-821176360/',
  manjunatha: 'https://www.linkedin.com/in/manjunatha-channegowda-phd-21645a3a/',
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
