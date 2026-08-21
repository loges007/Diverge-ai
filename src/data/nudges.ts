import { LateralNudge } from '../types/aut';

export const LATERAL_NUDGES: LateralNudge[] = [
  {
    id: 'scale-shift',
    label: 'Scale Inversion',
    prompt: 'What if this object was 100x bigger (the size of a building) or 100x smaller (microscopic)?',
    method: 'ScaleShift',
    icon: 'Maximize2'
  },
  {
    id: 'material-phase',
    label: 'Material Transformation',
    prompt: 'What if you ground it into fine powder, melted it into liquid, or compressed it into a block?',
    method: 'SCAMPER',
    icon: 'Layers'
  },
  {
    id: 'extreme-context',
    label: 'Extreme Environment',
    prompt: 'How would an astronaut on Mars or a deep-sea marine biologist use this during an emergency?',
    method: 'ContextShift',
    icon: 'Compass'
  },
  {
    id: 'non-human',
    label: 'Non-Human Actor',
    prompt: 'How could a crow, an ant colony, or an autonomous delivery robot utilize this object?',
    method: 'Biomimicry',
    icon: 'Sparkles'
  },
  {
    id: 'sensory-pivot',
    label: 'Sensory Pivot',
    prompt: 'Forget its visual look: how does it sound when struck, how does it conduct heat, or how does light refract through it?',
    method: 'SCAMPER',
    icon: 'Volume2'
  },
  {
    id: 'deconstruct',
    label: 'Deconstruction & Harvest',
    prompt: 'Disassemble it completely. What can you build using only its individual raw components?',
    method: 'Deconstruction',
    icon: 'Scissors'
  },
  {
    id: 'system-inversion',
    label: 'Invert the Primary Function',
    prompt: 'If its usual job is to hold or contain, make it release, propel, filter, or measure.',
    method: 'TRIZ',
    icon: 'RefreshCw'
  },
  {
    id: 'symbolic-artifact',
    label: 'Cultural & Symbolic',
    prompt: 'How could this object serve as a secret currency, a ceremonial token, or a typographic character in a new alphabet?',
    method: 'ContextShift',
    icon: 'Award'
  }
];

export const GET_RANDOM_NUDGE = (previousId?: string): LateralNudge => {
  const candidates = LATERAL_NUDGES.filter(n => n.id !== previousId);
  return candidates[Math.floor(Math.random() * candidates.length)];
};
