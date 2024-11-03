import React from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp, Trash2, Edit2 } from 'lucide-react';
import type { SharedDream } from '../types';
import { useDreams } from '../context/DreamContext';

interface DreamCardProps {
  dream: SharedDream;
  onEdit?: (dream: SharedDream) => void;
}

export function DreamCard({ dream, onEdit }: DreamCardProps) {
  const { dispatch } = useDreams();

  const handleLike = () => {
    dispatch({ type: 'TOGGLE_LIKE', id: dream.id });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this dream?')) {
      dispatch({ type: 'DELETE_DREAM', id: dream.id });
    }
  };

  return (
    <div className="dream-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img 
            src={dream.avatar} 
            alt={dream.author}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-medium text-white">{dream.author}</h3>
            <p className="text-sm text-purple-300">
              {new Date(dream.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button 
              onClick={() => onEdit(dream)}
              className="p-2 text-purple-300 hover:text-purple-200 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={handleDelete}
            className="p-2 text-purple-300 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-purple-100 mb-4">{dream.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {dream.emotions.map((emotion) => (
          <span
            key={emotion}
            className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm"
          >
            {emotion}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-purple-800">
        <div className="flex space-x-4">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-purple-300 hover:text-purple-200"
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{dream.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-purple-300 hover:text-purple-200">
            <MessageCircle className="w-5 h-5" />
            <span>{dream.comments}</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-purple-300 hover:text-purple-200">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-purple-300 hover:text-purple-200">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}