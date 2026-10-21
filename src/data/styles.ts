import { HeadshotStyle, WardrobeOption, ExpressionOption, SampleSelfie } from '../types/headshot';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate_grey',
    title: 'Corporate Grey Backdrop',
    category: 'corporate',
    tagline: 'Timeless studio elegance with mottled executive grey',
    description: 'Classic professional studio portrait against a textured canvas grey backdrop with diffused key lighting and crisp rim separation.',
    backdropDesc: 'Classic textured mottled studio grey photography canvas backdrop with a subtle circular center spotlight falloff',
    lightingDesc: 'Subtle 3-point studio lighting with a large softbox at 45 degrees, soft fill on the shadow side, and gentle hair rim light',
    recommendedWardrobe: 'Tailored dark charcoal suit jacket, crisp white collared shirt, and subtle silk tie or elegant lapel collar',
    suitableFor: ['Corporate Executives', 'Finance & Banking', 'Management Consultants', 'Board Directors'],
    gradient: 'from-slate-700 via-slate-800 to-slate-900',
    accentColor: '#94a3b8',
    badge: 'Most Popular',
  },
  {
    id: 'modern_tech',
    title: 'Modern Tech Office',
    category: 'tech',
    tagline: 'Vibrant Silicon Valley open-plan atrium with glass & greenery',
    description: 'Bright, contemporary headquarters atmosphere featuring architectural glass partitions, warm wooden slat accents, and lush indoor monstera plants blurred in creamy bokeh.',
    backdropDesc: 'Modern tech campus interior with floor-to-ceiling glass windows, blurred designer Scandinavian lounge furniture, and soft greenery bokeh',
    lightingDesc: 'Abundant natural daylight pouring through architectural windows balanced with soft ambient interior fill light',
    recommendedWardrobe: 'Modern navy unstructured blazer over a crisp merino crewneck or clean collared shirt without tie',
    suitableFor: ['Software Engineers', 'Product Managers', 'Startup Founders', 'Venture Capitalists'],
    gradient: 'from-cyan-900 via-slate-800 to-blue-900',
    accentColor: '#38bdf8',
    badge: 'Trending',
  },
  {
    id: 'outdoor_natural',
    title: 'Outdoor Natural Light',
    category: 'outdoor',
    tagline: 'Golden hour warmth with sun-dappled tree canopy & terrace',
    description: 'Warm, approachable outdoor portrait taken during golden hour with gentle backlit sun flares, rich natural green bokeh, and authentic skin glow.',
    backdropDesc: 'Sunlit urban botanical park terrace with soft golden hour light filtering through leafy trees with creamy f/2.0 background bokeh',
    lightingDesc: 'Warm natural low-angle sunset rim lighting providing hair glow, softly filled by an organic diffused reflector',
    recommendedWardrobe: 'Chic tailored linen or light wool blazer, earthy pastel collared shirt or relaxed knitwear',
    suitableFor: ['Entrepreneurs', 'Real Estate Advisors', 'Life Coaches', 'Creative Freelancers'],
    gradient: 'from-amber-900 via-stone-800 to-emerald-950',
    accentColor: '#f59e0b',
    badge: 'Warm & Natural',
  },
  {
    id: 'minimal_white',
    title: 'Minimalist White Studio',
    category: 'studio',
    tagline: 'High-key, razor-sharp commercial catalog clean',
    description: 'Crisp, modern, high-key studio background with zero distractions. Maximizes subject focus and clarity for clean directory and LinkedIn avatar presence.',
    backdropDesc: 'Seamless pristine off-white / light alabaster studio infinity wall (cyclorama) with clean gradient falloff',
    lightingDesc: 'Bright commercial beauty dish lighting with wrap-around soft fill, delivering high clarity, vivid eye catchlights, and even skin tones',
    recommendedWardrobe: 'High-contrast dark tailored suit jacket or structured minimalist dress shirt in black, navy, or deep burgundy',
    suitableFor: ['LinkedIn Avatars', 'Press Kits', 'Speakers & Authors', 'Corporate Directories'],
    gradient: 'from-slate-200 via-slate-300 to-slate-400',
    accentColor: '#64748b',
    badge: 'Ultra Clean',
  },
  {
    id: 'creative_dark',
    title: 'Creative Chiaroscuro',
    category: 'creative',
    tagline: 'Moody, cinematic editorial lighting with deep shadow depth',
    description: 'Dramatic fine-art studio lighting inspired by editorial magazine covers. Sculpted key light creates rich depth and commanding gravitas.',
    backdropDesc: 'Deep textured charcoal-black studio background with subtle dark slate vignetting and atmospheric shadow',
    lightingDesc: 'High-contrast cinematic directional light (chiaroscuro) with soft feathered transition across the cheekbones and warm subtle rim light',
    recommendedWardrobe: 'Textured black cashmere turtleneck, sleek modern blazer, or minimalist dark collar',
    suitableFor: ['Design Directors', 'Architects', 'Creative Directors', 'Artists & Musicians'],
    gradient: 'from-zinc-900 via-neutral-900 to-stone-950',
    accentColor: '#a8a29e',
    badge: 'Cinematic',
  },
  {
    id: 'executive_boardroom',
    title: 'Executive Boardroom Skyline',
    category: 'executive',
    tagline: 'High-floor metropolitan skyline through expansive glass',
    description: 'Prestigious corporate setting overlooking iconic skyscrapers at twilight. Radiates leadership, authority, and global scale.',
    backdropDesc: 'Top-floor corner executive boardroom with polished dark mahogany conference table and softly blurred panoramic city skyline at dusk',
    lightingDesc: 'Sophisticated commercial interior architectural accent lighting with cool twilight exterior city balance and warm key on subject',
    recommendedWardrobe: 'Custom bespoke midnight navy or pinstripe tailored three-piece suit or sharp formal executive blazer',
    suitableFor: ['CEOs & Founders', 'Law Partners', 'Investment Bankers', 'Chief Officers'],
    gradient: 'from-indigo-950 via-slate-900 to-slate-950',
    accentColor: '#818cf8',
    badge: 'Authority',
  },
  {
    id: 'urban_architectural',
    title: 'Urban Architectural',
    category: 'creative',
    tagline: 'Contemporary metropolitan concrete, steel & warm cedar',
    description: 'Shot in a stylish metropolitan arts district or contemporary museum courtyard with geometric architectural lines and modern urban character.',
    backdropDesc: 'Contemporary architectural facade with smooth cast concrete walls, geometric blackened steel mullions, and blurred city plaza',
    lightingDesc: 'Soft open shade daylight with crisp micro-contrast and modern crisp clarity',
    recommendedWardrobe: 'Smart contemporary tailoring: houndstooth or tweed blazer, refined open-collar shirt, stylish frames',
    suitableFor: ['Architects', 'Urban Planners', 'Brand Strategists', 'Consultants'],
    gradient: 'from-stone-800 via-slate-800 to-zinc-900',
    accentColor: '#d6d3d1',
    badge: 'Contemporary',
  },
  {
    id: 'cozy_loft',
    title: 'Industrial Brick Loft',
    category: 'studio',
    tagline: 'Warm exposed brick, crittall windows & industrial charm',
    description: 'Warm, approachable portrait in a converted warehouse studio featuring warm brickwork, ambient vintage Edison glow, and abundant creative energy.',
    backdropDesc: 'Rustic exposed brick wall with industrial black steel window frames, warm ambient indoor studio glow, and wooden bookcase depth',
    lightingDesc: 'Warm diffused ambient sidelight from tall industrial windows balanced with cozy warm interior accent lights',
    recommendedWardrobe: 'Soft knit crewneck sweater under an unbuttoned casual wool chore jacket or relaxed Oxford shirt',
    suitableFor: ['Writers & Journalists', 'Creative Agencies', 'Podcasters', 'Educators'],
    gradient: 'from-amber-950 via-stone-900 to-orange-950',
    accentColor: '#ea580c',
    badge: 'Warm Vibe',
  },
];

