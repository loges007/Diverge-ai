/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ActiveChallengeScreen } from './components/ActiveChallengeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { HistoryModal } from './components/HistoryModal';
import { ItemDefinition, SubmittedIdea, TestSession } from './types/aut';
import { GET_RANDOM_ITEM } from './data/items';
import { calculateAUTBreakdown } from './utils/autScoring';
import {
  loadStreak,
  loadSettings,
  saveSettings,
  recordSessionCompletion,
  loadSessions,
  loadUsedItemIds,
  UserStreak,
  AppSettings
} from './utils/storage';

type AppScreen = 'onboarding' | 'challenge' | 'results';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [currentItem, setCurrentItem] = useState<ItemDefinition>(() => GET_RANDOM_ITEM());
  const [selectedDuration, setSelectedDuration] = useState<number>(120);
  const [currentSession, setCurrentSession] = useState<TestSession | null>(null);
  const [streak, setStreak] = useState<UserStreak>(() => loadStreak());
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [sessionsHistory, setSessionsHistory] = useState<TestSession[]>(() => loadSessions());
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Load streak & history on mount
  useEffect(() => {
    setStreak(loadStreak());
    setSessionsHistory(loadSessions());
  }, []);

  const handleStartChallenge = (durationSeconds: number) => {
    setSelectedDuration(durationSeconds);
    // Pick an unrepeated item
    const used = loadUsedItemIds();
    const nextItem = GET_RANDOM_ITEM(used);
    setCurrentItem(nextItem);
    setScreen('challenge');
  };

  const handleFinishChallenge = (ideas: SubmittedIdea[], timeTakenSeconds: number) => {
    const scores = calculateAUTBreakdown(ideas, currentItem, selectedDuration, timeTakenSeconds);

    const newSession: TestSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      item: currentItem,
      durationSeconds: selectedDuration,
      completedInSeconds: timeTakenSeconds,
      ideas,
      scores
    };

    // Save and update streak
    const updatedStreak = recordSessionCompletion(newSession);
    setStreak(updatedStreak);
    setSessionsHistory(loadSessions());
    setCurrentSession(newSession);
    setScreen('results');
  };

  const handleRestartNewItem = () => {
    const used = loadUsedItemIds();
    const nextItem = GET_RANDOM_ITEM(used);
    setCurrentItem(nextItem);
    setScreen('challenge');
  };

  const handleRetrySameItem = () => {
    setScreen('challenge');
  };

  const handleBackToHome = () => {
    setScreen('onboarding');
  };

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleToggleDarkMode = () => {
    const updated = { ...settings, darkMode: !settings.darkMode };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSelectSessionFromHistory = (session: TestSession) => {
    setCurrentSession(session);
    setScreen('results');
  };

  return (
    <div className={`w-full min-h-screen font-sans antialiased transition-colors duration-200 ${
      settings.darkMode
        ? 'bg-[#0B0F17] text-[#F8FAFC] selection:bg-blue-600 selection:text-white'
        : 'bg-[#FBF9F5] text-[#111827] selection:bg-[#111827] selection:text-white'
    }`}>
      {screen === 'onboarding' && (
        <OnboardingScreen
          onStart={handleStartChallenge}
          streak={streak}
          onOpenHistory={() => setShowHistoryModal(true)}
          soundEnabled={settings.soundEnabled}
          onToggleSound={handleToggleSound}
          darkMode={settings.darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {screen === 'challenge' && (
        <ActiveChallengeScreen
          item={currentItem}
          durationSeconds={selectedDuration}
          onFinish={handleFinishChallenge}
          onCancel={handleBackToHome}
          soundEnabled={settings.soundEnabled}
          onToggleSound={handleToggleSound}
          darkMode={settings.darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {screen === 'results' && currentSession && (
        <ResultsScreen
          session={currentSession}
          streak={streak}
          onRestartNewItem={handleRestartNewItem}
          onRetrySameItem={handleRetrySameItem}
          onBackToHome={handleBackToHome}
          onOpenHistory={() => setShowHistoryModal(true)}
          darkMode={settings.darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {/* Past Workout History Modal */}
      {showHistoryModal && (
        <HistoryModal
          sessions={sessionsHistory}
          streak={streak}
          onClose={() => setShowHistoryModal(false)}
          onSelectSession={handleSelectSessionFromHistory}
          darkMode={settings.darkMode}
        />
      )}
    </div>
  );
}
