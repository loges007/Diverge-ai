import { ItemDefinition, SubmittedIdea, AUTScoreBreakdown, SemanticCategory } from '../types/aut';

// Category dictionaries with keyword semantics
const CATEGORY_KEYWORDS: Record<SemanticCategory, string[]> = {
  utilitarian: [
    'hold', 'store', 'contain', 'cup', 'pour', 'spoon', 'scoop', 'clip', 'carry', 'fasten',
    'organize', 'clean', 'brush', 'hang', 'hook', 'pin', 'scrape', 'open', 'bottle opener',
    'wedge', 'clamp', 'container', 'vessel', 'tray', 'pot', 'box', 'bucket', 'bag'
  ],
  structural: [
    'support', 'pillar', 'brace', 'beam', 'foundation', 'bracket', 'shim', 'leveller',
    'footing', 'riser', 'stand', 'scaffold', 'arch', 'cantilever', 'spacer', 'frame',
    'reinforce', 'doorstop', 'paperweight', 'counterweight', 'ballast', 'anchor', 'chock'
  ],
  acoustic: [
    'sound', 'music', 'acoustic', 'chime', 'bell', 'drum', 'resonance', 'percussion',
    'reverb', 'vibration', 'tone', 'whistle', 'amplifier', 'speaker', 'megaphone',
    'soundproof', 'dampen', 'absorb sound', 'tuning', 'echo', 'percussive', 'instrument'
  ],
  aesthetic: [
    'art', 'sculpture', 'jewelry', 'earring', 'necklace', 'pendant', 'decor', 'ornament',
    'mosaic', 'print', 'stamp', 'canvas', 'pigment', 'dye', 'stencil', 'aesthetic',
    'costume', 'fashion', 'display', 'frame', 'origami', 'shadow puppet', 'sculpt'
  ],
  play: [
    'game', 'toy', 'play', 'ball', 'dice', 'puck', 'target', 'hoop', 'racket',
    'puzzle', 'token', 'board game', 'marbles', 'juggling', 'frisbee', 'sled',
    'domino', 'race track', 'cat toy', 'dog fetch', 'kite'
  ],
  survival: [
    'emergency', 'survival', 'weapon', 'defense', 'shield', 'fire starter', 'splint',
    'tourniquet', 'bandage', 'filter water', 'signal mirror', 'flare', 'shelter',
    'tarp anchor', 'trap', 'snare', 'tether', 'rope', 'escape', 'compass'
  ],
  scientific: [
    'lens', 'magnifier', 'optical', 'refraction', 'microscope', 'telescope', 'circuit',
    'conduct', 'electricity', 'insulator', 'dielectric', 'scale', 'measure', 'caliper',
    'fulcrum', 'lever', 'prism', 'solar cooker', 'heat sink', 'battery', 'condenser'
  ],
  biological: [
    'plant', 'moss', 'planter', 'sprout', 'seed', 'terrarium', 'hydroponics', 'nest',
    'bird feeder', 'ant farm', 'beehive', 'coral reef', 'microbiome', 'fertilizer',
    'soil aeration', 'insect shelter', 'mycelium', 'botanical', 'bio'
  ],
  symbolic: [
    'symbol', 'token', 'badge', 'currency', 'coin', 'talisman', 'ritual', 'ceremony',
    'metaphor', 'flag', 'insignia', 'memorial', 'trophy', 'totem', 'message', 'code'
  ],
  kinetic: [
    'wheel', 'roller', 'pulley', 'gear', 'treadmill', 'propeller', 'flywheel', 'spring',
    'catapult', 'launcher', 'piston', 'crank', 'pendulum', 'turbine', 'gyroscope', 'bearing'
  ]
};

// Heuristic categorization engine
export function classifyIdeaCategory(text: string, item: ItemDefinition): SemanticCategory {
  const lower = text.toLowerCase();

  let bestCategory: SemanticCategory = 'utilitarian';
  let highestScore = 0;

  for (const [catKey, keywords] of Object.entries(CATEGORY_KEYWORDS) as [SemanticCategory, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score += 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestCategory = catKey;
    }
  }

  // If no match found, use syntactic cues
  if (highestScore === 0) {
    if (lower.includes('make') || lower.includes('build') || lower.includes('assemble')) {
      bestCategory = 'structural';
    } else if (lower.includes('hit') || lower.includes('throw') || lower.includes('spin')) {
      bestCategory = 'kinetic';
    } else if (lower.includes('look') || lower.includes('wear') || lower.includes('color')) {
      bestCategory = 'aesthetic';
    } else {
      // Rotate semi-deterministically based on length
      const categories: SemanticCategory[] = ['utilitarian', 'structural', 'kinetic', 'aesthetic', 'scientific'];
      bestCategory = categories[text.length % categories.length];
    }
  }

  return bestCategory;
}

