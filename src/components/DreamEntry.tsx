import React from 'react';
import { Moon, Send, BookMarked, Share2 } from 'lucide-react';
import { EmotionSelector } from './EmotionSelector';

interface DreamEntryProps {
  onSubmit: (dream: string, emotions: string[]) => void;
}

export function DreamEntry({ onSubmit }: DreamEntryProps) {
  const [dream, setDream] = React.useState('');
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim()) {
      onSubmit(dream, selectedEmotions);
      setDream('');
      setSelectedEmotions([]);
    }
  };

  const handleEmotionToggle = (emotionId: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId)
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  return (
    <div className="w-full max-w-2xl bg-purple-950 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Moon className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Record Your Dream</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Describe your dream in detail..."
          className="w-full h-32 p-4 text-white bg-purple-900 border border-purple-800 rounded-lg 
            focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none 
            placeholder-purple-400"
        />
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-purple-300">
            How did this dream make you feel?
          </label>
          <EmotionSelector
            selectedEmotions={selectedEmotions}
            onEmotionToggle={handleEmotionToggle}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
              title="Save to favorites"
            >
              <BookMarked className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
              title="Share dream"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg 
              hover:bg-purple-500 transition-colors"
          >
            <Send className="w-4 h-4" />
            Interpret Dream
          </button>
        </div>
      </form>
    </div>
  );
}