/* ════════════════════════════════════════════════════
   ✏️  HOW TO ADD QUESTIONS
   ────────────────────────────────────────────────────
   Add an object to the DATA array below.

   FIELDS:
   - id       : unique number
   - subject  : subject code (see SUBJECTS below)
   - topic    : specific topic string
   - page     : "main" | "airline" | "sim"
   - q        : question text
   - a        : answer text
   - options  : (optional) array of 4 strings for MCQ
   - correct  : (optional) index 0–3 of the correct option

   SUBJECTS: MET NAV ALW INS POF OPS AGK HR SIM ATC
════════════════════════════════════════════════════ */

const DATA = [

  /* ── METEOROLOGY ── */
  {
    id: 1, subject: "MET", topic: "ITCZ", page: "main",
    q: "What is the ITCZ and where does it form?",
    a: "The Inter-Tropical Convergence Zone (ITCZ) is a belt of low pressure near the equator where the northeast and southeast trade winds converge. Intense solar heating causes strong convective uplift, resulting in towering cumulonimbus clouds, heavy rainfall, and squalls. It migrates seasonally following the sun.",
    options: ["A high-pressure belt at the poles", "A convergence zone near the equator where trade winds meet", "A jet stream at 30,000 ft", "A mountain wave phenomenon"],
    correct: 1
  },
  {
    id: 2, subject: "MET", topic: "Icing", page: "main",
    q: "What conditions are required for structural icing to occur?",
    a: "Structural icing requires: (1) visible moisture — cloud, rain, drizzle, or fog droplets; (2) OAT at or below 0°C (though supercooled water can persist down to -40°C); (3) aircraft surface temperature at or below 0°C. The most severe icing occurs in freezing rain or freezing drizzle (FZRA/FZDZ) and in the 0°C to -20°C temperature range where supercooled large droplets (SLD) are most prevalent.",
    options: ["Dry air and temperatures below -40°C", "Visible moisture and surface temp ≤ 0°C", "High altitude only above FL200", "Only in cumulonimbus clouds"],
    correct: 1
  },
  {
    id: 3, subject: "MET", topic: "Wind Shear", page: "main",
    q: "What are the main causes and hazards of low-level wind shear (LLWS)?",
    a: "Causes: thunderstorm outflows (microbursts), frontal zones, temperature inversions, and terrain-induced effects. Hazards during approach: a sudden headwind increase causes airspeed/lift increase, followed by rapid loss as you exit — classic 'airspeed exceedance then loss' signature. Microburst encounters can exceed aircraft performance recovery limits. PIREP, ATIS, and LLWS alert systems (LLWAS) are primary warning sources.",
    options: ["Turbulence only above FL350", "Sudden change in wind speed/direction causing rapid airspeed changes", "Only occurs at night", "Caused solely by jet streams"],
    correct: 1
  },

  /* ── NAVIGATION ── */
  {
    id: 4, subject: "NAV", topic: "Great Circle vs Rhumb Line", page: "main",
    q: "What is the difference between a great circle and a rhumb line track?",
    a: "A great circle is the shortest distance between two points on Earth's surface (the intersection of a plane through Earth's centre). A rhumb line is a track of constant magnetic heading — it crosses all meridians at the same angle, appearing as a straight line on a Mercator chart but is longer than a great circle route at high latitudes. Great circle routes are used for long-haul flights; rhumb lines for short-range navigation.",
    options: ["Both are identical at all latitudes", "Great circle = shortest path; rhumb line = constant heading", "Rhumb line is shorter at high latitudes", "Great circle is only used in polar regions"],
    correct: 1
  },
  {
    id: 5, subject: "NAV", topic: "DME", page: "main",
    q: "What does DME measure and what type of distance does it give?",
    a: "DME (Distance Measuring Equipment) measures slant range — the straight-line distance from the aircraft to the ground station, not the ground distance. At high altitudes directly overhead a DME station, slant range can significantly exceed ground range. DME operates in the UHF band (962–1213 MHz) and uses pulse interrogation-response pairs. It co-locates with VORs to form VOR/DME or VORTAC.",
    options: ["Ground distance only", "Slant range — straight-line 3D distance to the station", "Altitude above the DME station", "Bearing and distance"],
    correct: 1
  },

  /* ── AIR LAW ── */
  {
    id: 6, subject: "ALW", topic: "Right of Way", page: "main",
    q: "State the right-of-way rules between different aircraft categories.",
    a: "ICAO Annex 2 right-of-way order (highest priority first): 1. Balloons; 2. Gliders; 3. Airships; 4. Powered aircraft towing/carrying slings; 5. All other powered aircraft. An aircraft being overtaken has right of way — the overtaking aircraft alters course to the right. On converging courses at the same level, the aircraft with the other on its right gives way. On final approach, the lower aircraft has right of way (but cannot use this to cut in front).",
    options: ["Faster aircraft always have priority", "Balloons > Gliders > Airships > Towing a/c > Powered aircraft", "IFR aircraft always have priority over VFR", "Largest aircraft always has right of way"],
    correct: 1
  },
  {
    id: 7, subject: "ALW", topic: "Minimum Safe Altitudes", page: "main",
    q: "What are ICAO minimum safe altitudes over congested and non-congested areas?",
    a: "ICAO Annex 2: Over congested areas (towns, cities, settlements) — at least 1,000 ft above the highest obstacle within 600 m of the aircraft. Over non-congested areas — at least 500 ft above the surface. Over open water or sparsely populated areas — not hazardous to persons or property on surface. Emergency or training as approved by authority may deviate.",
    options: ["500 ft everywhere", "1000 ft over congested, 500 ft over non-congested areas", "2000 ft over cities, 1000 ft elsewhere", "No minimum in VMC"],
    correct: 1
  },

  /* ── INSTRUMENTS ── */
  {
    id: 8, subject: "INS", topic: "Pitot-Static", page: "main",
    q: "What instruments are affected by a blocked pitot tube vs. a blocked static port?",
    a: "Blocked pitot tube: affects ASI only — airspeed freezes or reads zero (static still connected). In climb with blocked pitot, ASI may read lower than actual; in descent, reads higher. Blocked static port: affects ASI (partially — gives incorrect readings), altimeter (freezes at altitude of blockage), VSI (reads zero). In a pressurised aircraft, an alternative static source (usually slightly higher pressure inside cabin) may cause slight altimeter under-read and ASI over-read.",
    options: ["Both affect all instruments equally", "Blocked pitot: ASI only; Blocked static: ASI, altimeter, VSI", "Blocked static only affects altimeter", "Pitot block causes compass errors"],
    correct: 1
  },
  {
    id: 9, subject: "INS", topic: "Gyroscopes", page: "main",
    q: "What are rigidity in space and precession in gyroscopes?",
    a: "Rigidity in space (gyroscopic inertia): a spinning gyro resists changes to its axis of rotation — it remains fixed relative to inertial space regardless of how the frame around it moves. This property is used in the AI and DI/HSI. Precession: when a force is applied to a spinning gyro, the resultant motion occurs 90° later in the direction of rotation. Precession causes gyroscopic wander errors (real wander and apparent wander due to Earth's rotation and transport wander).",
    options: ["Rigidity = spins forever; precession = slows down", "Rigidity = resists axis change; precession = reaction 90° later in rotation", "Both are the same principle named differently", "Precession only occurs in attitude indicators"],
    correct: 1
  },

  /* ── POF ── */
  {
    id: 10, subject: "POF", topic: "Stall", page: "main",
    q: "At what angle of attack does a wing stall, and does stall speed change with bank angle?",
    a: "A wing stalls when it exceeds its critical angle of attack (typically ~15–17° for most aerofoils), regardless of airspeed, attitude, or g-loading. In level flight, stall speed is 1g stall speed (Vs). In a banked turn, load factor increases — at 60° bank, load factor = 2g, so stall speed increases by √2 (≈41% higher). Formula: Vs_turn = Vs × √(load factor). This is why steep turns require vigilance for accelerated stall.",
    options: ["Stall only occurs at low airspeed, never changes with bank", "Stall occurs at critical AoA; stall speed increases with bank angle", "Stall angle is always exactly 15° for all aircraft", "Stall speed decreases in a turn"],
    correct: 1
  },

  /* ── AIRLINE INTERVIEW ── */
  {
    id: 101, subject: "HR", topic: "Motivation", page: "airline",
    q: "Why do you want to be an airline pilot?",
    a: "Structure your answer using specific motivators: passion for aviation from early life, the responsibility of safely transporting hundreds of passengers, teamwork in a professional CRM environment, continuous learning (type ratings, recurrent training), and the global nature of the career. Avoid generic answers. Mention a specific experience — your first solo, a particular flight, or a mentor — that cemented your decision. Show self-awareness about the lifestyle trade-offs you have accepted.",
  },
  {
    id: 102, subject: "HR", topic: "CRM", page: "airline",
    q: "Describe a time you had a conflict with a colleague in the cockpit and how you resolved it.",
    a: "Use the STAR method (Situation, Task, Action, Result). Key points: demonstrate assertiveness without aggression, show you listened to the other party, reference CRM principles (open communication, mutual support), explain how you prioritised safety, and what you would do differently. Airlines look for crew who raise concerns professionally — not those who defer completely or who override others' judgment without discussion.",
  },
  {
    id: 103, subject: "HR", topic: "Technical — Engines", page: "airline",
    q: "What would you do if you experienced an engine failure shortly after take-off?",
    a: "Follow the memory items / ECAM/EICAS actions (aircraft-specific). General structure: Aviate — maintain control, pitch for V2 (single-engine climb speed). Navigate — follow SID or obstacle clearance procedure, do not turn below acceleration altitude unless ATC/ops requires. Communicate — declare Mayday or PAN as appropriate, notify ATC. Then: complete relevant abnormal checklists, brief cabin crew, plan for return or diversion. Emphasise crew coordination: call outs, PF/PM duties split, not rushing checklists under pressure.",
  },
  {
    id: 104, subject: "HR", topic: "Situational", page: "airline",
    q: "Your captain wants to continue an approach below minimums in deteriorating weather. What do you do?",
    a: "This tests your assertiveness and safety culture. Steps: 1. State the facts calmly: 'Captain, the RVR is now below our minima.' 2. If they continue, escalate assertively: 'I'm not comfortable continuing — I recommend a go-around.' 3. If still ignored, take control if safety is immediately at risk. Reference the airline's Standard Operating Procedures and the concept of 'Captain's authority vs crew member's duty to speak up.' Never compromise safety for schedule pressure. Airlines want pilots who speak up respectfully but firmly.",
  },

  /* ── SIMULATOR / TYPE RATING ── */
  {
    id: 201, subject: "SIM", topic: "V-Speeds", page: "sim",
    q: "Define V1, VR, and V2 and explain their significance.",
    a: "V1 (Take-off Decision Speed): the speed by which the pilot must have initiated a stop if rejecting take-off. Above V1, the take-off must be continued regardless of failures (except non-normal checklists on ground). VR (Rotation Speed): speed at which the pilot initiates rotation to lift-off attitude. V2 (Take-off Safety Speed): minimum speed to be maintained after failure of the critical engine to ensure required obstacle clearance. V2 ≥ 1.1 Vmca and ≥ 1.13 Vs (FAR 25). These are calculated per performance calculation using weight, flap setting, temperature, and pressure altitude.",
    options: ["V1=cruise speed, VR=landing speed, V2=stall speed", "V1=go/no-go decision speed, VR=rotation, V2=engine-out climb speed", "V1 is always 100 kts for all jets", "VR is always equal to V2"],
    correct: 1
  },
  {
    id: 202, subject: "SIM", topic: "ECAM / EICAS", page: "sim",
    q: "What is the correct prioritisation order when handling multiple ECAM/EICAS warnings?",
    a: "Priority order: 1. Warning (RED) — immediate action memory items required. 2. Caution (AMBER) — requires attention and action per checklist. 3. Advisory / Status (lower priority). Sequence: (a) Recognise and announce the failure. (b) Complete any memory items. (c) Clear the ECAM action by completing the procedure. (d) Continue with status and secondary failures. Never rush or skip items — 'ECAM Actions' are completed by PF calling and PM actioning each step. Avoid the 'Dark Cockpit' fixation trap.",
    options: ["Handle warnings alphabetically", "Red warnings first (memory items), then amber cautions, then advisories", "All ECAM items have equal priority", "Only handle warnings during descent"],
    correct: 1
  },
  {
    id: 203, subject: "SIM", topic: "Go-Around", page: "sim",
    q: "What are the key actions during a go-around from low approach?",
    a: "Initiation: PF calls 'Go around, TOGA' (or FLEX/CLB as appropriate) and applies thrust. PM confirms thrust. Actions: 1. Set thrust (TOGA). 2. Establish positive climb attitude (typically 15° pitch on swept-wing jets). 3. Positive rate — 'Gear up'. 4. At acceleration altitude, retract flaps on schedule. 5. Follow missed approach procedure or ATC instruction. 6. Brief for next approach or diversion. Common errors: not setting enough pitch (terrain/obstacle risk), retracting flaps too early (loss of lift), and poor crew communication.",
  },

];