// Check distance from common clichés and assess lateral depth
export function evaluateOriginality(text: string, item: ItemDefinition): {
  score: number;
  tag: 'Conventional' | 'Lateral' | 'Radical' | 'Visionary';
} {
  const lower = text.toLowerCase().trim();
  let baseScore = 65; // baseline moderate creativity

  // Penalize direct match with cliché list
  for (const cliche of item.commonUses) {
    if (lower.includes(cliche.toLowerCase()) || cliche.toLowerCase().includes(lower)) {
      baseScore -= 38;
      break;
    }
  }

  // Check for common stop/cliché single words
  const simplisticClichés = ['doorstop', 'paperweight', 'pen holder', 'pencil holder', 'weapon', 'throw it', 'decoration'];
  for (const sc of simplisticClichés) {
    if (lower === sc || lower.startsWith(sc + ' ') || lower.endsWith(' ' + sc)) {
      baseScore = Math.min(baseScore, 32);
    }
  }

  // Bonus for domain leaps and technical / lateral terminology
  const lateralTriggers = [
    'refraction', 'parabolic', 'resonance', 'dielectric', 'capillary', 'conduction',
    'fulcrum', 'acoustic', 'optics', 'origami', 'modular', 'fermentation', 'hydroponic',
    'centrifuge', 'diffraction', 'caliper', 'insulation', 'counterweight', 'cantilever',
    'ferrofluid', 'seismic', 'piezoelectric', 'antenna', 'matrix', 'thermal mass',
    'bio-luminescent', 'microscopic', 'crystallize', 'pulverize', 'tension spring'
  ];

  for (const trigger of lateralTriggers) {
    if (lower.includes(trigger)) {
      baseScore += 14;
    }
  }

  // Word depth bonus
  const words = lower.split(/\s+/).filter(Boolean);
  if (words.length >= 6) baseScore += 8;
  if (words.length >= 10) baseScore += 6;

  // Clamp 10 - 98
  const finalScore = Math.max(12, Math.min(98, Math.round(baseScore)));

  let tag: 'Conventional' | 'Lateral' | 'Radical' | 'Visionary' = 'Lateral';
  if (finalScore < 45) tag = 'Conventional';
  else if (finalScore < 72) tag = 'Lateral';
  else if (finalScore < 86) tag = 'Radical';
  else tag = 'Visionary';

  return { score: finalScore, tag };
}

export function evaluateElaboration(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Elaborated ideas have explanatory prepositions (by, using, for, when, to, as) and concrete adjectives
  const mechanismWords = ['by', 'using', 'with', 'into', 'for', 'when', 'so', 'where', 'as', 'through', 'attaching', 'grinding', 'carving', 'bending'];
  let mechanismCount = 0;
  for (const w of words) {
    if (mechanismWords.includes(w.toLowerCase())) {
      mechanismCount++;
    }
  }

  let score = 25; // base
  score += Math.min(45, wordCount * 5.5);
  score += Math.min(30, mechanismCount * 9);

  return Math.min(98, Math.max(15, Math.round(score)));
}

