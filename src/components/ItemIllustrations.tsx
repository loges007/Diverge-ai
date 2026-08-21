import React from 'react';

interface IllustrationProps {
  type: string;
  className?: string;
}

export const ItemIllustration: React.FC<IllustrationProps> = ({
  type,
  className = 'w-24 h-24'
}) => {
  switch (type) {
    case 'coffee':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Ceramic Cup Body */}
          <rect x="22" y="32" width="46" height="46" rx="8" fill="#F59E0B" fillOpacity="0.18" stroke="#D97706" strokeWidth="3.5" />
          {/* Inner Glaze line */}
          <ellipse cx="45" cy="35" rx="19" ry="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          {/* Handle */}
          <path d="M 68 40 C 86 40 86 66 68 66" fill="none" stroke="#D97706" strokeWidth="4" />
          {/* Steam curls */}
          <path d="M 36 24 Q 40 18 36 12" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M 46 22 Q 51 15 46 8" fill="none" stroke="#D97706" strokeWidth="3" />
          <path d="M 56 24 Q 60 18 56 12" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Base saucer */}
          <path d="M 14 84 L 76 84" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'paperclip':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="44" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="2" strokeDasharray="4 4" />
          <path
            d="M 38 78 L 38 32 C 38 20 58 20 58 32 L 58 72 C 58 86 24 86 24 72 L 24 22 C 24 6 74 6 74 22 L 74 72"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="4.5"
          />
          {/* Metallic gleam */}
          <line x1="74" y1="36" x2="74" y2="48" stroke="#818CF8" strokeWidth="3" />
        </svg>
      );

    case 'brick':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* 3D Terracotta Brick */}
          <polygon points="18,44 62,24 86,36 42,56" fill="#F87171" fillOpacity="0.3" stroke="#DC2626" strokeWidth="3.5" />
          <polygon points="18,44 42,56 42,80 18,68" fill="#DC2626" fillOpacity="0.4" stroke="#DC2626" strokeWidth="3.5" />
          <polygon points="42,56 86,36 86,60 42,80" fill="#B91C1C" fillOpacity="0.5" stroke="#991B1B" strokeWidth="3.5" />
          {/* Core holes */}
          <ellipse cx="36" cy="42" rx="4.5" ry="2.5" fill="#7F1D1D" stroke="#991B1B" strokeWidth="2" />
          <ellipse cx="52" cy="35" rx="4.5" ry="2.5" fill="#7F1D1D" stroke="#991B1B" strokeWidth="2" />
          <ellipse cx="68" cy="29" rx="4.5" ry="2.5" fill="#7F1D1D" stroke="#991B1B" strokeWidth="2" />
        </svg>
      );

    case 'skateboard':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Skateboard deck */}
          <path
            d="M 12 60 C 14 54 24 50 50 50 C 76 50 86 54 88 60 L 84 64 C 80 58 74 54 50 54 C 26 54 20 58 16 64 Z"
            fill="#10B981"
            stroke="#047857"
            strokeWidth="3"
          />
          {/* Deck stripe */}
          <path d="M 22 55 L 78 55" stroke="#34D399" strokeWidth="2" />
          {/* Trucks */}
          <rect x="24" y="64" width="8" height="6" rx="2" fill="#64748B" stroke="#334155" strokeWidth="2" />
          <rect x="68" y="64" width="8" height="6" rx="2" fill="#64748B" stroke="#334155" strokeWidth="2" />
          {/* Wheels */}
          <circle cx="28" cy="74" r="6" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="72" cy="74" r="6" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
        </svg>
      );

    case 'umbrella':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Canopy dome */}
          <path
            d="M 16 54 C 16 30 50 18 50 18 C 50 18 84 30 84 54 C 74 50 64 54 50 50 C 36 54 26 50 16 54 Z"
            fill="#06B6D4"
            fillOpacity="0.25"
            stroke="#0891B2"
            strokeWidth="3.5"
          />
          {/* Ribs */}
          <path d="M 50 18 Q 36 36 34 52" fill="none" stroke="#0891B2" strokeWidth="2.5" />
          <path d="M 50 18 Q 64 36 66 52" fill="none" stroke="#0891B2" strokeWidth="2.5" />
          {/* Spire tip */}
          <line x1="50" y1="18" x2="50" y2="12" stroke="#1E293B" strokeWidth="3" />
          {/* Shaft & J-handle */}
          <line x1="50" y1="50" x2="50" y2="76" stroke="#1E293B" strokeWidth="3" />
          <path d="M 50 76 C 50 86 64 86 64 78" fill="none" stroke="#1E293B" strokeWidth="3" />
        </svg>
      );

    case 'hanger':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Hook */}
          <path d="M 46 28 C 46 16 58 16 58 24 C 58 32 50 34 50 40" fill="none" stroke="#9333EA" strokeWidth="3.5" />
          {/* Wire Triangle */}
          <polygon points="50,40 14,68 86,68" fill="#F3E8FF" stroke="#7E22CE" strokeWidth="3.5" />
          {/* Bottom crossbar */}
          <line x1="14" y1="68" x2="86" y2="68" stroke="#6B21A8" strokeWidth="4" />
        </svg>
      );

    case 'jar':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Screw Lid */}
          <rect x="32" y="18" width="36" height="10" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
          <line x1="32" y1="23" x2="68" y2="23" stroke="#CBD5E1" strokeWidth="2" />
          {/* Glass Body */}
          <rect x="24" y="28" width="52" height="56" rx="10" fill="#E0F2FE" fillOpacity="0.3" stroke="#0284C7" strokeWidth="3.5" />
          {/* Glass reflections */}
          <path d="M 32 38 L 32 74" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 38 42 L 38 68" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'chain':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Link 1 */}
          <rect x="16" y="40" width="32" height="20" rx="10" fill="none" stroke="#64748B" strokeWidth="4.5" />
          {/* Link 2 overlapping */}
          <rect x="34" y="40" width="32" height="20" rx="10" fill="none" stroke="#334155" strokeWidth="4.5" />
          {/* Link 3 */}
          <rect x="52" y="40" width="32" height="20" rx="10" fill="none" stroke="#64748B" strokeWidth="4.5" />
          {/* Pins */}
          <circle cx="26" cy="50" r="3" fill="#0F172A" />
          <circle cx="44" cy="50" r="3" fill="#0F172A" />
          <circle cx="62" cy="50" r="3" fill="#0F172A" />
          <circle cx="74" cy="50" r="3" fill="#0F172A" />
        </svg>
      );

    case 'record':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Outer vinyl disc */}
          <circle cx="50" cy="50" r="42" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
          {/* Grooves */}
          <circle cx="50" cy="50" r="34" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="10 4" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="8 3" />
          {/* Center paper label */}
          <circle cx="50" cy="50" r="16" fill="#F43F5E" stroke="#E11D48" strokeWidth="2.5" />
          {/* Center spindle hole */}
          <circle cx="50" cy="50" r="4" fill="#FDFCF9" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );

    case 'pallet':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Top Slats */}
          <rect x="14" y="28" width="72" height="8" rx="2" fill="#D97706" fillOpacity="0.4" stroke="#B45309" strokeWidth="2.5" />
          <rect x="14" y="42" width="72" height="8" rx="2" fill="#D97706" fillOpacity="0.4" stroke="#B45309" strokeWidth="2.5" />
          <rect x="14" y="56" width="72" height="8" rx="2" fill="#D97706" fillOpacity="0.4" stroke="#B45309" strokeWidth="2.5" />
          {/* Risers */}
          <rect x="18" y="64" width="10" height="12" fill="#78350F" stroke="#78350F" strokeWidth="2" />
          <rect x="45" y="64" width="10" height="12" fill="#78350F" stroke="#78350F" strokeWidth="2" />
          <rect x="72" y="64" width="10" height="12" fill="#78350F" stroke="#78350F" strokeWidth="2" />
          {/* Bottom Slat */}
          <rect x="14" y="74" width="72" height="6" rx="1.5" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        </svg>
      );

    case 'tennis':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Felt ball */}
          <circle cx="50" cy="50" r="38" fill="#BEF264" stroke="#84CC16" strokeWidth="3.5" />
          {/* Seam curves */}
          <path d="M 24 28 C 42 36 42 64 24 72" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M 76 28 C 58 36 58 64 76 72" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        </svg>
      );

    case 'pencil':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Diagonal pencil shaft */}
          <polygon points="26,74 72,28 80,36 34,82" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          {/* Graphite tip */}
          <polygon points="18,82 26,74 34,82" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <polygon points="18,82 22,78 26,82" fill="#1E293B" />
          {/* Metal Ferrule */}
          <polygon points="68,32 76,24 82,30 74,38" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
          {/* Pink Eraser */}
          <polygon points="76,24 82,18 88,24 82,30" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
        </svg>
      );

    case 'box':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* 3D Box Top */}
          <polygon points="50,18 82,34 50,50 18,34" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
          {/* Box Left */}
          <polygon points="18,34 50,50 50,82 18,66" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          {/* Box Right */}
          <polygon points="50,50 82,34 82,66 50,82" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          {/* Tape line */}
          <line x1="50" y1="18" x2="50" y2="50" stroke="#78350F" strokeWidth="2.5" strokeDasharray="3 2" />
        </svg>
      );

    case 'lightbulb':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Glass envelope */}
          <path
            d="M 50 16 C 34 16 28 28 28 40 C 28 50 38 56 38 66 L 62 66 C 62 56 72 50 72 40 C 72 28 66 16 50 16 Z"
            fill="#FEF08A"
            fillOpacity="0.4"
            stroke="#CA8A04"
            strokeWidth="3.5"
          />
          {/* Filament */}
          <path d="M 44 48 L 47 34 L 53 34 L 56 48" fill="none" stroke="#EAB308" strokeWidth="2.5" />
          {/* Screw Base */}
          <rect x="40" y="66" width="20" height="6" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
          <rect x="42" y="72" width="16" height="6" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
          <rect x="45" y="78" width="10" height="4" rx="2" fill="#475569" />
          {/* Glow rays */}
          <line x1="50" y1="6" x2="50" y2="10" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="20" x2="24" y2="24" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="80" y1="20" x2="76" y2="24" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'sponge':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Green Scouring Layer */}
          <rect x="20" y="30" width="60" height="12" rx="4" fill="#10B981" stroke="#047857" strokeWidth="3" />
          {/* Yellow Cellulose Foam */}
          <rect x="20" y="42" width="60" height="34" rx="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="3.5" />
          {/* Sponge pores */}
          <circle cx="32" cy="52" r="3" fill="#EAB308" />
          <circle cx="50" cy="58" r="4.5" fill="#EAB308" />
          <circle cx="68" cy="50" r="2.5" fill="#EAB308" />
          <circle cx="38" cy="66" r="3.5" fill="#EAB308" />
          <circle cx="58" cy="68" r="3" fill="#EAB308" />
        </svg>
      );

    case 'key':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Key Head */}
          <circle cx="34" cy="50" r="18" fill="#FBBF24" stroke="#D97706" strokeWidth="3.5" />
          <circle cx="34" cy="50" r="6" fill="#FDFCF9" stroke="#D97706" strokeWidth="2.5" />
          {/* Key Shaft */}
          <rect x="52" y="46" width="34" height="8" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          {/* Notches / Teeth */}
          <rect x="70" y="54" width="6" height="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
          <rect x="80" y="54" width="6" height="12" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
        </svg>
      );

    case 'fork':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* 4 Tines */}
          <line x1="38" y1="18" x2="38" y2="40" stroke="#64748B" strokeWidth="3" />
          <line x1="46" y1="18" x2="46" y2="40" stroke="#64748B" strokeWidth="3" />
          <line x1="54" y1="18" x2="54" y2="40" stroke="#64748B" strokeWidth="3" />
          <line x1="62" y1="18" x2="62" y2="40" stroke="#64748B" strokeWidth="3" />
          {/* Base curve */}
          <path d="M 38 40 C 38 52 62 52 62 40" fill="none" stroke="#64748B" strokeWidth="3.5" />
          {/* Handle */}
          <line x1="50" y1="48" x2="50" y2="84" stroke="#475569" strokeWidth="4.5" />
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Open Book Wings */}
          <path
            d="M 50 32 C 34 26 18 30 14 34 L 14 74 C 18 70 34 66 50 72 C 66 66 82 70 86 74 L 86 34 C 82 30 66 26 50 32 Z"
            fill="#3B82F6"
            fillOpacity="0.2"
            stroke="#2563EB"
            strokeWidth="3.5"
          />
          {/* Center spine */}
          <line x1="50" y1="32" x2="50" y2="72" stroke="#1D4ED8" strokeWidth="3.5" />
          {/* Page lines */}
          <line x1="22" y1="44" x2="42" y2="42" stroke="#93C5FD" strokeWidth="2" />
          <line x1="22" y1="54" x2="42" y2="52" stroke="#93C5FD" strokeWidth="2" />
          <line x1="58" y1="42" x2="78" y2="44" stroke="#93C5FD" strokeWidth="2" />
          <line x1="58" y1="52" x2="78" y2="54" stroke="#93C5FD" strokeWidth="2" />
        </svg>
      );

    case 'candle':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Wax Pillar */}
          <rect x="34" y="38" width="32" height="46" rx="4" fill="#FEF08A" fillOpacity="0.5" stroke="#EAB308" strokeWidth="3.5" />
          {/* Wick */}
          <line x1="50" y1="38" x2="50" y2="30" stroke="#713F12" strokeWidth="2.5" />
          {/* Flame */}
          <path d="M 50 14 C 44 22 46 28 50 30 C 54 28 56 22 50 14 Z" fill="#F97316" stroke="#EA580C" strokeWidth="2.5" />
          {/* Flame core */}
          <path d="M 50 20 C 47 24 48 28 50 29 C 52 28 53 24 50 20 Z" fill="#FDE047" />
        </svg>
      );

    case 'magnet':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Horseshoe Magnet */}
          <path
            d="M 28 72 L 28 42 C 28 26 72 26 72 42 L 72 72 L 58 72 L 58 42 C 58 36 42 36 42 42 L 42 72 Z"
            fill="#EF4444"
            fillOpacity="0.25"
            stroke="#DC2626"
            strokeWidth="3.5"
          />
          {/* Silver Poles */}
          <rect x="28" y="60" width="14" height="12" fill="#94A3B8" stroke="#64748B" strokeWidth="2.5" />
          <rect x="58" y="60" width="14" height="12" fill="#94A3B8" stroke="#64748B" strokeWidth="2.5" />
          {/* Magnetic field arcs */}
          <path d="M 35 78 Q 50 88 65 78" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'toothbrush':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Handle */}
          <path d="M 24 82 C 30 72 42 50 64 34 L 72 26" fill="none" stroke="#06B6D4" strokeWidth="6" strokeLinecap="round" />
          {/* Grip rubber */}
          <path d="M 38 66 C 44 58 48 52 54 44" fill="none" stroke="#0891B2" strokeWidth="4" strokeLinecap="round" />
          {/* Bristle head block */}
          <rect x="68" y="20" width="16" height="8" rx="2" fill="#FFFFFF" stroke="#06B6D4" strokeWidth="2" transform="rotate(-45 68 20)" />
          {/* Bristles */}
          <line x1="68" y1="16" x2="74" y2="10" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="74" y1="22" x2="80" y2="16" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="80" y1="28" x2="86" y2="22" stroke="#38BDF8" strokeWidth="2.5" />
        </svg>
      );

    case 'spoon':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Oval Bowl */}
          <ellipse cx="50" cy="30" rx="16" ry="20" fill="#E2E8F0" stroke="#64748B" strokeWidth="3.5" />
          <ellipse cx="50" cy="30" rx="12" ry="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          {/* Handle */}
          <path d="M 50 50 L 50 84" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="84" r="3.5" fill="#475569" />
        </svg>
      );

    case 'rubberband':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Stretched elastic ring */}
          <ellipse cx="50" cy="50" rx="36" ry="24" fill="#FEF08A" fillOpacity="0.3" stroke="#EAB308" strokeWidth="5" transform="rotate(-15 50 50)" />
          <ellipse cx="50" cy="50" rx="30" ry="18" fill="none" stroke="#CA8A04" strokeWidth="2" strokeDasharray="6 3" transform="rotate(-15 50 50)" />
        </svg>
      );

    case 'bottle':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Cap */}
          <rect x="42" y="14" width="16" height="8" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Neck */}
          <rect x="44" y="22" width="12" height="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          {/* Body */}
          <path
            d="M 44 32 C 34 36 30 46 30 54 L 30 78 C 30 84 34 86 50 86 C 66 86 70 84 70 78 L 70 54 C 70 46 66 36 56 32 Z"
            fill="#E0F2FE"
            fillOpacity="0.4"
            stroke="#0284C7"
            strokeWidth="3.5"
          />
          {/* Water level wave */}
          <path d="M 32 64 Q 50 68 68 64 L 68 78 C 68 82 64 84 50 84 C 36 84 32 82 32 78 Z" fill="#60A5FA" fillOpacity="0.5" />
        </svg>
      );

    case 'towel':
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          {/* Folded towel stack */}
          <rect x="22" y="52" width="56" height="26" rx="6" fill="#F472B6" fillOpacity="0.3" stroke="#DB2777" strokeWidth="3.5" />
          <rect x="24" y="36" width="52" height="20" rx="5" fill="#F472B6" fillOpacity="0.4" stroke="#DB2777" strokeWidth="3" />
          <rect x="28" y="24" width="44" height="16" rx="4" fill="#F472B6" fillOpacity="0.5" stroke="#BE185D" strokeWidth="3" />
          {/* Fluffy stripes */}
          <line x1="32" y1="65" x2="70" y2="65" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="38" fill="#F3F4F6" stroke="#1A1A1A" strokeWidth="3" />
          <polygon points="50,22 66,42 50,78 34,42" fill="#2563EB" fillOpacity="0.3" stroke="#2563EB" strokeWidth="3" />
        </svg>
      );
  }
};
