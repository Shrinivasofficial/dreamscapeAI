import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DreamEntry } from './components/DreamEntry';
import { DreamInterpretation } from './components/DreamInterpretation';
import { CommunityFeed } from './components/CommunityFeed';
import { DreamProvider } from './context/DreamContext';
import type { DreamEntry as DreamEntryType } from './types';

function App() {
  const [currentDream, setCurrentDream] = useState<DreamEntryType | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'community'>('personal');

  const handleDreamSubmit = (dream: string, emotions: string[]) => {
    setCurrentDream({
      content: dream,
      emotions,
      timestamp: Date.now(),
    });
  };

  return (
    <DreamProvider>
      <div className="min-h-screen bg-purple-950">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                {activeTab === 'personal' ? 'Understand Your Dreams' : 'Dream Community'}
              </h1>
              <p className="text-lg text-purple-300 max-w-2xl mx-auto">
                {activeTab === 'personal' 
                  ? 'Unlock the mysteries of your subconscious mind with AI-powered dream interpretation'
                  : 'Share and explore dreams with fellow dreamers from around the world'
                }
              </p>
            </div>

            {activeTab === 'personal' ? (
              <div className="flex flex-col items-center space-y-6">
                <DreamEntry onSubmit={handleDreamSubmit} />
                {currentDream && (
                  <DreamInterpretation 
                    dream={currentDream.content}
                    emotions={currentDream.emotions}
                  />
                )}
              </div>
            ) : (
              <CommunityFeed />
            )}
          </div>
        </main>

        <div className="fixed bottom-0 w-full bg-gradient-to-t from-purple-950 to-transparent h-12" />
      </div>
    </DreamProvider>
  );
}

export default App;