export const WARDROBE_OPTIONS: WardrobeOption[] = [
  {
    id: 'auto_recommended',
    label: 'Style Recommended (Best Fit)',
    description: 'Let the photographer AI select the attire best suited for the chosen backdrop',
    iconName: 'Sparkles',
  },
  {
    id: 'navy_suit',
    label: 'Dark Navy Executive Blazer',
    description: 'Sharp tailored navy blazer with crisp white shirt and subtle collar fold',
    iconName: 'Briefcase',
  },
  {
    id: 'charcoal_suit',
    label: 'Charcoal Grey Formal Suit',
    description: 'Classic bespoke wool suit with pressed collar and silk tie / minimalist blouse',
    iconName: 'Award',
  },
  {
    id: 'tech_casual',
    label: 'Modern Tech Casual',
    description: 'Unstructured dark blazer over premium fitted charcoal merino wool knit',
    iconName: 'Laptop',
  },
  {
    id: 'black_turtleneck',
    label: 'Creative Black Turtleneck',
    description: 'Steve Jobs / architectural minimalist black fine-knit turtleneck',
    iconName: 'Feather',
  },
  {
    id: 'crisp_white_shirt',
    label: 'Crisp Oxford Collared Shirt',
    description: 'Clean pressed white button-down with top button open for relaxed professionalism',
    iconName: 'User',
  },
  {
    id: 'keep_original',
    label: 'Keep Original Attire (Enhanced)',
    description: 'Retain the clothing you wore in the selfie, but expertly pressed & color balanced',
    iconName: 'Shirt',
  },
];

