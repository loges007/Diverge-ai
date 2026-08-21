import React, { useEffect } from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { TestSession } from '../types/aut';
import { UserStreak } from '../utils/storage';
import { ItemIllustration } from './ItemIllustrations';

interface HistoryModalProps {
  sessions: TestSession[];
  streak: UserStreak;
  onClose: () => void;
  onSelectSession: (session: TestSession) => void;
  darkMode?: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  sessions,
  streak,
  onClose,
  onSelectSession,
  darkMode = false
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const totalIdeas = sessions.reduce((acc, s) => acc + s.ideas.length, 0);
  const avgIndex =
    sessions.length > 0
      ? Math.round(sessions.reduce((acc, s) => acc + s.scores.overallCreativeIndex, 0) / sessions.length)
      : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] flex flex-col animate-scaleUp transition-colors ${
        darkMode ? 'bg-[#0B0F17] border-slate-800 text-[#F8FAFC]' : 'bg-[#FBF9F5] border-stone-200 text-[#111827]'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${
          darkMode ? 'border-slate-800' : 'border-stone-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
              darkMode ? 'bg-blue-600' : 'bg-[#111827]'
            }`}>
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 id="history-dialog-title" className="text-xl font-black">Brain Workout Log</h3>
              <p className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                {streak.totalSessions} Sessions • {totalIdeas} Ideas Captured
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close workout history dialog"
            className={`p-1.5 rounded-full transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-stone-400 hover:text-black hover:bg-stone-100'
            }`}
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border space-y-1 shadow-sm ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
          }`}>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Current Streak</div>
            <div className="text-2xl font-black">{streak.currentStreak} Days</div>
            <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>Best: {streak.bestStreak} days</div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 shadow-sm ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
          }`}>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Avg Index</div>
            <div className="text-2xl font-black text-blue-500">{avgIndex}/100</div>
            <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>Across all runs</div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 shadow-sm ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
          }`}>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Total Sprints</div>
            <div className="text-2xl font-black text-emerald-500">{sessions.length}</div>
            <div className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>{totalIdeas} ideas</div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {sessions.length === 0 ? (
            <div className={`py-12 text-center space-y-2 border border-dashed rounded-2xl ${
              darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-500' : 'bg-white border-stone-200 text-stone-400'
            }`}>
              <p className="text-xs font-mono font-bold">No past sessions recorded yet.</p>
              <p className="text-xs">Complete a sprint to build your creative workout history.</p>
            </div>
          ) : (
            sessions.map((sess) => (
              <div
                key={sess.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectSession(sess);
                  onClose();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectSession(sess);
                    onClose();
                  }
                }}
                aria-label={`Session for ${sess.item.name}, Score ${sess.scores.overallCreativeIndex}`}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-600'
                    : 'bg-white border-stone-200 hover:border-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center p-1.5 shrink-0 ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-[#FBF9F5] border-stone-200'
                  }`}>
                    <ItemIllustration type={sess.item.iconType} className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base uppercase group-hover:text-blue-500 transition-colors">
                        {sess.item.name}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        darkMode ? 'bg-slate-800 text-slate-300' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {sess.ideas.length} ideas
                      </span>
                    </div>
                    <p className={`text-[11px] font-mono ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}>
                      {new Date(sess.date).toLocaleDateString()} • {sess.completedInSeconds}s
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-black text-blue-500">
                      {sess.scores.overallCreativeIndex}
                    </div>
                    <div className={`text-[10px] font-mono uppercase ${darkMode ? 'text-slate-400' : 'text-stone-400'}`}>Index</div>
                  </div>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-all ${
                    darkMode ? 'text-slate-500 group-hover:text-white' : 'text-stone-400 group-hover:text-black'
                  }`} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Close CTA */}
        <div className={`pt-2 border-t flex justify-end ${darkMode ? 'border-slate-800' : 'border-stone-100'}`}>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-stone-100 hover:bg-stone-200 text-[#111827]'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
