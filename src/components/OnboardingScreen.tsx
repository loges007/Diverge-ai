import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Zap, 
  History, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Clock, 
  Sun, 
  Moon, 
  Lightbulb, 
  CheckCircle2, 
  Target,
  Layers,
  Award
} from 'lucide-react';
import { UserStreak } from '../utils/storage';
import { ItemIllustration } from './ItemIllustrations';

interface OnboardingScreenProps {
  onStart: (durationSeconds: number) => void;
  streak: UserStreak;
  onOpenHistory: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onStart,
  streak,
  onOpenHistory,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(120);

  const durationOptions = [
    { label: '1 Min', badge: 'Blitz', seconds: 60 },
    { label: '2 Min', badge: 'Standard', seconds: 120, recommended: true },
    { label: '3 Min', badge: 'Deep', seconds: 180 }
  ];

  return (
    <div className={`min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-between transition-colors duration-200 ${
      darkMode ? 'bg-[#0B0F17] text-[#F8FAFC]' : 'bg-[#FBF9F5] text-[#111827]'
    }`}>
      
      {/* 1. Header Toolbar */}
      <header className={`px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-20 transition-colors shrink-0 ${
        darkMode ? 'border-slate-800 bg-[#0B0F17]/90' : 'border-stone-200/70 bg-[#FBF9F5]/90'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs ${
            darkMode ? 'bg-blue-600' : 'bg-[#111827]'
          }`}>
            <div className="w-2.5 h-2.5 bg-white rotate-45" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-black text-lg sm:text-xl tracking-tight">Diverge.</span>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-slate-800 text-slate-300' : 'bg-stone-200/80 text-stone-700'
            }`}>
              Lateral Brain Trainer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Streak Indicator */}
          {streak.totalSessions > 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs ${
              darkMode ? 'bg-amber-950/40 border border-amber-800/60 text-amber-300' : 'bg-amber-50 border border-amber-200/80 text-amber-900'
            }`}>
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streak.currentStreak} Day{streak.currentStreak > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Past Workout History Button */}
          {streak.totalSessions > 0 && (
            <button
              onClick={onOpenHistory}
              aria-label="View Past Workout History"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                  : 'bg-white border-stone-200 hover:border-stone-400 text-stone-700 hover:text-black'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">History</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            className={`p-2 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-500" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-amber-400'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* 2. Main Hero & Instant Setup Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Direct Hook + Core Action */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Scientific Protocol Pill */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs ${
              darkMode
                ? 'bg-blue-950/60 border border-blue-800/80 text-blue-300'
                : 'bg-blue-50 border border-blue-200/90 text-blue-800'
            }`}>
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>J.P. Guilford's Alternative Uses Test</span>
            </div>

            {/* High-Impact Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]">
                How many creative uses can you discover?
              </h1>
              <p className={`text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-stone-600'
              }`}>
                You'll get <strong className={darkMode ? 'text-white' : 'text-stone-900'}>1 everyday object</strong>. Race the timer to type as many clever, wild, or non-obvious uses as possible.
              </p>
            </div>

            {/* 3 Step Visual Flow */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
              <div className={`p-2.5 sm:p-3 rounded-2xl border ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center gap-1.5 text-blue-500 mb-1">
                  <Target className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase">Step 1</span>
                </div>
                <div className="font-extrabold text-xs">Get 1 Object</div>
                <div className={`text-[10px] leading-tight mt-0.5 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                  e.g., Brick or Mug
                </div>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-2xl border ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase">Step 2</span>
                </div>
                <div className="font-extrabold text-xs">Type Rapid Uses</div>
                <div className={`text-[10px] leading-tight mt-0.5 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                  No self-censorship
                </div>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-2xl border ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase">Step 3</span>
                </div>
                <div className="font-extrabold text-xs">Get Scored</div>
                <div className={`text-[10px] leading-tight mt-0.5 ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                  4 Guilford pillars
                </div>
              </div>
            </div>

            {/* Duration Selector + Instant CTA Box */}
            <div className={`p-3.5 sm:p-4 rounded-3xl border space-y-3.5 transition-colors ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-stone-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1.5 text-xs font-bold ${
                  darkMode ? 'text-slate-300' : 'text-stone-700'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Choose Sprint Duration:</span>
                </div>
                <span className={`text-[11px] font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>
                  Press Enter to submit ideas
                </span>
              </div>

              {/* Segmented Control */}
              <div className={`grid grid-cols-3 gap-1.5 p-1 rounded-2xl ${
                darkMode ? 'bg-slate-950/80 border border-slate-800/80' : 'bg-stone-100'
              }`}>
                {durationOptions.map((opt) => (
                  <button
                    key={opt.seconds}
                    type="button"
                    onClick={() => setSelectedDuration(opt.seconds)}
                    aria-pressed={selectedDuration === opt.seconds}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      selectedDuration === opt.seconds
                        ? darkMode
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-[#111827] shadow-xs ring-1 ring-black/5'
                        : darkMode
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          : 'text-stone-600 hover:text-black hover:bg-stone-200/60'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      selectedDuration === opt.seconds
                        ? darkMode ? 'bg-blue-700 text-white' : 'bg-stone-100 text-stone-800'
                        : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {opt.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* PRIMARY ACTION CTA */}
              <button
                type="button"
                onClick={() => onStart(selectedDuration)}
                className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-[#111827] hover:bg-black text-white'
                }`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Start Challenge ({selectedDuration / 60}m)</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Demonstration Card ("How It Works") */}
          <div className="lg:col-span-5">
            <div className={`border rounded-3xl p-5 sm:p-6 text-left space-y-4 shadow-sm transition-colors ${
              darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-stone-200/90'
            }`}>
              
              <div className={`flex items-center justify-between border-b pb-3 ${
                darkMode ? 'border-slate-800' : 'border-stone-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center p-1.5 shrink-0 ${
                    darkMode ? 'bg-amber-950/40 border-amber-800/60' : 'bg-amber-50 border-amber-200/70'
                  }`}>
                    <ItemIllustration type="coffee" className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 block">
                      Live Example
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base">A Ceramic Coffee Mug</h3>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-600'
                }`}>
                  3 Categories
                </span>
              </div>

              {/* Sample Responses with Category Tags */}
              <div className="space-y-2">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  darkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200/80'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="font-bold">"Scoop for pet food or gardening soil"</span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase shrink-0 font-bold px-1.5 py-0.5 rounded ${
                    darkMode ? 'bg-blue-950 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Utilitarian
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  darkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200/80'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-bold">"Passive acoustic speaker horn for phone"</span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase shrink-0 font-bold px-1.5 py-0.5 rounded ${
                    darkMode ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Acoustics
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  darkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200/80'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-bold">"Gnomon shadow-caster for makeshift sundial"</span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase shrink-0 font-bold px-1.5 py-0.5 rounded ${
                    darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    ★ Lateral
                  </span>
                </div>
              </div>

              {/* 4 Pillars Scoring Footnote */}
              <div className={`p-2.5 rounded-2xl border text-xs flex items-center gap-2.5 ${
                darkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-stone-50 border-stone-200/70 text-stone-600'
              }`}>
                <Layers className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-[11px] leading-tight">
                  Scored on <strong>Fluency</strong> (speed), <strong>Flexibility</strong> (categories), <strong>Originality</strong> (novelty), & <strong>Elaboration</strong> (detail).
                </span>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* 3. Minimal Footer */}
      <footer className={`py-3 px-6 text-center text-[11px] border-t transition-colors shrink-0 ${
        darkMode ? 'border-slate-800 text-slate-500 bg-[#0B0F17]' : 'border-stone-200/60 text-stone-400 bg-[#FBF9F5]'
      }`}>
        Diverge Brain Trainer • Grounded in Guilford's Divergent Thinking Protocol
      </footer>
    </div>
  );
};
