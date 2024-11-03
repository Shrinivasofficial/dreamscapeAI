import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { EmotionSelector } from './EmotionSelector';
import { useDreams } from '../context/DreamContext';
import type { SharedDream } from '../types';

interface DreamFormProps {
  editDream?: SharedDream;
  onClose?: () => void;
}

export function DreamForm({ editDream, onClose }: DreamFormProps) {
  const [content, setContent] = useState(editDream?.content || '');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(
    editDream?.emotions || []
  );
  const { dispatch } = useDreams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const dreamData: SharedDream = {
      id: editDream?.id || Date.now().toString(),
      author: 'Current User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      content,
      emotions: selectedEmotions,
      likes: editDream?.likes || 0,
      comments: editDream?.comments || 0,
      timestamp: Date.now(),
    };

    dispatch({
      type: editDream ? 'UPDATE_DREAM' : 'ADD_DREAM',
      dream: dreamData,
    });

    setContent('');
    setSelectedEmotions([]);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your dream with the community..."
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
          onEmotionToggle={(emotionId) => {
            setSelectedEmotions(prev =>
              prev.includes(emotionId)
                ? prev.filter(id => id !== emotionId)
                : [...prev, emotionId]
            );
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-purple-300 hover:text-purple-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg 
            hover:bg-purple-500 transition-colors"
        >
          <Send className="w-4 h-4" />
          {editDream ? 'Update Dream' : 'Share Dream'}
        </button>
      </div>
    </form>
  );
}