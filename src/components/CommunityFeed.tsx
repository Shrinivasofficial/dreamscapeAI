import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DreamCard } from './DreamCard';
import { DreamForm } from './DreamForm';
import { useDreams } from '../context/DreamContext';
import type { SharedDream } from '../types';

export function CommunityFeed() {
  const { state } = useDreams();
  const [editingDream, setEditingDream] = useState<SharedDream | null>(null);
  const [isAddingDream, setIsAddingDream] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => setIsAddingDream(true)}
        className="w-full p-4 bg-purple-900 rounded-xl text-purple-300 hover:text-white 
          hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Share Your Dream
      </button>

      {(isAddingDream || editingDream) && (
        <div className="dream-card">
          <DreamForm
            editDream={editingDream || undefined}
            onClose={() => {
              setIsAddingDream(false);
              setEditingDream(null);
            }}
          />
        </div>
      )}

      {state.dreams.map((dream) => (
        <DreamCard
          key={dream.id}
          dream={dream}
          onEdit={setEditingDream}
        />
      ))}
    </div>
  );
}