export const EXPRESSION_OPTIONS: ExpressionOption[] = [
  {
    id: 'warm_smile',
    label: 'Warm & Approachable Smile',
    hint: 'Friendly closed or gentle teeth smile that builds instant trust and rapport',
  },
  {
    id: 'confident_composed',
    label: 'Confident & Poised',
    hint: 'Subtle confident smirk with direct engaging gaze, commanding capability',
  },
  {
    id: 'executive_direct',
    label: 'Executive & Authoritative',
    hint: 'Serene, thoughtful, composed executive focus with a piercing eye connection',
  },
  {
    id: 'natural_candid',
    label: 'Natural Candid Presence',
    hint: 'Completely relaxed, caught in a genuine engaged moment without stiff posing',
  },
];

// Helper to create high-fidelity SVG sample selfies for instant zero-friction testing
function createSelfieSvg(
  bgGrad: [string, string],
  skinColor: string,
  hairColor: string,
  hairStyle: 'short' | 'curly' | 'wavy' | 'bun',
  clothingColor: string,
  glasses: boolean = false,
  smileType: 'gentle' | 'wide' | 'smirk' = 'gentle'
): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgGrad[0]}"/>
        <stop offset="100%" stop-color="${bgGrad[1]}"/>
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.25"/>
      </filter>
    </defs>
    <!-- Casual Background (Living room / cafe wall) -->
    <rect width="400" height="480" fill="url(#bg)"/>
    <circle cx="200" cy="180" r="190" fill="url(#sunGlow)"/>
    
    <!-- Shoulders & Casual T-Shirt -->
    <g filter="url(#softShadow)">
      <path d="M 70,480 C 80,380 130,350 200,350 C 270,350 320,380 330,480 Z" fill="${clothingColor}"/>
      <!-- Casual crewneck collar rib -->
      <path d="M 155,355 C 175,375 225,375 245,355 C 235,385 165,385 155,355 Z" fill="#ffffff" opacity="0.3"/>
      <!-- Neck -->
      <rect x="175" y="270" width="50" height="90" rx="20" fill="${skinColor}"/>
      <!-- Jaw shadow on neck -->
      <path d="M 175,280 C 190,305 210,305 225,280 Z" fill="#000000" opacity="0.12"/>
    </g>

    <!-- Head / Face -->
    <g filter="url(#softShadow)">
      <ellipse cx="200" cy="220" rx="72" ry="88" fill="${skinColor}"/>
      
      <!-- Ears -->
      <circle cx="128" cy="222" r="14" fill="${skinColor}"/>
      <circle cx="272" cy="222" r="14" fill="${skinColor}"/>

      <!-- Cheeks & Blush -->
      <circle cx="160" cy="235" r="15" fill="#f43f5e" opacity="0.1"/>
      <circle cx="240" cy="235" r="15" fill="#f43f5e" opacity="0.1"/>

      <!-- Eyes -->
      <ellipse cx="168" cy="210" rx="9" ry="6" fill="#ffffff"/>
      <circle cx="169" cy="210" r="4.5" fill="#292524"/>
      <circle cx="171" cy="208" r="1.5" fill="#ffffff"/>

      <ellipse cx="232" cy="210" rx="9" ry="6" fill="#ffffff"/>
      <circle cx="231" cy="210" r="4.5" fill="#292524"/>
      <circle cx="233" cy="208" r="1.5" fill="#ffffff"/>

      <!-- Eyebrows -->
      <path d="M 152,196 Q 168,190 184,196" stroke="${hairColor}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 216,196 Q 232,190 248,196" stroke="${hairColor}" stroke-width="3.5" fill="none" stroke-linecap="round"/>

      <!-- Nose -->
      <path d="M 198,206 L 196,238 Q 200,244 204,238" stroke="#000000" stroke-width="2" fill="none" opacity="0.25" stroke-linecap="round"/>

      <!-- Mouth / Smile -->
      ${
        smileType === 'wide'
          ? `<path d="M 178,256 Q 200,280 222,256 Z" fill="#e11d48"/>
             <path d="M 183,257 Q 200,266 217,257 Z" fill="#ffffff"/>`
          : smileType === 'smirk'
          ? `<path d="M 180,260 Q 198,262 222,252" stroke="#e11d48" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
          : `<path d="M 180,258 Q 200,272 220,258" stroke="#e11d48" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
      }

      ${
        glasses
          ? `
          <!-- Glasses frames -->
          <rect x="145" y="198" width="46" height="26" rx="7" fill="none" stroke="#18181b" stroke-width="3"/>
          <rect x="209" y="198" width="46" height="26" rx="7" fill="none" stroke="#18181b" stroke-width="3"/>
          <path d="M 191,210 L 209,210" stroke="#18181b" stroke-width="3"/>
          <line x1="145" y1="206" x2="128" y2="216" stroke="#18181b" stroke-width="2.5"/>
          <line x1="255" y1="206" x2="272" y2="216" stroke="#18181b" stroke-width="2.5"/>
        `
          : ''
      }
    </g>

    <!-- Hair Styles -->
    ${
      hairStyle === 'short'
        ? `<path d="M 125,190 C 120,130 150,115 200,115 C 250,115 280,130 275,190 C 265,160 250,150 200,150 C 150,150 135,160 125,190 Z" fill="${hairColor}"/>
           <path d="M 130,180 Q 140,150 180,145" stroke="${hairColor}" stroke-width="12" fill="none" stroke-linecap="round"/>`
        : hairStyle === 'curly'
        ? `<g fill="${hairColor}">
             <circle cx="130" cy="180" r="24"/>
             <circle cx="140" cy="145" r="28"/>
             <circle cx="170" cy="125" r="30"/>
             <circle cx="200" cy="120" r="32"/>
             <circle cx="230" cy="125" r="30"/>
             <circle cx="260" cy="145" r="28"/>
             <circle cx="270" cy="180" r="24"/>
             <circle cx="120" cy="215" r="22"/>
             <circle cx="280" cy="215" r="22"/>
           </g>`
        : hairStyle === 'wavy'
        ? `<path d="M 120,230 C 115,130 150,110 200,110 C 250,110 285,130 280,230 C 295,300 275,360 265,390 C 255,340 260,280 260,230 C 245,170 230,160 200,160 C 170,160 155,170 140,230 C 140,280 145,340 135,390 C 125,360 105,300 120,230 Z" fill="${hairColor}"/>`
        : `<ellipse cx="200" cy="100" rx="36" ry="32" fill="${hairColor}"/>
           <path d="M 130,200 C 125,140 150,125 200,125 C 250,125 275,140 270,200 C 260,170 240,160 200,160 C 160,160 140,170 130,200 Z" fill="${hairColor}"/>`
    }
    
    <!-- Casual selfie lighting overlay tag -->
    <rect x="15" y="15" width="130" height="24" rx="6" fill="#000000" opacity="0.4"/>
    <text x="24" y="31" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="600">CASUAL SELFIE</text>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const SAMPLE_SELFIES: SampleSelfie[] = [
  {
    id: 'sample_alex',
    name: 'Alex Chen',
    role: 'Founder & Tech Lead',
    lighting: 'Living room window light, casual henley t-shirt',
    dataUrl: createSelfieSvg(['#e0e7ff', '#c7d2fe'], '#fbcfe8', '#1e293b', 'short', '#3b82f6', true, 'gentle'),
  },
  {
    id: 'sample_sarah',
    name: 'Sarah Miller',
    role: 'Marketing Director',
    lighting: 'Kitchen morning sun, casual graphic tee',
    dataUrl: createSelfieSvg(['#fef3c7', '#fde68a'], '#fde047', '#78350f', 'wavy', '#059669', false, 'wide'),
  },
  {
    id: 'sample_marcus',
    name: 'Marcus Johnson',
    role: 'VP Operations',
    lighting: 'Coffee shop indoor daylight, hoodie',
    dataUrl: createSelfieSvg(['#fed7aa', '#fdba74'], '#d97706', '#1c1917', 'short', '#475569', false, 'smirk'),
  },
  {
    id: 'sample_priya',
    name: 'Priya Sharma',
    role: 'Consultant & Speaker',
    lighting: 'Home office desk lamp, casual sweater',
    dataUrl: createSelfieSvg(['#e9d5ff', '#d8b4fe'], '#fbcfe8', '#0f172a', 'bun', '#db2777', true, 'gentle'),
  },
];
