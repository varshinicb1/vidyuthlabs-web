/**
 * SPE (screen-printed electrode) catalogue.
 *
 * One device, interchangeable nanomaterial-coated sensors. Copy here is written
 * to (a) rank for high-intent, global search queries and (b) convert visitors
 * into pre-orders. Each entry stays within what a compact, battery-powered
 * electrochemical analyser realistically does best: trace-level stripping
 * voltammetry and CV/DPV/EIS screening on small sample volumes.
 */

export interface SpeItem {
  id: string;
  /** anchor slug */
  slug: string;
  /** short catalogue code shown on the chip */
  code: string;
  /** h3 title */
  title: string;
  /** one-line positioning */
  tagline: string;
  /** what it measures */
  analytes: string;
  /** techniques badge */
  techniques: string;
  /** crawlable, keyword-rich paragraph */
  description: string;
  /** 3-4 concrete reasons to buy */
  whyBuy: string[];
  /** who it's for */
  forWho: string;
  /** working-electrode coating colour for the 3D model */
  coating: string;
  /** UI accent (tailwind-friendly rgb) */
  accent: string;
}

export const CATALOGUE: SpeItem[] = [
  {
    id: 'water',
    slug: 'water-heavy-metals',
    code: 'HM-W1',
    title: 'Water & Heavy Metals',
    tagline: 'Detect lead, cadmium, mercury and arsenic in water — on-site, in minutes.',
    analytes: 'Pb²⁺ · Cd²⁺ · Hg²⁺ · As³⁺',
    techniques: 'Anodic Stripping Voltammetry',
    description:
      'A bismuth/nanomaterial-modified screen-printed electrode tuned for anodic stripping voltammetry of toxic heavy metals in drinking water, groundwater and wastewater. Drop your sample, run the pre-loaded method, and read trace-level lead, cadmium, mercury and arsenic directly on the device — no benchtop instrument, no shipping samples to a lab.',
    whyBuy: [
      'Screen contamination where it happens — wells, taps, rivers and treatment lines — instead of waiting days for a lab.',
      'Trace-level sensitivity for the metals that matter most in drinking-water safety.',
      'Pre-calibrated methods mean field staff get answers without electrochemistry expertise.',
    ],
    forWho: 'Water utilities · NGOs · environmental agencies · field researchers',
    coating: '#2aa9ff',
    accent: '42,169,255',
  },
  {
    id: 'food',
    slug: 'food-heavy-metals',
    code: 'HM-F1',
    title: 'Food Safety — Heavy Metals',
    tagline: 'Portable heavy-metal screening for rice, spices, produce and edible oils.',
    analytes: 'Pb²⁺ · Cd²⁺ · As³⁺',
    techniques: 'Anodic Stripping Voltammetry',
    description:
      'A food-matrix screen-printed electrode for rapid heavy-metal screening in prepared and digested food samples. Built for buyers and QC teams who need to flag contaminated rice, spices, produce or edible oil at intake — a fast, low-cost first line of defence before expensive confirmatory testing.',
    whyBuy: [
      'Catch contaminated lots at intake instead of after they reach shelves.',
      'Cut confirmatory-lab spend by screening first and sending only suspect samples.',
      'Portable enough to run at farms, markets, warehouses and processing lines.',
    ],
    forWho: 'Food processors · exporters · QC labs · market regulators',
    coating: '#ffb020',
    accent: '255,176,32',
  },
  {
    id: 'seafood',
    slug: 'seafood-formalin',
    code: 'FM-S1',
    title: 'Seafood Freshness & Formalin',
    tagline: 'Screen fish and seafood for illegal formalin adulteration in seconds.',
    analytes: 'Formaldehyde (formalin)',
    techniques: 'Differential Pulse Voltammetry',
    description:
      'A dedicated formalin-detection screen-printed electrode for spotting formaldehyde used to fake freshness in fish and seafood. Designed for markets, ports and cold-chain checkpoints where inspectors need a portable, decisive yes/no on adulteration without a wet lab.',
    whyBuy: [
      'Expose formalin adulteration on the spot — at landing centres, wholesale markets and borders.',
      'A clear electrochemical signal instead of subjective smell-and-look checks.',
      'Rugged and pocket-portable for inspectors working away from any lab.',
    ],
    forWho: 'Food-safety inspectors · seafood exporters · cold-chain QC · ports',
    coating: '#18c39a',
    accent: '24,195,154',
  },
  {
    id: 'soil',
    slug: 'soil-agriculture',
    code: 'AG-S1',
    title: 'Soil & Agriculture',
    tagline: 'Field-test soil for heavy-metal contamination and nutrient screening.',
    analytes: 'Pb²⁺ · Cd²⁺ · Cu²⁺ · nitrate screening',
    techniques: 'Stripping Voltammetry · DPV',
    description:
      'A soil-extract screen-printed electrode for on-farm screening of heavy-metal contamination and key nutrient indicators. Helps agronomists and growers understand what is really in the ground — contamination hotspots and fertiliser response — without couriering samples to a distant soil lab.',
    whyBuy: [
      'Map contamination and nutrient status directly in the field, plot by plot.',
      'Faster feedback loops for precision agriculture and remediation decisions.',
      'Low per-test cost makes routine, wide-area screening actually affordable.',
    ],
    forWho: 'Agronomists · agri-input companies · research farms · soil labs',
    coating: '#9bd14b',
    accent: '155,209,75',
  },
  {
    id: 'research',
    slug: 'research-education',
    code: 'RX-01',
    title: 'Research & Education',
    tagline: 'A pocket potentiostat for teaching and rapid method development.',
    analytes: 'Bare & functionalised electrodes',
    techniques: 'CV · DPV · EIS',
    description:
      'Bare ENIG and custom-functionalised screen-printed electrodes plus full CV, DPV and EIS on a device students and researchers can actually hold. Ideal for teaching electrochemistry hands-on, prototyping new sensor chemistries and running experiments outside the constraints of shared benchtop instruments.',
    whyBuy: [
      'Give every student a real instrument instead of queuing for one benchtop rig.',
      'Prototype and characterise new electrode chemistries fast, at the bench or in the field.',
      'Export raw data over USB and analyse it your way, with app-side analytics and AI insights.',
    ],
    forWho: 'Universities · sensor R&D teams · electrochemistry labs · educators',
    coating: '#b892ff',
    accent: '184,146,255',
  },
  {
    id: 'industrial',
    slug: 'industrial-process-qc',
    code: 'IX-01',
    title: 'Industrial & Process QC',
    tagline: 'Move electrochemical QC from the lab bench to the process line.',
    analytes: 'Effluent metals · plating baths · process water',
    techniques: 'Stripping Voltammetry · CV',
    description:
      'Application-specific screen-printed electrodes for effluent compliance, plating-bath monitoring and process-water quality control. Put decision-grade electrochemical screening next to the line so operators can act on results in minutes and keep discharge within compliance.',
    whyBuy: [
      'Screen effluent and process water at the source to stay ahead of compliance limits.',
      'Reduce downtime and rework by catching drift before it becomes a failed batch.',
      'One portable device covers many lines — just change the sensor per task.',
    ],
    forWho: 'Manufacturing QC · electroplating · effluent treatment · pharma & beverage',
    coating: '#ff5c6c',
    accent: '255,92,108',
  },
];
