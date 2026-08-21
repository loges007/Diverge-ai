export type SemanticCategory =
  | 'utilitarian'
  | 'structural'
  | 'acoustic'
  | 'aesthetic'
  | 'play'
  | 'survival'
  | 'scientific'
  | 'biological'
  | 'symbolic'
  | 'kinetic';

export interface ItemDefinition {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  material: string;
  dimensions: string;
  commonUses: string[]; // Clichés used to evaluate originality
  keywords: string[];
  iconType: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  promptHint: string;
}

export interface SubmittedIdea {
  id: string;
  text: string;
  timestamp: number; // Seconds since test start
  category: SemanticCategory;
  originalityScore: number; // 0-100
  elaborationScore: number; // 0-100
  rarityTag?: 'Conventional' | 'Lateral' | 'Radical' | 'Visionary';
  isDuplicate?: boolean;
}

export interface AUTScoreBreakdown {
  fluency: {
    raw: number;
    ideasPerMinute: number;
    benchmarkTier: 'Beginner' | 'Practitioner' | 'Master Designer' | 'Creative Polymath';
    score: number; // 0-100 normalized
  };
  flexibility: {
    uniqueCategoriesCount: number;
    categoryDistribution: Record<SemanticCategory, number>;
    score: number; // 0-100 normalized
    dominantCategory: SemanticCategory;
  };
  originality: {
    averageScore: number;
    mostOriginalIdea: SubmittedIdea | null;
    originalityRatio: number; // Percentage of lateral/radical ideas
    score: number; // 0-100
  };
  elaboration: {
    averageWordCount: number;
    actionVerbDensity: number;
    score: number; // 0-100
    averageScore: number;
  };
  overallCreativeIndex: number; // 0-100
  mostUniqueIdea: SubmittedIdea | null;
  designTakeaway: {
    pillar: 'Fluency' | 'Flexibility' | 'Originality' | 'Elaboration';
    headline: string;
    exercise: string;
    method: string;
  };
}

export interface TestSession {
  id: string;
  date: string;
  item: ItemDefinition;
  durationSeconds: number;
  completedInSeconds: number;
  ideas: SubmittedIdea[];
  scores: AUTScoreBreakdown;
}

export interface LateralNudge {
  id: string;
  label: string;
  prompt: string;
  method: 'SCAMPER' | 'TRIZ' | 'ScaleShift' | 'ContextShift' | 'Biomimicry' | 'Deconstruction';
  icon: string;
}
