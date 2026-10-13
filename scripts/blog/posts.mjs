/**
 * Blog posts. Newest first. `body` is trusted HTML written by us.
 * After editing, run `npm run blog` to regenerate public/blog, the RSS feed and the sitemap.
 */
export const POSTS = [
  {
    slug: 'vidyuthlabs-bits-pilani-hyderabad-collaboration',
    title: 'VidyuthLabs and BITS Pilani, Hyderabad Campus collaborate on portable electrochemical sensing',
    description:
      'VidyuthLabs is collaborating with BITS Pilani, Hyderabad Campus to develop portable potentiostat applications, starting with heavy-metal sensors for water, food and soil.',
    tag: 'News',
    date: '2026-10-14',
    image: '/images/vidyuthlabs-bits-pilani-hyderabad-share.jpg',
    imageAlt: 'The VidyuthLabs team with faculty at the MEMS, Microfluidics and Nanoelectronics lab, BITS Pilani Hyderabad Campus',
    keywords: 'VidyuthLabs BITS Pilani, BITS Pilani Hyderabad collaboration, portable potentiostat research, heavy metal sensor India, electrochemical sensor startup',
    body: `
<p class="lede">VidyuthLabs is collaborating with <strong>BITS Pilani, Hyderabad Campus</strong> to take portable electrochemistry from the lab bench to the field. The work centres on our AnalyteX portable potentiostat and its applications, starting with sensors that detect heavy metals and other contaminants in water, food and soil.</p>

<figure>
  <img src="/images/vidyuthlabs-bits-pilani-hyderabad-1280.webp" srcset="/images/vidyuthlabs-bits-pilani-hyderabad-800.webp 800w, /images/vidyuthlabs-bits-pilani-hyderabad-1280.webp 1280w" sizes="(max-width: 760px) 100vw, 720px" width="1280" height="960" alt="The VidyuthLabs team with faculty at the MEMS, Microfluidics and Nanoelectronics lab, BITS Pilani Hyderabad Campus" />
  <figcaption>The VidyuthLabs team at the MEMS, Microfluidics and Nanoelectronics lab, BITS Pilani Hyderabad Campus.</figcaption>
</figure>

<h2>Why this collaboration</h2>
<p>Testing water, food and soil for contaminants still mostly means collecting a sample, shipping it to a central laboratory and waiting days for a result from an instrument such as ICP-MS or atomic absorption spectroscopy. Those instruments are accurate, but they are expensive, lab-bound and far from where the sample is taken.</p>
<p>Electrochemistry offers another route. A potentiostat paired with a small, disposable sensor can measure trace metals and many other analytes in minutes, on site. Making that reliable outside a lab needs work on three fronts at once: the instrument, the sensor surface and the method. That is the kind of problem a startup and a research university solve better together.</p>

<h2>What we are working on</h2>
<ul>
  <li><strong>Portable potentiostat applications.</strong> Using the AnalyteX handheld potentiostat to run cyclic voltammetry (CV), differential pulse voltammetry (DPV) and electrochemical impedance spectroscopy (EIS) in the field.</li>
  <li><strong>Heavy-metal sensors.</strong> Nanomaterial-coated screen-printed electrodes for metals such as lead, cadmium, mercury and arsenic in drinking water.</li>
  <li><strong>Food, soil and other contamination.</strong> Extending the same one-device, swap-the-sensor approach to food safety and agricultural testing.</li>
</ul>

<h2>What it means for users</h2>
<p>Our aim is simple: one affordable handheld instrument, with a sensor for each test, that gives lab-grade electrochemical measurements wherever the sample is. Water utilities, food and seafood businesses, farmers, environmental agencies and research labs should be able to test on the spot instead of waiting on a distant lab.</p>

<div class="card">
  <p><strong>Work with us.</strong> If you are a researcher, a lab or an organisation that needs field testing for water, food or soil, we would like to hear from you.</p>
  <p><a class="cta" href="mailto:info@vidyuthlabs.com?subject=Collaboration%20with%20VidyuthLabs">Get in touch</a></p>
</div>
`,
  },
  {
    slug: 'what-is-a-portable-potentiostat',
    title: 'What is a portable potentiostat? A practical guide for field electrochemistry',
    description:
      'How a potentiostat works, what CV, DPV and EIS measure, and what to look for in a portable or handheld potentiostat for field testing.',
    tag: 'Guide',
    date: '2026-10-14',
    keywords: 'portable potentiostat, handheld potentiostat, what is a potentiostat, potentiostat for field testing, cyclic voltammetry, DPV, EIS, low cost potentiostat India',
    body: `
<p class="lede">A potentiostat is the instrument at the heart of electrochemical analysis. A <strong>portable potentiostat</strong> puts that instrument in your hand, so you can measure where the sample is instead of carrying the sample to a lab.</p>

<h2>How a potentiostat works</h2>
<p>Most electrochemical measurements use three electrodes in contact with the sample:</p>
<ul>
  <li><strong>Working electrode (WE):</strong> where the reaction you want to measure takes place.</li>
  <li><strong>Reference electrode (RE):</strong> a stable reference that the working electrode's potential is measured against.</li>
  <li><strong>Counter electrode (CE):</strong> completes the circuit so current can flow without disturbing the reference.</li>
</ul>
<p>The potentiostat holds or sweeps the potential of the working electrode relative to the reference, and measures the current that flows between the working and counter electrodes. That current depends on what is in the sample and how much of it there is. Plotting current against potential or time gives a signal you can identify and quantify.</p>

<h2>The techniques that matter in the field</h2>
<h3>Cyclic voltammetry (CV)</h3>
<p>The potential is swept up and back down while current is recorded. CV is the standard way to characterise an electrode and a redox system: where reactions happen, whether they are reversible, and whether a sensor surface is behaving as expected.</p>
<h3>Differential pulse voltammetry (DPV)</h3>
<p>Small potential pulses are superimposed on a slow ramp, and the current is sampled just before and at the end of each pulse. Subtracting the two suppresses background current, which makes DPV far more sensitive than CV and well suited to trace analysis.</p>
<h3>Anodic stripping voltammetry (ASV)</h3>
<p>Used for heavy metals. Metal ions are first reduced and deposited onto the electrode for a fixed time, concentrating them at the surface. A potential scan, often using DPV or square-wave waveforms, then strips them back into solution. Each metal strips at a characteristic potential, and the peak size relates to its concentration.</p>
<h3>Electrochemical impedance spectroscopy (EIS)</h3>
<p>A small AC signal is applied over a range of frequencies and the impedance is measured. EIS reveals how charge moves at the electrode surface, which makes it useful for biosensors, coatings, corrosion and checking sensor quality.</p>

<h2>Benchtop vs portable potentiostats</h2>
<p>Benchtop potentiostats are powerful and flexible, but they are heavy, need a computer and mains power, and stay in the lab. A portable potentiostat trades some of that flexibility for things that matter outside a lab:</p>
<ul>
  <li>Battery power and a size that fits in a pocket or a field kit.</li>
  <li>A built-in screen or a phone app, so no laptop is needed.</li>
  <li>Wireless data transfer and export for record keeping.</li>
  <li>Disposable screen-printed electrodes, so each test starts on a fresh, consistent surface.</li>
</ul>

<h2>What to look for when choosing one</h2>
<ul>
  <li><strong>Techniques:</strong> at minimum CV and DPV; EIS if you work on biosensors or surface characterisation.</li>
  <li><strong>Current range and resolution:</strong> trace analysis needs low-current sensitivity.</li>
  <li><strong>Sensor compatibility:</strong> a standard connector for screen-printed electrodes makes it easy to change applications.</li>
  <li><strong>Software:</strong> clear results for non-specialists, with raw data available for experts.</li>
  <li><strong>Connectivity and storage:</strong> Wi-Fi, Bluetooth or USB to move results off the device.</li>
  <li><strong>Cost per test:</strong> the instrument price matters, but so does the price of each sensor.</li>
</ul>

<h2>AnalyteX: our portable potentiostat</h2>
<p>AnalyteX is the handheld potentiostat we are building at VidyuthLabs. It has a 2.8-inch touchscreen, Wi-Fi, Bluetooth Low Energy and USB, and runs CV, DPV and EIS. It pairs with NanoX screen-printed electrodes, each coated with a nanomaterial chosen for a specific test, and a mobile app that turns raw signals into clear results. One device covers many applications: you change the sensor, not the instrument.</p>

<div class="card">
  <p><strong>AnalyteX is open for pre-order.</strong> Tell us your application and we will recommend the right sensor.</p>
  <p><a class="cta" href="/#preorder">Pre-order AnalyteX</a></p>
</div>
`,
  },
  {
    slug: 'heavy-metal-testing-drinking-water',
    title: 'Testing drinking water for lead, cadmium, arsenic and mercury: limits and on-site methods',
    description:
      'Indian (BIS IS 10500) and WHO limits for heavy metals in drinking water, how labs test for them, and how portable electrochemical sensors screen water on site.',
    tag: 'Water',
    date: '2026-10-14',
    keywords: 'heavy metal testing water, lead in drinking water India, arsenic in groundwater test, BIS IS 10500 heavy metals, portable water testing kit heavy metals, anodic stripping voltammetry, heavy metal sensor',
    body: `
<p class="lede">Heavy metals in drinking water have no taste, smell or colour. The only way to know they are there is to test. Here is what the limits are, how laboratories measure them, and how portable electrochemical sensors make it possible to screen water on site.</p>

<h2>Why heavy metals matter</h2>
<p>Lead, cadmium, arsenic and mercury are toxic even at very low concentrations and they accumulate in the body over time. Lead affects the nervous system and is especially harmful to children. Arsenic in groundwater is a long-standing public-health problem in parts of India and South Asia. Cadmium damages the kidneys, and mercury the nervous system. Sources include natural geology, industrial discharge, mining, old plumbing and solder, and contaminated agricultural run-off.</p>

<h2>The limits</h2>
<p>In India, drinking-water quality is set by the Bureau of Indian Standards in <strong>IS 10500:2012</strong>. The World Health Organization publishes guideline values used by many countries. For these metals the numbers are:</p>
<div class="table-wrap">
<table>
  <thead><tr><th>Metal</th><th>BIS IS 10500 (acceptable limit)</th><th>WHO guideline value</th></tr></thead>
  <tbody>
    <tr><td>Lead (Pb)</td><td>0.01 mg/L (10 µg/L)</td><td>10 µg/L</td></tr>
    <tr><td>Arsenic (As)</td><td>0.01 mg/L (10 µg/L)</td><td>10 µg/L</td></tr>
    <tr><td>Cadmium (Cd)</td><td>0.003 mg/L (3 µg/L)</td><td>3 µg/L</td></tr>
    <tr><td>Mercury (Hg)</td><td>0.001 mg/L (1 µg/L)</td><td>6 µg/L (inorganic)</td></tr>
  </tbody>
</table>
</div>
<p>1 µg/L is one part per billion (ppb). These are tiny concentrations, so any useful test has to be sensitive at the low-ppb level.</p>

<h2>How laboratories test</h2>
<p>Reference methods include inductively coupled plasma mass spectrometry (ICP-MS), ICP optical emission spectrometry and atomic absorption spectroscopy (AAS). They are accurate and can measure many elements at once, but they need a laboratory, trained staff, gases and sample transport. Results usually take days, and the cost per sample limits how often water is tested.</p>
<p>Colour-change field kits exist for some metals, especially arsenic. They are cheap and simple, but they are mostly qualitative or semi-quantitative and can struggle near the limit values.</p>

<h2>How electrochemical sensors test on site</h2>
<p>The established electrochemical method for trace metals is <strong>anodic stripping voltammetry (ASV)</strong>:</p>
<ol>
  <li><strong>Deposit.</strong> A negative potential is applied for a set time, reducing metal ions in the sample and plating them onto the electrode. This step concentrates the metals at the surface.</li>
  <li><strong>Strip.</strong> The potential is scanned in the positive direction. Each metal oxidises and leaves the electrode at its own characteristic potential, producing a current peak.</li>
  <li><strong>Quantify.</strong> Peak position identifies the metal, and peak height or area relates to its concentration, using calibration or standard addition.</li>
</ol>
<p>Because the deposition step pre-concentrates the sample, ASV can reach the low-ppb range that drinking-water limits require. Lead and cadmium are classic ASV targets. Arsenic and mercury are usually measured on gold electrode surfaces, which is one reason electrode material and coating matter so much.</p>

<h2>Why screen-printed electrodes make this practical</h2>
<p>Older ASV used hanging mercury drop electrodes, which are toxic and unsuitable for the field. Modern methods use disposable <a href="/blog/screen-printed-electrodes-explained/">screen-printed electrodes</a> made from carbon or gold, often modified with nanomaterials or metal films such as bismuth to improve sensitivity and selectivity. Each test starts on a fresh surface, with no cleaning, polishing or mercury.</p>

<h2>What a good on-site test looks like</h2>
<ul>
  <li>Sensitivity at or below the regulatory limit for the metal you care about.</li>
  <li>A sample preparation step simple enough to do in the field, such as adding a buffer.</li>
  <li>A clear pass or fail against the limit, with the raw data kept for records.</li>
  <li>Confirmation of positive results by an accredited laboratory when decisions depend on them.</li>
</ul>
<p>On-site electrochemical screening does not replace accredited laboratory testing. It makes testing frequent and fast enough to catch problems early, and sends only the samples that matter to the lab.</p>

<h2>How VidyuthLabs approaches it</h2>
<p>Our AnalyteX handheld potentiostat runs voltammetric methods on NanoX screen-printed electrodes, each coated with nanomaterials for a specific test, including sensors aimed at lead, cadmium, mercury and arsenic. Results show on the device and sync to a mobile app. We are developing these applications in collaboration with <a href="/blog/vidyuthlabs-bits-pilani-hyderabad-collaboration/">BITS Pilani, Hyderabad Campus</a>.</p>

<div class="card">
  <p><strong>Need to test water for heavy metals?</strong> Tell us which metals and what kind of water, and we will tell you which sensor fits.</p>
  <p><a class="cta" href="/#preorder">Pre-order sensor kits</a></p>
</div>
`,
  },
  {
    slug: 'screen-printed-electrodes-explained',
    title: 'Screen-printed electrodes (SPEs) explained: how they work and why they matter for sensing',
    description:
      'What screen-printed electrodes are, the working, reference and counter electrodes on a single strip, electrode materials, nanomaterial coatings, and where SPE sensors are used.',
    tag: 'Sensors',
    date: '2026-10-14',
    keywords: 'screen printed electrode, SPE sensor, disposable electrochemical sensor, gold screen printed electrode, nanomaterial modified electrode, electrochemical sensor India',
    body: `
<p class="lede">A <strong>screen-printed electrode (SPE)</strong> is a complete electrochemical cell printed onto a small strip. It is the reason electrochemical testing can leave the laboratory: cheap, disposable, consistent and ready to use.</p>

<h2>What is on a screen-printed electrode</h2>
<p>A typical SPE carries all three electrodes needed for a measurement on one substrate:</p>
<ul>
  <li><strong>Working electrode (WE):</strong> usually the central disc, where the measured reaction happens. Carbon, gold and platinum are common.</li>
  <li><strong>Reference electrode (RE):</strong> often silver or silver/silver chloride, providing a stable potential.</li>
  <li><strong>Counter electrode (CE):</strong> usually the same material as the working electrode, carrying the current.</li>
</ul>
<p>Conductive tracks lead from the electrodes to contacts at the end of the strip, which plug into a potentiostat. An insulating layer leaves only the sensing area and the contacts exposed. A drop of sample on the sensing area is enough for a measurement.</p>

<h2>How they are made</h2>
<p>Conductive inks are pushed through a patterned mesh onto a ceramic, plastic or board substrate, layer by layer, then cured. Because it is a printing process, thousands of nearly identical electrodes can be produced at low cost. That consistency is what makes single-use sensors practical: every test starts on a fresh surface with known behaviour, and there is no polishing or cleaning between samples.</p>

<h2>Electrode materials</h2>
<ul>
  <li><strong>Carbon:</strong> inexpensive, with a wide potential window. A common base for modified sensors and for heavy-metal methods with bismuth films.</li>
  <li><strong>Gold:</strong> well suited to arsenic and mercury analysis and to attaching biological receptors through thiol chemistry.</li>
  <li><strong>Platinum:</strong> used for some oxidation reactions, such as hydrogen peroxide detection.</li>
</ul>

<h2>Why nanomaterial coatings matter</h2>
<p>A bare electrode responds to many things. Coating the working electrode with a chosen nanomaterial, such as metal nanoparticles, carbon nanomaterials or metal oxides, can increase the active surface area, speed up electron transfer and favour the reaction you want to measure. The coating effectively turns a general-purpose electrode into a sensor for a specific analyte. Changing the coating changes the application, while the instrument stays the same.</p>

<h2>Where SPE sensors are used</h2>
<ul>
  <li>Heavy metals in drinking water and wastewater (<a href="/blog/heavy-metal-testing-drinking-water/">more on that here</a>).</li>
  <li>Food safety screening, including adulterants such as <a href="/blog/formalin-in-fish-detection/">formalin in fish</a>.</li>
  <li>Soil and agriculture testing.</li>
  <li>Medical and biosensing, where the glucose test strip is the best-known example.</li>
  <li>Teaching and research electrochemistry.</li>
</ul>

<h2>Things to keep in mind</h2>
<ul>
  <li><strong>Sample matrix:</strong> real samples contain salts, organics and particles that can interfere. Many methods need a simple preparation step such as buffering, filtering or extraction.</li>
  <li><strong>Calibration:</strong> results are quantitative only with proper calibration or standard addition.</li>
  <li><strong>Storage:</strong> coated sensors can have a shelf life and storage conditions that matter.</li>
</ul>

<h2>NanoX: our screen-printed sensors</h2>
<p>NanoX is the VidyuthLabs family of gold ENIG screen-printed electrodes, with CE, WE and RE contacts on a single strip. Each NanoX sensor is coated with nanomaterials chosen for its application and clicks straight into the <a href="/blog/what-is-a-portable-potentiostat/">AnalyteX portable potentiostat</a>.</p>

<div class="card">
  <p><strong>Looking for a sensor for a specific test?</strong> Browse the catalogue on our homepage or write to us.</p>
  <p><a class="cta" href="/#catalogue">See the sensor catalogue</a></p>
</div>
`,
  },
  {
    slug: 'formalin-in-fish-detection',
    title: 'Formalin in fish: why it is used, why it is harmful, and how to screen for it',
    description:
      'Why formalin is illegally added to fish and seafood, the health risk, why some fish contain natural formaldehyde, and the options for rapid on-site screening.',
    tag: 'Food safety',
    date: '2026-10-14',
    keywords: 'formalin in fish, formalin detection fish, formaldehyde in seafood test, fish adulteration test India, food adulteration sensor, rapid formalin test',
    body: `
<p class="lede">Formalin is sometimes added to fish to make it look fresh for longer. It is a serious food-safety problem in India and across South and Southeast Asia, and it cannot reliably be detected by looking at or smelling the fish.</p>

<h2>What formalin is</h2>
<p>Formalin is a solution of formaldehyde in water, typically 37 to 40 percent formaldehyde. It is used to preserve biological specimens and in industry. Formaldehyde is classified by the International Agency for Research on Cancer as carcinogenic to humans (Group 1). It is not a permitted preservative for fish.</p>

<h2>Why it ends up in fish</h2>
<p>Fresh fish spoils quickly without an unbroken cold chain. Where ice and refrigerated transport are short, some traders dip or spray fish with formalin to slow spoilage and keep it looking firm and fresh during long journeys to market. The buyer has no easy way to tell.</p>

<h2>The health risk</h2>
<p>Eating formaldehyde-treated food can irritate the mouth, throat and stomach, and repeated exposure is a long-term health concern given its classification as a carcinogen. Children and people who eat fish daily are the most exposed.</p>

<h2>A complication: natural formaldehyde</h2>
<p>Some fish contain formaldehyde naturally. In certain marine species, an enzyme breaks down a compound called trimethylamine oxide into formaldehyde after the fish dies, especially during frozen storage. Bombay duck and some members of the cod family are known examples. This means a test cannot simply ask "is any formaldehyde present?". It has to tell low natural levels apart from the much higher levels typical of deliberate treatment.</p>

<h2>How fish is screened today</h2>
<ul>
  <li><strong>Colour-change kits.</strong> A swab or paper strip reacts with formaldehyde and changes colour. ICAR's Central Institute of Fisheries Technology has developed a rapid kit of this kind. These kits are cheap and quick, but reading colour by eye is subjective and only roughly quantitative.</li>
  <li><strong>Laboratory methods.</strong> Spectrophotometric and chromatographic methods give accurate numbers, but need a lab and time.</li>
</ul>

<h2>The case for electrochemical screening</h2>
<p>An electrochemical sensor turns the presence of formaldehyde into an electrical signal measured by a potentiostat. Compared with colour reading, that offers a number instead of a shade, results stored with time and place, and the same handheld instrument used for other tests. That makes it suited to frequent checks at markets, landing centres, cold-chain checkpoints and export processing units.</p>

<h2>How VidyuthLabs approaches it</h2>
<p>VidyuthLabs is developing a dedicated formalin-detection sensor in the NanoX family for screening fish and seafood with the <a href="/blog/what-is-a-portable-potentiostat/">AnalyteX portable potentiostat</a>. As with any screening test, positive results that lead to enforcement or rejection should be confirmed by an accredited laboratory.</p>

<div class="card">
  <p><strong>Food business, regulator or exporter?</strong> Tell us where you need to test seafood and how many samples you handle.</p>
  <p><a class="cta" href="/#preorder">Talk to us about formalin testing</a></p>
</div>
`,
  },
  {
    slug: 'heavy-metals-in-food-and-soil',
    title: 'Heavy metals in food and soil: why testing matters and how portable sensors help',
    description:
      'How heavy metals reach crops and food, Indian food-safety rules on contaminants, how soil and food samples are prepared, and where portable electrochemical sensors fit.',
    tag: 'Food & soil',
    date: '2026-10-14',
    keywords: 'heavy metals in food test, heavy metals in soil testing, soil contamination sensor, food contaminant detection India, FSSAI heavy metal limits, portable soil testing',
    body: `
<p class="lede">Heavy metals in water get most of the attention, but the same metals move from soil and irrigation water into crops, and from there into food. Testing soil and food is how that chain gets broken.</p>

<h2>How heavy metals reach food</h2>
<ul>
  <li><strong>Irrigation with contaminated water,</strong> including untreated wastewater near cities and industrial areas.</li>
  <li><strong>Soil contamination</strong> from mining, smelting, industrial waste and some fertilisers and pesticides.</li>
  <li><strong>Processing and packaging,</strong> such as contaminated equipment or adulterated ingredients.</li>
</ul>
<p>Leafy vegetables, rice and some root crops can take up cadmium, lead and arsenic from soil and water. Fish and seafood can accumulate mercury.</p>

<h2>The rules in India</h2>
<p>Limits for metal contaminants in foods are set by the Food Safety and Standards Authority of India (FSSAI) under the Food Safety and Standards (Contaminants, Toxins and Residues) Regulations, 2011. Exporters must also meet the limits of the destination market, which are often stricter. In both cases, businesses need regular, documented testing.</p>

<h2>Preparing soil and food samples</h2>
<p>Unlike water, soil and food are solids, so the metals must first be brought into solution:</p>
<ul>
  <li><strong>Soil:</strong> dried, sieved and extracted with an acid or extracting solution. The extract is then measured.</li>
  <li><strong>Food:</strong> digested or extracted to release metals from the sample matrix.</li>
</ul>
<p>Sample preparation is often the slowest part of the test. Simplifying it is as important as the measurement itself if testing is to happen close to the farm or the factory.</p>

<h2>Where portable electrochemical sensors fit</h2>
<p>Once a sample is in solution, the same <a href="/blog/heavy-metal-testing-drinking-water/">anodic stripping voltammetry</a> used for water can measure lead, cadmium and other metals in the extract. A portable potentiostat with a disposable screen-printed electrode makes it practical to:</p>
<ul>
  <li>screen fields before planting or before harvest,</li>
  <li>check incoming raw materials at a processing unit,</li>
  <li>run frequent spot checks and send only suspect samples to an accredited laboratory,</li>
  <li>keep a timestamped record of every test.</li>
</ul>

<h2>How VidyuthLabs approaches it</h2>
<p>The AnalyteX portable potentiostat uses one instrument for every application. For soil and food, the NanoX sensor and the method change while the device stays the same. We are developing these applications with <a href="/blog/vidyuthlabs-bits-pilani-hyderabad-collaboration/">BITS Pilani, Hyderabad Campus</a>.</p>

<div class="card">
  <p><strong>Agriculture, food processing or environmental testing?</strong> Tell us what you need to measure.</p>
  <p><a class="cta" href="/#preorder">Get in touch</a></p>
</div>
`,
  },
];
