import React from 'react';
import { Heart, Frown, Smile, Zap, Coffee, Cloud } from 'lucide-react';
import { Emotion } from '../types';

const emotions: Emotion[] = [
  { id: 'joy', label: 'Joy', color: 'text-yellow-400', icon: 'Smile' },
  { id: 'fear', label: 'Fear', color: 'text-red-400', icon: 'Frown' },
  { id: 'peace', label: 'Peace', color: 'text-blue-400', icon: 'Cloud' },
  { id: 'anxiety', label: 'Anxiety', color: 'text-purple-400', icon: 'Zap' },
  { id: 'love', label: 'Love', color: 'text-pink-400', icon: 'Heart' },
  { id: 'confusion', label: 'Confusion', color: 'text-orange-400', icon: 'Coffee' },
];

const iconMap = { Smile, Frown, Cloud, Zap, Heart, Coffee };

interface EmotionSelectorProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotionId: string) => void;
}

export function EmotionSelector({ selectedEmotions, onEmotionToggle }: EmotionSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {emotions.map((emotion) => {
        const Icon = iconMap[emotion.icon as keyof typeof iconMap];
        const isSelected = selectedEmotions.includes(emotion.id);
        
        return (
          <button
            key={emotion.id}
            onClick={() => onEmotionToggle(emotion.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all
              ${isSelected 
                ? `bg-purple-900 text-white ${emotion.color}` 
                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{emotion.label}</span>
          </button>
        );
      })}
    </div>
  );
}