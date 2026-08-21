import React, { useState } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  RefreshCw, 
  Share2, 
  Award, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ArrowRight,
  Sun,
  Moon,
  Download,
  FileText,
  Code,
  Check
} from 'lucide-react';
import { TestSession } from '../types/aut';
import { ItemIllustration } from './ItemIllustrations';
import { ExportCardModal } from './ExportCardModal';
import { generateStructuredTextSummary, generateSessionJSON, downloadFile } from '../utils/exportUtils';

interface ResultsScreenProps {
  session: TestSession;
  onRestartNewItem: () => void;
  onRetrySameItem: () => void;
  onBackToHome: () => void;
  onOpenHistory: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  session,
  onRestartNewItem,
  onRetrySameItem,
  onBackToHome,
  onOpenHistory,
  darkMode = false,
  onToggleDarkMode
}) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<'fluency' | 'flexibility' | 'originality' | 'elaboration'>('originality');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const { item, scores, completedInSeconds, ideas } = session;

  const handleQuickDownloadText = () => {
    const text = generateStructuredTextSummary(session);
    const dateStr = new Date(session.date).toISOString().slice(0, 10);
    downloadFile(text, `diverge-session-${item.id}-${dateStr}.txt`, 'text/plain;charset=utf-8');
    setCopiedNotification('Summary (.txt) downloaded!');
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleQuickDownloadJSON = () => {
    const json = generateSessionJSON(session);
    const dateStr = new Date(session.date).toISOString().slice(0, 10);
    downloadFile(json, `diverge-session-${item.id}-${dateStr}.json`, 'application/json;charset=utf-8');
    setCopiedNotification('Raw JSON (.json) downloaded!');
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-purple-500';
  };

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case 'fluency':
        return 'text-blue-500';
      case 'flexibility':
        return 'text-amber-500';
      case 'originality':
        return 'text-emerald-500';
      case 'elaboration':
        return 'text-purple-500';
      default:
        return 'text-blue-500';
    }
  };

  const activeCategories = (Object.entries(scores.flexibility.categoryDistribution) as [string, number][]).filter(
    ([_, count]) => count > 0
  );

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
      darkMode ? 'bg-[#0B0F17] text-[#F8FAFC]' : 'bg-[#FBF9F5] text-[#111827]'
    }`}>
      
      {/* 1. Header Toolbar */}
      <header className={`px-6 sm:px-12 py-5 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-20 transition-colors ${
        darkMode ? 'border-slate-800 bg-[#0B0F17]/90' : 'border-stone-200/70 bg-[#FBF9F5]/90'
      }`}>
        
        {/* Left: Home Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            aria-label="Return to Start Screen"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                : 'bg-white border-stone-200 hover:border-stone-400 text-stone-700 hover:text-black'
            }`}
            title="Return to Start Screen"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Home</span>
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

          {/* Quick Export Trigger */}
          <button
            onClick={() => setShowExportModal(true)}
            aria-label="Export session report or copy summary"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
                : 'bg-white border-stone-300 hover:border-stone-500 text-stone-800'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-blue-500" />
            <span>Export</span>
          </button>

          {/* Retry This Object */}
          <button
            onClick={onRetrySameItem}
            aria-label="Retry this exact object"
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
                : 'bg-white border-stone-300 hover:border-stone-500 text-stone-800'
            }`}
            title="Re-test this exact object"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
            <span>Retry</span>
          </button>

          {/* PRIMARY LEVEL 1 CTA: Next Object */}
          <button
            onClick={onRestartNewItem}
            aria-label="Train next random object"
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-[#111827] hover:bg-black text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Next Object</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {copiedNotification && (
        <div className="fixed top-20 right-6 z-50 p-3.5 rounded-2xl bg-emerald-600 text-white text-xs font-black shadow-xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* 2. Main Results Dashboard */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 sm:px-10 py-8 sm:py-12 space-y-8">
        
        {/* Tier 1 Primary Hero Score Card */}
        <div className={`border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
        }`}>
          
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b ${
            darkMode ? 'border-slate-800' : 'border-stone-100'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-18 h-18 rounded-2xl border flex items-center justify-center p-2.5 shrink-0 ${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'
              }`}>
                <ItemIllustration type={item.iconType} className="w-13 h-13" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-[11px] font-bold uppercase tracking-widest block ${
                  darkMode ? 'text-slate-400' : 'text-stone-400'
                }`}>
                  Challenge Completed
                </span>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                  {item.name}
                </h1>
                <p className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                  {ideas.length} ideas captured in {completedInSeconds} seconds
                </p>
              </div>
            </div>

            {/* Overall Composite Score */}
            <div className={`flex sm:flex-col items-center sm:items-end justify-between p-4 sm:p-0 rounded-2xl border sm:border-0 ${
              darkMode ? 'bg-slate-800/50 sm:bg-transparent border-slate-800' : 'bg-stone-50 sm:bg-transparent border-stone-100'
            }`}>
              <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                darkMode ? 'text-slate-400' : 'text-stone-400'
              }`}>
                Composite Index
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl sm:text-6xl font-black tracking-tight ${getScoreColor(scores.overallCreativeIndex)}`}>
                  {scores.overallCreativeIndex}
                </span>
                <span className={`text-sm font-mono font-bold ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
              </div>
            </div>
          </div>

          {/* Standout Idea Callout */}
          {scores.mostUniqueIdea && (
            <div className={`p-4 rounded-2xl flex items-start gap-3.5 border ${
              darkMode
                ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                : 'bg-amber-50/70 border-amber-200/80 text-amber-900'
            }`}>
              <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-600 block">
                  Most Lateral / Unique Concept
                </span>
                <p className="text-sm font-bold italic">
                  "{scores.mostUniqueIdea.text}"
                </p>
              </div>
            </div>
          )}

          {/* Actionable Cognitive Takeaway */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
            darkMode
              ? 'bg-blue-950/20 border-blue-800/40 text-blue-200'
              : 'bg-blue-50/70 border-blue-200/80 text-blue-950'
          }`}>
            <div className="flex items-center gap-2 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">
                Actionable Design Focus ({scores.designTakeaway.pillar}): {scores.designTakeaway.headline}
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-stone-700'
            }`}>
              {scores.designTakeaway.exercise}
            </p>
            <div className={`text-[11px] font-mono pt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              Recommended Protocol: <strong>{scores.designTakeaway.method}</strong>
            </div>
          </div>

          {/* Quick Export Bar Inside Hero Card */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t text-xs ${
            darkMode ? 'border-slate-800' : 'border-stone-100'
          }`}>
            <div className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span className={`font-mono text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                Export session outside browser:
              </span>
            </div>
            <div className="grid grid-cols-3 sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickDownloadText}
                className={`h-9 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>.TXT</span>
              </button>

              <button
                type="button"
                onClick={handleQuickDownloadJSON}
                className={`h-9 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <Code className="w-3.5 h-3.5 text-amber-500" />
                <span>.JSON</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className={`h-9 px-3.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode ? 'bg-blue-950/60 border-blue-800 text-blue-300 hover:bg-blue-900/60' : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100/70'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Card & Copy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: 4-Pillar Divergent Thinking Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Guilford's 4-Pillar Divergent Breakdown
            </h2>
            <span className={`text-[11px] font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>Click any card to inspect details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Fluency */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPillar('fluency')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedPillar('fluency')}
              aria-label="Fluency pillar score"
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selectedPillar === 'fluency'
                  ? darkMode
                    ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/20'
                    : 'bg-white border-[#111827] ring-2 ring-black/10 shadow-md'
                  : darkMode
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${
                  darkMode ? 'bg-blue-950/40 border-blue-800/60 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono uppercase font-bold ${
                  darkMode ? 'text-slate-400' : 'text-stone-400'
                }`}>Volume</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-500">Fluency</div>
              <div className="text-3xl font-black my-1">
                {scores.fluency.score}<span className={`text-xs font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
              </div>
              <p className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                {ideas.length} ideas ({scores.fluency.ideasPerMinute}/min) • {scores.fluency.benchmarkTier}
              </p>
            </div>

            {/* 2. Flexibility */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPillar('flexibility')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedPillar('flexibility')}
              aria-label="Flexibility pillar score"
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selectedPillar === 'flexibility'
                  ? darkMode
                    ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-white border-[#111827] ring-2 ring-black/10 shadow-md'
                  : darkMode
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${
                  darkMode ? 'bg-amber-950/40 border-amber-800/60 text-amber-400' : 'bg-amber-50 border-amber-100 text-amber-600'
                }`}>
                  <Layers className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono uppercase font-bold ${
                  darkMode ? 'text-slate-400' : 'text-stone-400'
                }`}>Categories</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-500">Flexibility</div>
              <div className="text-3xl font-black my-1">
                {scores.flexibility.score}<span className={`text-xs font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
              </div>
              <p className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                {scores.flexibility.uniqueCategoriesCount} semantic categories spanned
              </p>
            </div>

            {/* 3. Originality */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPillar('originality')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedPillar('originality')}
              aria-label="Originality pillar score"
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selectedPillar === 'originality'
                  ? darkMode
                    ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white border-[#111827] ring-2 ring-black/10 shadow-md'
                  : darkMode
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${
                  darkMode ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                }`}>
                  <Award className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono uppercase font-bold ${
                  darkMode ? 'text-slate-400' : 'text-stone-400'
                }`}>Novelty</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">Originality</div>
              <div className="text-3xl font-black my-1">
                {scores.originality.score}<span className={`text-xs font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
              </div>
              <p className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                {scores.originality.originalityRatio}% lateral non-obvious uses
              </p>
            </div>

            {/* 4. Elaboration */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPillar('elaboration')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedPillar('elaboration')}
              aria-label="Elaboration pillar score"
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selectedPillar === 'elaboration'
                  ? darkMode
                    ? 'bg-slate-900 border-purple-500 ring-2 ring-purple-500/20'
                    : 'bg-white border-[#111827] ring-2 ring-black/10 shadow-md'
                  : darkMode
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${
                  darkMode ? 'bg-purple-950/40 border-purple-800/60 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600'
                }`}>
                  <Target className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono uppercase font-bold ${
                  darkMode ? 'text-slate-400' : 'text-stone-400'
                }`}>Depth</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-500">Elaboration</div>
              <div className="text-3xl font-black my-1">
                {scores.elaboration.score}<span className={`text-xs font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
              </div>
              <p className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                Avg {scores.elaboration.averageWordCount} words / idea
              </p>
            </div>

          </div>
        </div>

        {/* Tier 3: Interactive Inspector for the Selected Pillar */}
        <div className={`border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-3.5">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${getPillarColor(selectedPillar)}`}>
                Deep Dive: {selectedPillar.toUpperCase()}
              </span>
            </div>
            <span className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>
              Protocol Details
            </span>
          </div>

          {selectedPillar === 'fluency' && (
            <div className="space-y-3">
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                <strong>Fluency</strong> measures the raw throughput rate of ideation under temporal constraints without self-censoring.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'}`}>
                  <div className={`text-[10px] uppercase font-mono font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Total Logged</div>
                  <div className="text-xl font-black">{ideas.length} ideas</div>
                </div>
                <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'}`}>
                  <div className={`text-[10px] uppercase font-mono font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Velocity</div>
                  <div className="text-xl font-black">{scores.fluency.ideasPerMinute} / min</div>
                </div>
                <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'}`}>
                  <div className={`text-[10px] uppercase font-mono font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Benchmark</div>
                  <div className="text-xl font-black text-blue-500">{scores.fluency.benchmarkTier}</div>
                </div>
              </div>
            </div>
          )}

          {selectedPillar === 'flexibility' && (
            <div className="space-y-3">
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                <strong>Flexibility</strong> measures your ability to switch cognitive categories and functional paradigms instead of fixating on one theme.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeCategories.map(([catName, count], idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                      darkMode ? 'bg-amber-950/30 border-amber-800/50 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <span className="font-bold">{catName.charAt(0).toUpperCase() + catName.slice(1)}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      darkMode ? 'bg-amber-900/60 text-amber-100' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedPillar === 'originality' && (
            <div className="space-y-3">
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                <strong>Originality</strong> measures statistical infrequency and lateral departure from common functional affordances.
              </p>
              <div className="space-y-2 pt-1">
                {ideas.slice(0, 5).map((ideaItem) => (
                  <div
                    key={ideaItem.id}
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                      ideaItem.originalityScore >= 70
                        ? darkMode ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : darkMode ? 'bg-slate-800/50 border-slate-700/60 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="font-bold">"{ideaItem.text}"</span>
                    <span className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full ${
                      ideaItem.originalityScore >= 70
                        ? darkMode ? 'bg-emerald-900/80 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                        : darkMode ? 'bg-slate-700 text-slate-300' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {ideaItem.rarityTag || (ideaItem.originalityScore >= 70 ? '★ Lateral' : 'Conventional')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedPillar === 'elaboration' && (
            <div className="space-y-3">
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                <strong>Elaboration</strong> measures how much contextual specificity and implementation mechanics you articulated.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'}`}>
                  <div className={`text-[10px] uppercase font-mono font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Average Word Count</div>
                  <div className="text-xl font-black">{scores.elaboration.averageWordCount} words / idea</div>
                </div>
                <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'}`}>
                  <div className={`text-[10px] uppercase font-mono font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Action Verb Density</div>
                  <div className="text-xl font-black text-purple-500">{scores.elaboration.actionVerbDensity}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tier 4: Complete Idea Log Grid */}
        <div className={`border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-black text-sm uppercase tracking-wider">
              All Submitted Ideas ({ideas.length})
            </h3>
            <span className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Logged in Order</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {ideas.map((idea, index) => (
              <div
                key={idea.id}
                className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                  darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] font-bold w-5 ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>
                    #{index + 1}
                  </span>
                  <span className="font-bold">{idea.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-stone-200 text-stone-600'
                  }`}>
                    {idea.category}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                </div>
              </div>
            ))}

            {ideas.length === 0 && (
              <div className={`py-6 text-center text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>
                No ideas recorded in this sprint.
              </div>
            )}
          </div>
        </div>

        {/* Tier 5: Bottom Navigation & Export CTA Banner */}
        <div className={`p-6 sm:p-7 md:p-8 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-xl border transition-all ${
          darkMode 
            ? 'bg-slate-900/95 border-slate-800 text-white shadow-black/40' 
            : 'bg-[#111827] border-black/10 text-white shadow-stone-900/20'
        }`}>
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h4 className="text-lg sm:text-xl font-black tracking-tight text-white">
                Export & Next Challenge
              </h4>
            </div>
            <p className="text-xs text-stone-400 font-normal leading-relaxed max-w-md">
              Save your session summary outside the browser, review your past runs, or dive into the next sprint.
            </p>
          </div>

          {/* Action Button Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {/* Secondary Buttons Row */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2">
              {/* Export Modal Trigger */}
              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                aria-label="Export session report"
                className="h-11 px-4 rounded-2xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-white"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Export Analysis</span>
              </button>

              {/* Past Runs History */}
              <button
                type="button"
                onClick={onOpenHistory}
                aria-label="View Workout History"
                className="h-11 px-4 rounded-2xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-white"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Past Runs</span>
              </button>
            </div>

            {/* PRIMARY NEXT OBJECT CTA */}
            <button
              type="button"
              onClick={onRestartNewItem}
              aria-label="Start next object sprint"
              className={`h-11 px-6 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-400 ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-white hover:bg-stone-100 text-[#111827]'
              }`}
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>Next Object</span>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

      </main>

      {/* Export Summary Modal */}
      {showExportModal && (
        <ExportCardModal
          session={session}
          onClose={() => setShowExportModal(false)}
          darkMode={darkMode}
        />
      )}

      {/* 3. Footer */}
      <footer className={`py-5 px-6 text-center text-xs border-t transition-colors ${
        darkMode ? 'border-slate-800 text-slate-500 bg-[#0B0F17]' : 'border-stone-200/60 text-stone-400 bg-[#FBF9F5]'
      }`}>
        Diverge Brain Trainer • 2-Minute Alternative Uses Test
      </footer>
    </div>
  );
};