export function calculateAUTBreakdown(
  ideas: SubmittedIdea[],
  item: ItemDefinition,
  durationSeconds: number,
  timeTakenSeconds: number
): AUTScoreBreakdown {
  const totalIdeas = ideas.length;
  const timeInMinutes = Math.max(0.25, timeTakenSeconds / 60);
  const ideasPerMinute = Number((totalIdeas / timeInMinutes).toFixed(1));

  // 1. FLUENCY SCORE (0 - 100)
  // Benchmark for a 2-min challenge: 4-6 is average, 8-10 is great, 12+ is top 5%
  let fluencyScore = Math.round(Math.min(100, (totalIdeas / (durationSeconds === 60 ? 6 : durationSeconds === 120 ? 10 : 14)) * 75));
  if (totalIdeas >= 12) fluencyScore = Math.min(100, 85 + (totalIdeas - 12) * 3);
  if (totalIdeas === 0) fluencyScore = 0;

  let benchmarkTier: 'Beginner' | 'Practitioner' | 'Master Designer' | 'Creative Polymath' = 'Beginner';
  if (totalIdeas >= 12) benchmarkTier = 'Creative Polymath';
  else if (totalIdeas >= 8) benchmarkTier = 'Master Designer';
  else if (totalIdeas >= 4) benchmarkTier = 'Practitioner';

  // 2. FLEXIBILITY SCORE (0 - 100)
  const categoryDistribution: Record<SemanticCategory, number> = {
    utilitarian: 0,
    structural: 0,
    acoustic: 0,
    aesthetic: 0,
    play: 0,
    survival: 0,
    scientific: 0,
    biological: 0,
    symbolic: 0,
    kinetic: 0
  };

  ideas.forEach(i => {
    categoryDistribution[i.category] = (categoryDistribution[i.category] || 0) + 1;
  });

  const uniqueCategoriesCount = Object.values(categoryDistribution).filter(c => c > 0).length;
  let flexibilityScore = Math.min(100, Math.round((uniqueCategoriesCount / 6) * 100));
  if (totalIdeas === 0) flexibilityScore = 0;

  let dominantCategory: SemanticCategory = 'utilitarian';
  let maxCatCount = 0;
  for (const [cat, count] of Object.entries(categoryDistribution) as [SemanticCategory, number][]) {
    if (count > maxCatCount) {
      maxCatCount = count;
      dominantCategory = cat;
    }
  }

  // 3. ORIGINALITY SCORE (0 - 100)
  let totalOrig = 0;
  let mostOriginalIdea: SubmittedIdea | null = null;
  let highestOrigScore = -1;
  let lateralCount = 0;

  ideas.forEach(i => {
    totalOrig += i.originalityScore;
    if (i.originalityScore > highestOrigScore) {
      highestOrigScore = i.originalityScore;
      mostOriginalIdea = i;
    }
    if (i.originalityScore >= 70) {
      lateralCount++;
    }
  });

  const averageOriginality = totalIdeas > 0 ? Math.round(totalOrig / totalIdeas) : 0;
  const originalityRatio = totalIdeas > 0 ? Math.round((lateralCount / totalIdeas) * 100) : 0;

  // 4. ELABORATION SCORE (0 - 100)
  let totalElab = 0;
  let totalWords = 0;
  ideas.forEach(i => {
    totalElab += i.elaborationScore;
    totalWords += i.text.trim().split(/\s+/).length;
  });

  const averageElab = totalIdeas > 0 ? Math.round(totalElab / totalIdeas) : 0;
  const averageWordCount = totalIdeas > 0 ? Number((totalWords / totalIdeas).toFixed(1)) : 0;
  const actionVerbDensity = Number((averageElab / 20).toFixed(1));

  // Overall Index (weighted composite)
  const overallCreativeIndex = totalIdeas === 0 ? 0 : Math.round(
    fluencyScore * 0.25 +
    flexibilityScore * 0.30 +
    averageOriginality * 0.30 +
    averageElab * 0.15
  );

  // Identify lowest pillar for tailored takeaway
  const scores = [
    { pillar: 'Fluency' as const, val: fluencyScore },
    { pillar: 'Flexibility' as const, val: flexibilityScore },
    { pillar: 'Originality' as const, val: averageOriginality },
    { pillar: 'Elaboration' as const, val: averageElab }
  ];

  scores.sort((a, b) => a.val - b.val);
  const lowest = scores[0];

  const designTakeaways = {
    Fluency: {
      headline: 'Overcoming the Internal Censor (Lowering Ideation Threshold)',
      exercise: 'During the first 45 seconds, write rapid-fire associations without evaluating feasibility. In creative divergent thinking, quantity breeds quality.',
      method: 'Rapid Association Sprint'
    },
    Flexibility: {
      headline: 'Semantic Domain Hopping (Category Matrix)',
      exercise: 'Deliberately switch lenses after every 2 ideas: shift from Utilitarian (holding, cutting) to Biological (plants, creatures) or Acoustic (chimes, dampeners).',
      method: 'SCAMPER & Cross-Domain Transfer'
    },
    Originality: {
      headline: 'Inverting Obvious Constraints (Second-Order Thinking)',
      exercise: 'Purposely discard the first 3 uses that come to mind. Ask: "What is this object worst at?" and invert that weakness into an unexpected structural feature.',
      method: 'Constraint Inversion & TRIZ'
    },
    Elaboration: {
      headline: 'Functional Articulation (Mechanism Detailing)',
      exercise: 'When you pitch a concept, specify the physical interaction: instead of "a doorstop", define "a tapered friction wedge slotted under the frame with grip texture".',
      method: 'Design Spec Detailing'
    }
  };

  return {
    fluency: {
      raw: totalIdeas,
      ideasPerMinute,
      benchmarkTier,
      score: fluencyScore
    },
    flexibility: {
      uniqueCategoriesCount,
      categoryDistribution,
      score: flexibilityScore,
      dominantCategory
    },
    originality: {
      averageScore: averageOriginality,
      mostOriginalIdea,
      originalityRatio,
      score: averageOriginality
    },
    elaboration: {
      averageWordCount,
      actionVerbDensity,
      score: averageElab,
      averageScore: averageElab
    },
    overallCreativeIndex,
    mostUniqueIdea: mostOriginalIdea,
    designTakeaway: {
      pillar: lowest.pillar,
      headline: designTakeaways[lowest.pillar].headline,
      exercise: designTakeaways[lowest.pillar].exercise,
      method: designTakeaways[lowest.pillar].method
    }
  };
}
