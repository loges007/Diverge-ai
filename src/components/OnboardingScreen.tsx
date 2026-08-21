import React, { useState } from 'react';
import { Play, Sparkles, Lightbulb, Zap, History, Volume2, VolumeX, ArrowRight, Clock, Sun, Moon } from 'lucide-react';
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
    { label: '1 Min Blitz', seconds: 60, desc: 'Fast Warmup' },
    { label: '2 Min Standard', seconds: 120, desc: 'Recommended' },
    { label: '3 Min Deep', seconds: 180, desc: 'Maximum Lateral Range' }
  ];

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
      darkMode ? 'bg-[#0B0F17] text-[#F8FAFC]' : 'bg-[#FBF9F5] text-[#111827]'
    }`}>
      
      {/* 1. Header Toolbar */}
      <header className={`px-6 sm:px-12 py-5 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-20 transition-colors ${
        darkMode ? 'border-slate-800 bg-[#0B0F17]/90' : 'border-stone-200/70 bg-[#FBF9F5]/90'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs ${
            darkMode ? 'bg-blue-600' : 'bg-[#111827]'
          }`}>
            <div className="w-3 h-3 bg-white rotate-45" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight">Diverge.</span>
            <span className={`hidden sm:inline-block ml-2.5 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-slate-800 text-slate-300' : 'bg-stone-200/70 text-stone-700'
            }`}>
              Brain Trainer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Indicator */}
          {streak.totalSessions > 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs ${
              darkMode ? 'bg-amber-950/40 border border-amber-800/60 text-amber-300' : 'bg-amber-50 border border-amber-200/80 text-amber-900'
            }`}>
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streak.currentStreak} Day Streak</span>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2.5 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-amber-400'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            className={`p-2.5 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-500" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* History Button */}
          {streak.totalSessions > 0 && (
            <button
              onClick={onOpenHistory}
              aria-label="View Past Workout History"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-bold transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                  : 'bg-white border-stone-200 hover:border-stone-400 text-stone-700 hover:text-black'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. Main Focus Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 sm:px-10 py-10 sm:py-16 flex flex-col justify-center items-center text-center">
        
        {/* Tier Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5 shadow-xs ${
          darkMode
            ? 'bg-blue-950/60 border border-blue-800 text-blue-300'
            : 'bg-blue-50 border border-blue-200/80 text-blue-800'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Guilford Alternative Uses Test</span>
        </div>

        {/* Level 1 Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] mb-4 max-w-2xl">
          How many creative uses can you think of?
        </h1>

        {/* Level 2 Subtitle & Value Proposition */}
        <div className="max-w-xl mb-9 space-y-3 text-center">
          <p className={`text-base sm:text-lg leading-relaxed font-normal ${
            darkMode ? 'text-slate-300' : 'text-stone-600'
          }`}>
            You'll receive 1 everyday object. In a fast timed sprint, type as many unusual, clever, or wild alternative uses as you can.
          </p>
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
            darkMode
              ? 'bg-blue-950/40 border border-blue-800/60 text-blue-300'
              : 'bg-blue-50/80 border border-blue-200/70 text-blue-800'
          }`}>
            <span className="font-black uppercase tracking-wider text-[10px]">Why this matters</span>
            <span className="opacity-40">•</span>
            <span>Breaks mental habits and trains rapid lateral thinking for everyday creativity.</span>
          </div>
        </div>

        {/* Structured Example Card */}
        <div className={`w-full max-w-xl border rounded-3xl p-6 sm:p-7 shadow-xs text-left mb-10 space-y-4 transition-colors ${
          darkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-stone-200'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3.5 ${
            darkMode ? 'border-slate-800' : 'border-stone-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center p-1.5 shrink-0 ${
                darkMode ? 'bg-amber-950/40 border-amber-800/60' : 'bg-amber-50 border-amber-200/60'
              }`}>
                <ItemIllustration type="coffee" className="w-8 h-8" />
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest block ${
                  darkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  Quick Example
                </span>
                <h3 className="font-extrabold text-base">A Coffee Mug</h3>
              </div>
            </div>
            <span className={`text-[11px] font-mono font-medium ${
              darkMode ? 'text-slate-500' : 'text-stone-400'
            }`}>3 Categories</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-1.5 ${
              darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200/70'
            }`}>
              <span className={`text-[10px] uppercase font-bold ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>1. Utilitarian</span>
              <p className="text-xs font-bold leading-snug">Scoop for pet food or grain</p>
            </div>

            <div className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-1.5 ${
              darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200/70'
            }`}>
              <span className="text-[10px] uppercase font-bold text-blue-500">2. Clever Physics</span>
              <p className="text-xs font-bold leading-snug">Acoustic horn amplifier</p>
            </div>

            <div className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-1.5 ${
              darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200/70'
            }`}>
              <span className="text-[10px] uppercase font-bold text-emerald-500">3. Wild Angle</span>
              <p className="text-xs font-bold leading-snug">Sundial shadow gnomon</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 pt-1 text-xs font-medium ${
            darkMode ? 'text-slate-400' : 'text-stone-500'
          }`}>
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Speed and diversity matter — don't self-censor during the sprint!</span>
          </div>
        </div>

        {/* Action Controls & Primary CTA */}
        <div className="flex flex-col items-center space-y-5 w-full max-w-md">
          
          {/* Duration Selector Segmented Control */}
          <div className="w-full space-y-2">
            <div className={`flex items-center justify-center gap-1 text-xs font-bold ${
              darkMode ? 'text-slate-400' : 'text-stone-500'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>Select Sprint Duration</span>
            </div>
            
            <div className={`grid grid-cols-3 gap-2 p-1.5 rounded-2xl ${
              darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-stone-200/60'
            }`}>
              {durationOptions.map((opt) => (
                <button
                  key={opt.seconds}
                  type="button"
                  onClick={() => setSelectedDuration(opt.seconds)}
                  aria-pressed={selectedDuration === opt.seconds}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selectedDuration === opt.seconds
                      ? darkMode
                        ? 'bg-blue-600 text-white shadow-sm scale-[1.02]'
                        : 'bg-white text-[#111827] shadow-sm ring-1 ring-black/5 scale-[1.02]'
                      : darkMode
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'text-stone-600 hover:text-black hover:bg-stone-200/50'
                  }`}
                >
                  <span className="font-extrabold">{opt.label.split(' ')[0]} {opt.label.split(' ')[1]}</span>
                  <span className="text-[9px] font-normal opacity-80 truncate">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PRIMARY LEVEL 1 CTA BUTTON */}
          <button
            type="button"
            onClick={() => onStart(selectedDuration)}
            className={`w-full py-4.5 px-8 rounded-2xl font-black text-base uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-[#111827] hover:bg-black text-white'
            }`}
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>Start Brainstorming ({selectedDuration / 60}m)</span>
            <ArrowRight className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
          </button>

          {/* Helper Subtext */}
          <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>
            Press <kbd className={`px-2 py-0.5 rounded border font-bold font-mono ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-stone-300 text-stone-800'
            }`}>Enter</kbd> to submit each idea during the run.
          </span>
        </div>

      </main>

      {/* 3. Footer */}
      <footer className={`py-5 px-6 text-center text-xs border-t transition-colors ${
        darkMode ? 'border-slate-800 text-slate-500 bg-[#0B0F17]' : 'border-stone-200/60 text-stone-400 bg-[#FBF9F5]'
      }`}>
        Diverge Brain Trainer • Grounded in Guilford's Divergent Thinking Protocol
      </footer>
    </div>
  );
};
