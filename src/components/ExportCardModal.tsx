import React, { useRef, useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Award, Download, FileText, Code, CheckCircle } from 'lucide-react';
import { TestSession } from '../types/aut';
import { ItemIllustration } from './ItemIllustrations';
import { generateStructuredTextSummary, generateSessionJSON, downloadFile } from '../utils/exportUtils';

interface ExportCardModalProps {
  session: TestSession;
  onClose: () => void;
  darkMode?: boolean;
}

type ExportTab = 'card' | 'text' | 'json';

export const ExportCardModal: React.FC<ExportCardModalProps> = ({ session, onClose, darkMode = false }) => {
  const [activeTab, setActiveTab] = useState<ExportTab>('card');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { item, scores, completedInSeconds, ideas } = session;

  const textSummary = generateStructuredTextSummary(session);
  const jsonSummary = generateSessionJSON(session);

  // Listen to Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const dateStr = new Date(session.date).toISOString().slice(0, 10);
    const filename = `diverge-session-${session.item.id}-${dateStr}.txt`;
    downloadFile(textSummary, filename, 'text/plain;charset=utf-8');
    setDownloadSuccess('Summary text file downloaded!');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleDownloadJSON = () => {
    const dateStr = new Date(session.date).toISOString().slice(0, 10);
    const filename = `diverge-session-${session.item.id}-${dateStr}.json`;
    downloadFile(jsonSummary, filename, 'application/json;charset=utf-8');
    setDownloadSuccess('JSON export file downloaded!');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className={`border rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-scaleUp transition-colors my-auto ${
        darkMode ? 'bg-[#0B0F17] border-slate-800 text-[#F8FAFC]' : 'bg-[#FBF9F5] border-stone-200 text-[#111827]'
      }`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-500" />
            <h3 id="export-modal-title" className="font-black text-lg">Export Session Analysis</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export dialog"
            className={`p-1.5 rounded-full transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-stone-400 hover:text-black hover:bg-stone-100'
            }`}
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className={`grid grid-cols-3 gap-1 p-1 rounded-2xl border ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-stone-100 border-stone-200'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'card'
                ? darkMode
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-[#111827] shadow-xs'
                : darkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'text'
                ? darkMode
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-[#111827] shadow-xs'
                : darkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Summary (.txt)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'json'
                ? darkMode
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-[#111827] shadow-xs'
                : darkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON (.json)</span>
          </button>
        </div>

        {/* Success Alert */}
        {downloadSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Tab 1: Visual Card */}
        {activeTab === 'card' && (
          <div className="space-y-4">
            <div
              ref={cardRef}
              className={`rounded-3xl border-2 p-5 sm:p-6 space-y-4 shadow-sm relative overflow-hidden transition-colors ${
                darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-[#111827]'
              }`}
            >
              {/* Top Branding */}
              <div className={`flex items-center justify-between border-b pb-3 ${
                darkMode ? 'border-slate-800' : 'border-stone-100'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-blue-600' : 'bg-[#111827]'
                  }`}>
                    <div className="w-2 h-2 bg-white rotate-45" />
                  </div>
                  <div>
                    <div className={`text-[9px] font-mono uppercase tracking-widest font-bold ${
                      darkMode ? 'text-slate-400' : 'text-stone-400'
                    }`}>
                      AUT Assessment
                    </div>
                    <div className="text-xs font-black">DIVERGE. Studio</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-[9px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>
                    {new Date(session.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs font-mono font-black text-blue-500">
                    Index: {scores.overallCreativeIndex}/100
                  </div>
                </div>
              </div>

              {/* Challenge Object */}
              <div className={`flex items-center gap-3.5 border rounded-2xl p-3.5 ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'
              }`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center p-1.5 shrink-0 border ${
                  darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-stone-200'
                }`}>
                  <ItemIllustration type={item.iconType} className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-blue-500 font-bold">
                    Challenge Object
                  </span>
                  <h4 className="font-black text-lg leading-tight uppercase">{item.name}</h4>
                  <p className={`text-[11px] truncate max-w-xs ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                    {item.material} • {ideas.length} ideas in {completedInSeconds}s
                  </p>
                </div>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className={`p-2.5 rounded-2xl border space-y-0.5 ${
                  darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200'
                }`}>
                  <div className={`text-[9px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Fluency</div>
                  <div className="text-lg font-black text-blue-500">
                    {scores.fluency.score}<span className={`text-[10px] font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
                  </div>
                  <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>{ideas.length} ideas ({scores.fluency.ideasPerMinute}/min)</div>
                </div>

                <div className={`p-2.5 rounded-2xl border space-y-0.5 ${
                  darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200'
                }`}>
                  <div className={`text-[9px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Flexibility</div>
                  <div className="text-lg font-black text-amber-500">
                    {scores.flexibility.score}<span className={`text-[10px] font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
                  </div>
                  <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>{scores.flexibility.uniqueCategoriesCount} categories</div>
                </div>

                <div className={`p-2.5 rounded-2xl border space-y-0.5 ${
                  darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200'
                }`}>
                  <div className={`text-[9px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Originality</div>
                  <div className="text-lg font-black text-emerald-500">
                    {scores.originality.score}<span className={`text-[10px] font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
                  </div>
                  <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>{scores.originality.originalityRatio}% lateral concepts</div>
                </div>

                <div className={`p-2.5 rounded-2xl border space-y-0.5 ${
                  darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#FBF9F5] border-stone-200'
                }`}>
                  <div className={`text-[9px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Elaboration</div>
                  <div className="text-lg font-black text-purple-500">
                    {scores.elaboration.score}<span className={`text-[10px] font-normal font-mono ${darkMode ? 'text-slate-500' : 'text-stone-400'}`}>/100</span>
                  </div>
                  <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>Avg {scores.elaboration.averageWordCount} words/idea</div>
                </div>
              </div>

              {/* Standout Idea */}
              {scores.mostUniqueIdea && (
                <div className={`p-3.5 rounded-2xl space-y-1 ${
                  darkMode ? 'bg-slate-800 text-white' : 'bg-[#111827] text-white'
                }`}>
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-stone-300">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Standout Concept</span>
                  </div>
                  <p className="text-xs font-bold text-white italic truncate">
                    "{scores.mostUniqueIdea.text}"
                  </p>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleCopy(textSummary)}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-[#111827]'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text Summary'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadText}
                className={`flex-1 py-3 px-4 rounded-2xl text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#111827] hover:bg-black'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Structured Text Summary */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap ${
              darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-stone-200 text-stone-700'
            }`}>
              {textSummary}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleCopy(textSummary)}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-[#111827]'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadText}
                className={`flex-1 py-3 px-4 rounded-2xl text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#111827] hover:bg-black'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download Summary (.txt)</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Raw JSON */}
        {activeTab === 'json' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap ${
              darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-stone-200 text-stone-700'
            }`}>
              {jsonSummary}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleCopy(jsonSummary)}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-[#111827]'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'JSON Copied' : 'Copy JSON'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadJSON}
                className={`flex-1 py-3 px-4 rounded-2xl text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#111827] hover:bg-black'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download JSON (.json)</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className={`text-[10px] font-mono text-center border-t pt-3 ${
          darkMode ? 'border-slate-800 text-slate-500' : 'border-stone-100 text-stone-400'
        }`}>
          Allows tracking personal divergent thinking progression in Notion, Obsidian, or local archives.
        </div>
      </div>
    </div>
  );
};
