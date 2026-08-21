import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, AlertCircle, Volume2, VolumeX, Lightbulb, ArrowLeft, Pause, Play, CornerDownLeft, Sun, Moon } from 'lucide-react';
import { ItemDefinition, SubmittedIdea, SemanticCategory } from '../types/aut';
import { ItemIllustration } from './ItemIllustrations';
import { GET_RANDOM_NUDGE } from '../data/nudges';
import { classifyIdeaCategory, evaluateOriginality, evaluateElaboration } from '../utils/autScoring';
import { playSound } from '../utils/sound';

interface ActiveChallengeScreenProps {
  item: ItemDefinition;
  durationSeconds: number;
  onFinish: (ideas: SubmittedIdea[], timeTakenSeconds: number) => void;
  onCancel: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ActiveChallengeScreen: React.FC<ActiveChallengeScreenProps> = ({
  item,
  durationSeconds,
  onFinish,
  onCancel,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [ideas, setIdeas] = useState<SubmittedIdea[]>([]);
  const [isDuplicateShaking, setIsDuplicateShaking] = useState<boolean>(false);
  const [duplicateMessage, setDuplicateMessage] = useState<string>('');
  const [lastInputTimestamp, setLastInputTimestamp] = useState<number>(Date.now());
  const [currentNudge, setCurrentNudge] = useState<string | null>(null);
  const [showNudge, setShowNudge] = useState<boolean>(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState<boolean>(false);
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);
  const [recentlyDeletedText, setRecentlyDeletedText] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Focus input automatically on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcut listener (ESC to trigger exit/pause modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showConfirmFinish) {
          setShowConfirmFinish(false);
        } else if (showConfirmExit) {
          setShowConfirmExit(false);
        } else if (showNudge) {
          setShowNudge(false);
        } else {
          setShowConfirmExit(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmFinish, showConfirmExit, showNudge]);

  // Re-focus on window click to maintain seamless flow
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('button') && !target.closest('input') && !showConfirmFinish && !showConfirmExit && !isPaused) {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [showConfirmFinish, showConfirmExit, isPaused]);

  // Main Timer Hook
  useEffect(() => {
    if (isPaused || showConfirmExit || showConfirmFinish) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          playSound('finish', soundEnabled);
          const totalElapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
          onFinish(ideas, Math.min(durationSeconds, totalElapsed));
          return 0;
        }

        if (prev <= 5 && prev > 1) {
          playSound('tick', soundEnabled);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [durationSeconds, ideas, onFinish, soundEnabled, isPaused, showConfirmExit, showConfirmFinish]);

  // Idle Nudge Detection (>20 seconds idle)
  useEffect(() => {
    if (isPaused) return;

    const idleChecker = setInterval(() => {
      const idleSeconds = (Date.now() - lastInputTimestamp) / 1000;
      if (idleSeconds >= 20 && !showNudge) {
        const nudge = GET_RANDOM_NUDGE();
        setCurrentNudge(nudge.prompt);
        setShowNudge(true);
      }
    }, 3000);

    return () => clearInterval(idleChecker);
  }, [lastInputTimestamp, showNudge, isPaused]);

  // Handle Idea Submission
  const handleSubmitIdea = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isPaused) return;

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Check for duplicate
    const lower = trimmed.toLowerCase();
    const isDuplicate = ideas.some(
      (idea) =>
        idea.text.toLowerCase() === lower ||
        (idea.text.length > 5 && (lower.includes(idea.text.toLowerCase()) || idea.text.toLowerCase().includes(lower)))
    );

    if (isDuplicate) {
      playSound('duplicate', soundEnabled);
      setIsDuplicateShaking(true);
      setDuplicateMessage('Already entered! Try thinking in a new direction.');
      setTimeout(() => setIsDuplicateShaking(false), 500);
      return;
    }

    setLastInputTimestamp(Date.now());
    setDuplicateMessage('');
    setShowNudge(false);

    const category: SemanticCategory = classifyIdeaCategory(trimmed, item);
    const { score: origScore, tag: origTag } = evaluateOriginality(trimmed, item);
    const elabScore = evaluateElaboration(trimmed);

    const newIdea: SubmittedIdea = {
      id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: trimmed,
      timestamp: durationSeconds - timeLeft,
      category,
      originalityScore: origScore,
      elaborationScore: elabScore,
      rarityTag: origTag
    };

    const updated = [newIdea, ...ideas];
    setIdeas(updated);
    setInputValue('');

    if (updated.length % 5 === 0) {
      playSound('combo', soundEnabled);
    } else {
      playSound('pop', soundEnabled);
    }

    inputRef.current?.focus();
  };