/* ════ NOTES DATA ════ */
const NOTES = {
  MET: {
    label: "Meteorology",
    html: `
      <h2>Meteorology</h2>
      <h3>The Standard Atmosphere (ISA)</h3>
      <p>The <strong>International Standard Atmosphere</strong> assumes: MSL temperature 15°C, pressure 1013.25 hPa, lapse rate 1.98°C / 1000 ft up to the tropopause (~36,000 ft / 11 km), then isothermal to ~65,000 ft.</p>
      <div class="formula-box">Temp at altitude = 15°C − (alt in ft / 1000 × 1.98°C)<br>Pressure alt correction: 1 hPa ≈ 27 ft</div>
      <h3>Cloud Types & Altitudes</h3>
      <table>
        <tr><th>Family</th><th>Types</th><th>Base (approx)</th></tr>
        <tr><td>High</td><td>Ci, Cc, Cs</td><td>&gt; 20,000 ft</td></tr>
        <tr><td>Middle</td><td>Ac, As</td><td>6,500–20,000 ft</td></tr>
        <tr><td>Low</td><td>Sc, St, Ns</td><td>&lt; 6,500 ft</td></tr>
        <tr><td>Vertical</td><td>Cu, Cb</td><td>Variable</td></tr>
      </table>
      <h3>Frontal Systems</h3>
      <p><strong>Warm front:</strong> warm air rising over cold — wide cloud shield, continuous rain ahead, stratus at surface. <strong>Cold front:</strong> cold air undercutting warm — narrow band of intense CB activity, heavy showers, rapid wind veer (NH), pressure rises quickly after passage.</p>
      <h3>SIGMET & AIRMET</h3>
      <ul>
        <li><strong>SIGMET:</strong> Significant meteorological phenomena hazardous to all aircraft — CB, severe turbulence, severe icing, volcanic ash, tropical cyclone.</li>
        <li><strong>AIRMET:</strong> Less severe but still significant — moderate turbulence, moderate icing, mountain obscuration, widespread low visibility.</li>
      </ul>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
  NAV: {
    label: "Navigation",
    html: `
      <h2>Navigation</h2>
      <h3>Magnetic Variation & Deviation</h3>
      <p><strong>Variation:</strong> angle between true north and magnetic north at any point. Varies by location and year. West variation → add to True to get Magnetic. <strong>Deviation:</strong> compass error caused by aircraft's own magnetic fields. Applied to Magnetic to get Compass heading.</p>
      <div class="formula-box">True → Variation → Magnetic → Deviation → Compass<br>"Cadbury's Dairy Milk Very Tasty" (C + D = M + V = T, applying signs)</div>
      <h3>VOR Navigation</h3>
      <p>VOR (VHF Omnidirectional Range) operates 108–117.95 MHz. Provides magnetic bearing TO/FROM the station. The CDI deflects 2° per dot (full scale = 10°). Flying TO with a FROM indication = reverse sensing.</p>
      <h3>NDB / ADF</h3>
      <p>NDB operates 190–1750 kHz (LF/MF). ADF needle points to the station. <strong>Relative bearing = ADF reading. Magnetic bearing to station = HDG + RB (corrected for 360°).</strong> Susceptible to thunderstorm (static) and coastal refraction errors.</p>
      <h3>GNSS / GPS</h3>
      <ul>
        <li>Requires minimum 4 satellites for 3D positioning</li>
        <li>RAIM (Receiver Autonomous Integrity Monitoring) provides integrity monitoring</li>
        <li>SBAS (e.g. EGNOS/WAAS) improves accuracy to &lt;1 m — enables APV/LPV approaches</li>
      </ul>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
  ALW: {
    label: "Air Law",
    html: `
      <h2>Air Law</h2>
      <h3>ICAO Structure</h3>
      <p>ICAO (International Civil Aviation Organization) — Chicago Convention 1944. <strong>Annexes 1–19</strong> contain Standards and Recommended Practices (SARPs). Contracting States must notify differences from SARPs.</p>
      <ul>
        <li>Annex 1 — Personnel Licensing</li>
        <li>Annex 2 — Rules of the Air</li>
        <li>Annex 6 — Operation of Aircraft</li>
        <li>Annex 11 — Air Traffic Services</li>
        <li>Annex 14 — Aerodromes</li>
      </ul>
      <h3>Airspace Classification (ICAO)</h3>
      <table>
        <tr><th>Class</th><th>IFR</th><th>VFR</th><th>ATC Clearance</th></tr>
        <tr><td>A</td><td>Yes</td><td>No</td><td>Yes (IFR only)</td></tr>
        <tr><td>B</td><td>Yes</td><td>Yes</td><td>Yes (both)</td></tr>
        <tr><td>C</td><td>Yes</td><td>Yes</td><td>IFR yes; VFR clearance req'd</td></tr>
        <tr><td>D</td><td>Yes</td><td>Yes</td><td>Both need clearance</td></tr>
        <tr><td>E</td><td>Yes</td><td>Yes</td><td>IFR yes; VFR no</td></tr>
        <tr><td>F</td><td>Yes</td><td>Yes</td><td>IFR advisory only</td></tr>
        <tr><td>G</td><td>Yes</td><td>Yes</td><td>Neither</td></tr>
      </table>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
  INS: {
    label: "Instruments",
    html: `
      <h2>Instruments & Avionics</h2>
      <h3>Altimeter Errors</h3>
      <ul>
        <li><strong>Barometric error:</strong> incorrect QNH set. 1 hPa error ≈ 27 ft error.</li>
        <li><strong>Temperature error:</strong> in cold air, altimeter over-reads (true altitude lower than indicated). "From high to low, look out below."</li>
        <li><strong>Lag error:</strong> rapid altitude change causes momentary lag in altimeter response.</li>
        <li><strong>Blocked static:</strong> altimeter freezes at altitude of blockage.</li>
      </ul>
      <h3>Attitude Indicator (AI)</h3>
      <p>Uses an earth gyroscope (spin axis vertical). Errors: <strong>Turning error</strong> — in a prolonged turn, the gyro processes and AI may show incorrect bank. <strong>Acceleration error</strong> — rapid acceleration/deceleration causes false pitch indication. Suction-driven AIs suffer from <strong>toppling</strong> in excessive attitudes.</p>
      <h3>Radio Altimeter</h3>
      <p>Measures actual height above terrain using FM-CW radio waves (4.2–4.4 GHz). Used below 2,500 ft RA. Provides DH alerting, auto-land guidance, GPWS/TAWS input. Not affected by barometric pressure changes.</p>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
  POF: {
    label: "Principles of Flight",
    html: `
      <h2>Principles of Flight</h2>
      <h3>Lift Formula</h3>
      <div class="formula-box">L = CL × ½ρV² × S<br>CL = lift coefficient (function of AoA), ρ = air density, V = TAS, S = wing area</div>
      <h3>Drag Types</h3>
      <ul>
        <li><strong>Parasite drag:</strong> form drag + skin friction + interference drag. Increases with V².</li>
        <li><strong>Induced drag:</strong> byproduct of lift generation (wingtip vortices). Decreases as V increases (more pronounced at high AoA/low speed).</li>
        <li><strong>Total drag:</strong> minimum at best L/D ratio speed (best glide / best range speed for jet).</li>
      </ul>
      <h3>Stability</h3>
      <p><strong>Longitudinal stability:</strong> pitch stability. Centre of Pressure (CP) must be aft of Centre of Gravity (CG) for positive static stability. <strong>Directional (weathercock) stability:</strong> yaw stability — provided by fin. <strong>Lateral stability:</strong> roll stability — provided by dihedral, sweep, and high wing position.</p>
      <h3>Dutch Roll</h3>
      <p>An oscillatory yaw-roll coupled motion. Occurs in swept-wing aircraft with high roll stability but low directional stability. Yaw dampers suppress Dutch roll automatically on modern jets.</p>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
  OPS: {
    label: "Operations & Performance",
    html: `
      <h2>Operations & Performance</h2>
      <h3>Balanced Field Length</h3>
      <p>The balanced field concept: ASDA (Accelerate-Stop Distance Available) equals TODA (Take-Off Distance Available). V1 is chosen so that the distance to stop following a rejected take-off equals the distance to clear a 35 ft obstacle continuing the take-off with one engine inoperative.</p>
      <h3>Factors Affecting Take-Off Performance</h3>
      <ul>
        <li><strong>High temperature / altitude:</strong> reduces density — longer TODR, lower climb gradient.</li>
        <li><strong>Wet/contaminated runway:</strong> reduces braking, increases ASDR.</li>
        <li><strong>Tailwind:</strong> increases TODR significantly (10 kt tailwind ≈ 20–25% increase).</li>
        <li><strong>Upslope:</strong> increases TODR.</li>
        <li><strong>High weight:</strong> increases V speeds and distances.</li>
      </ul>
      <h3>Fuel Planning (ICAO)</h3>
      <div class="formula-box">
        Total fuel = Taxi + Trip + Contingency (5%) + Alternate + Final Reserve (30 min holding at 1500 ft) + Extra (if required)
      </div>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
  AGK: {
    label: "Aircraft General Knowledge",
    html: `
      <h2>Aircraft General Knowledge</h2>
      <h3>Jet Engine Types</h3>
      <ul>
        <li><strong>Turbojet:</strong> all thrust from jet efflux. Efficient only at high speed/altitude. Noisy.</li>
        <li><strong>Turbofan:</strong> fan bypass air produces majority of thrust. High bypass ratio (HBR &gt;5) = efficient, quieter. Used on modern airliners.</li>
        <li><strong>Turboprop:</strong> most power to propeller. Efficient at lower altitudes and speeds (&lt;400 kt).</li>
      </ul>
      <h3>Hydraulic Systems</h3>
      <p>Typically 3 independent systems on large aircraft (e.g. A320: Green, Blue, Yellow). Each powered by different engine-driven pumps + electric/RAT backup. Power: flight controls, landing gear, brakes, nosewheel steering.</p>
      <h3>Pressurisation</h3>
      <p>Cabin altitude maintained at ~6,000–8,000 ft equivalent regardless of FL. Differential pressure limit (ΔP max) prevents fuselage over-stress. <strong>Rapid decompression</strong> above FL250: time of useful consciousness (TUC) may be &lt;30 seconds. Oxygen masks deploy, crew dons masks, emergency descent initiated immediately.</p>
      <p><em>Add your own notes here by editing the NOTES object in data/questions.js</em></p>
    `
  },
};

/* ════ SUBJECTS MASTER LIST ════ */
const SUBJECTS = {
  MET: "Meteorology", NAV: "Navigation", ALW: "Air Law",
  INS: "Instruments", AGK: "Aircraft Gen. Knowledge",
  POF: "Principles of Flight", OPS: "Operations",
  HR: "HR Interview", SIM: "Simulator", ATC: "ATC Procedures"
};