  const handleDeleteIdea = (id: string, text: string) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    setRecentlyDeletedText(text);
    setTimeout(() => setRecentlyDeletedText(null), 2500);
    inputRef.current?.focus();
  };

  const handleManualNudge = () => {
    const nudge = GET_RANDOM_NUDGE();
    setCurrentNudge(nudge.prompt);
    setShowNudge(true);
    setLastInputTimestamp(Date.now());
    inputRef.current?.focus();
  };

  const handleFinishEarly = () => {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    playSound('finish', soundEnabled);
    onFinish(ideas, Math.max(1, elapsed));
  };

  // Timer Calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = timeLeft / durationSeconds;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
      darkMode ? 'bg-[#0B0F17] text-[#F8FAFC]' : 'bg-[#FBF9F5] text-[#111827]'
    }`}>
      
      {/* 1. Header Toolbar */}
      <header className={`px-6 sm:px-12 py-5 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-20 transition-colors ${
        darkMode ? 'border-slate-800 bg-[#0B0F17]/90' : 'border-stone-200/70 bg-[#FBF9F5]/90'
      }`}>
        
        {/* Left: Exit Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfirmExit(true)}
            aria-label="Exit Workout"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-700 hover:text-black'
            }`}
            title="Exit Sprint (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Exit</span>
          </button>

          <div className={`hidden sm:flex items-center gap-2 border-l pl-3 ${
            darkMode ? 'border-slate-800' : 'border-stone-200'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-600' : 'bg-[#111827]'
            }`}>
              <div className="w-2 h-2 bg-white rotate-45" />
            </div>
            <span className="font-black text-sm tracking-tight">Diverge.</span>
          </div>
        </div>

        {/* Right: Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Status Counter */}
          <div
            aria-live="polite"
            className={`px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-xs flex items-center gap-1.5 ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-stone-200 text-[#111827]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'}</span>
          </div>

          {/* Need a Hint? */}
          <button
            onClick={handleManualNudge}
            type="button"
            aria-label="Get a creative hint"
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-blue-950/80 hover:bg-blue-900 border-blue-800 text-blue-300'
                : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need a Hint?</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            type="button"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-amber-400'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Pause / Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            type="button"
            aria-label={isPaused ? 'Resume Sprint' : 'Pause Sprint'}
            className={`p-2 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
            title={isPaused ? 'Resume Sprint' : 'Pause Sprint'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            type="button"
            aria-label={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            className={`p-2 rounded-full border transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600 hover:text-black'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-500" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Done Early */}
          <button
            onClick={() => setShowConfirmFinish(true)}
            type="button"
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors cursor-pointer shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100'
                : 'bg-white hover:bg-stone-100 border-2 border-stone-800 text-stone-900'
            }`}
          >
            Done Early
          </button>
        </div>
      </header>

      {/* Pause Banner */}
      {isPaused && (
        <div className={`py-2.5 px-6 text-center text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn border-b ${
          darkMode ? 'bg-amber-950/60 border-amber-800/80 text-amber-300' : 'bg-amber-50 border-amber-200/80 text-amber-900'
        }`}>
          <span>Sprint is paused.</span>
          <button
            onClick={() => setIsPaused(false)}
            className="underline font-black cursor-pointer ml-1 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            Resume Sprint Now
          </button>
        </div>
      )}

      {/* 2. Main Focus Zone */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col justify-start space-y-6">
        
        {/* Tier 1 Primary Focal Point: Simple Object Card */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          
          <div className={`w-22 h-22 rounded-3xl border-2 flex items-center justify-center p-3.5 shadow-sm transition-colors ${
            darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-stone-200'
          }`}>
            <ItemIllustration type={item.iconType} className="w-16 h-16" />
          </div>

          <div className="space-y-1">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${
              darkMode ? 'text-slate-400' : 'text-stone-400'
            }`}>
              Alternative Uses For
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
              {item.name}
            </h1>
          </div>
        </div>

        {/* Tier 2 Rapid Input Form with Circular Countdown Timer */}
        <div className="relative pt-2">
          <form onSubmit={handleSubmitIdea} className="relative">
            <div
              className={`relative border-2 rounded-2xl shadow-sm transition-all ${
                darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-[#111827]'
              } ${isDuplicateShaking ? 'animate-shake border-red-500 ring-2 ring-red-400' : ''} ${
                isPaused ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (duplicateMessage) setDuplicateMessage('');
                }}
                disabled={isPaused}
                placeholder={isPaused ? 'Sprint paused...' : 'Type an alternative use and press Enter...'}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                aria-label="Enter your alternative use idea"
                className={`w-full bg-transparent px-5 py-4 text-base sm:text-xl font-bold focus:outline-none pr-28 ${
                  darkMode
                    ? 'placeholder:text-slate-600 text-[#F8FAFC]'
                    : 'placeholder:text-stone-300 text-[#111827]'
                }`}
              />

              {/* Right Side: Submit Arrow & Circular Timer */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                
                {/* Submit Action Button */}
                {inputValue.trim().length > 0 && (
                  <button
                    type="submit"
                    aria-label="Submit Idea"
                    className={`p-2 rounded-xl text-white transition-all shadow-xs cursor-pointer animate-fadeIn focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#111827] hover:bg-black'
                    }`}
                    title="Submit Idea (Enter)"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Circular Countdown Timer */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 52 52">
                    <circle
                      cx="26"
                      cy="26"
                      r={radius}
                      stroke={darkMode ? '#334155' : '#F3F4F6'}
                      strokeWidth="3.5"
                      fill="none"
                    />
                    <circle
                      cx="26"
                      cy="26"
                      r={radius}
                      stroke={timeLeft <= 15 ? '#EF4444' : darkMode ? '#60A5FA' : '#111827'}
                      strokeWidth="3.5"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className={`absolute text-[10px] font-mono font-black ${
                    timeLeft <= 15 ? 'text-red-500' : darkMode ? 'text-blue-300' : 'text-[#111827]'
                  }`}>
                    {formattedTime}
                  </span>
                </div>
              </div>
            </div>
          </form>

          {/* Duplicate Alert */}
          {duplicateMessage && (
            <div
              role="alert"
              className="mt-2 text-red-500 text-xs font-bold flex items-center gap-1.5 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{duplicateMessage}</span>
            </div>
          )}

          {/* Removal Confirmation */}
          {recentlyDeletedText && (
            <div
              aria-live="polite"
              className={`mt-2 text-xs font-medium flex items-center gap-1.5 animate-fadeIn ${
                darkMode ? 'text-slate-400' : 'text-stone-500'
              }`}
            >
              <span>Removed: "{recentlyDeletedText}"</span>
            </div>
          )}

          {/* Thought Starter Banner */}
          {showNudge && currentNudge && (
            <div className="mt-3 p-4 rounded-2xl bg-blue-600 text-white flex items-start justify-between gap-3 shadow-md animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider text-blue-200 block">
                    Lateral Thought Starter
                  </span>
                  <p className="text-sm font-bold leading-snug">
                    {currentNudge}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNudge(false)}
                className="text-white/80 hover:text-white p-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-white rounded"
                title="Dismiss thought starter"
                aria-label="Dismiss thought starter"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tier 3 Stream of Logged Ideas (only rendered once ideas are entered) */}
        {ideas.length > 0 && (
          <div className="space-y-3 pt-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'text-slate-400' : 'text-stone-500'
              }`}>
                Your Logged Ideas ({ideas.length})
              </span>
              <span className={`text-[11px] ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>Click ✕ to remove typos</span>
            </div>

            <div
              ref={tickerContainerRef}
              className="flex flex-wrap gap-2.5 max-h-[280px] overflow-y-auto pr-1"
            >
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className={`group px-3.5 py-2 border rounded-xl text-sm font-bold shadow-xs flex items-center gap-2 animate-fadeIn transition-all ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-600 text-slate-200'
                      : 'bg-white border-stone-200 hover:border-stone-400 text-[#111827]'
                  }`}
                >
                  <span>{idea.text}</span>
                  <button
                    onClick={() => handleDeleteIdea(idea.id, idea.text)}
                    aria-label={`Remove idea: ${idea.text}`}
                    className="opacity-40 group-hover:opacity-100 hover:text-red-500 p-0.5 rounded transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500"
                    title="Remove typo entry"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Exit Confirmation Dialog */}
      {showConfirmExit && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-dialog-title"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-6"
        >
          <div className={`border rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-scaleUp ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-stone-200 text-[#111827]'
          }`}>
            <h3 id="exit-dialog-title" className="text-xl font-black">Exit Sprint?</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-stone-600'}`}>
              If you leave now, your in-progress sprint with <strong>{ideas.length} ideas</strong> will not be saved or evaluated.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmExit(false);
                  inputRef.current?.focus();
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                Keep Going
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Exit to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Done Early Confirmation Dialog */}
      {showConfirmFinish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="finish-dialog-title"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-6"
        >
          <div className={`border rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-scaleUp ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-stone-200 text-[#111827]'
          }`}>
            <h3 id="finish-dialog-title" className="text-xl font-black">Finish Brainstorming?</h3>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-stone-600'}`}>
              You've logged <strong>{ideas.length} ideas</strong> with {formattedTime} remaining. Ready to compute your scores?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmFinish(false);
                  inputRef.current?.focus();
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                Keep Ideating
              </button>
              <button
                type="button"
                onClick={handleFinishEarly}
                className={`px-5 py-2 rounded-full text-white text-xs font-bold shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#111827] hover:bg-black'
                }`}
              >
                See Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tactile Shortcut Bar (Enhanced, Slightly Bigger & Accessible) */}
      <footer className={`py-5 px-6 border-t backdrop-blur-xs flex items-center justify-center transition-colors ${
        darkMode ? 'border-slate-800 bg-[#0B0F17]/90' : 'border-stone-200/80 bg-[#FBF9F5]/90'
      }`}>
        <div className={`inline-flex items-center flex-wrap justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl border shadow-sm text-sm sm:text-base ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-stone-200 text-stone-800'
        }`}>
          
          {/* Submit Shortcut */}
          <div className="flex items-center gap-2.5 font-medium">
            <span className={darkMode ? 'text-slate-400' : 'text-stone-400'}>Press</span>
            <kbd className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-b-2 font-black font-mono text-xs sm:text-sm shadow-xs transition-all ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-100'
                : 'bg-stone-100 border-stone-300 text-stone-900'
            }`}>
              <span>Enter</span>
              <span className={darkMode ? 'text-slate-400 font-sans' : 'text-stone-500 font-sans'}>↵</span>
            </kbd>
            <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-stone-700'}`}>to submit</span>
          </div>

          <span className={`hidden sm:inline-block font-bold text-base ${darkMode ? 'text-slate-700' : 'text-stone-300'}`}>•</span>

          {/* Exit / Pause Shortcut */}
          <div className="flex items-center gap-2.5 font-medium">
            <span className={darkMode ? 'text-slate-400' : 'text-stone-400'}>Press</span>
            <kbd className={`inline-flex items-center px-3.5 py-1.5 rounded-xl border-b-2 font-black font-mono text-xs sm:text-sm shadow-xs transition-all ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-100'
                : 'bg-stone-100 border-stone-300 text-stone-900'
            }`}>
              <span>Esc</span>
            </kbd>
            <span className={`font-bold ${darkMode ? 'text-slate-200' : 'text-stone-700'}`}>to pause or exit</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
