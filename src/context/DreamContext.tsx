import React, { createContext, useContext, useReducer } from 'react';
import type { SharedDream } from '../types';

type DreamAction = 
  | { type: 'ADD_DREAM'; dream: SharedDream }
  | { type: 'UPDATE_DREAM'; dream: SharedDream }
  | { type: 'DELETE_DREAM'; id: string }
  | { type: 'TOGGLE_LIKE'; id: string }
  | { type: 'ADD_COMMENT'; dreamId: string; comment: string };

type DreamState = {
  dreams: SharedDream[];
};

const initialDreams: SharedDream[] = [
  {
    id: '1',
    author: 'Luna Dreamer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'Last night, I dreamed I was flying over a crystal-clear ocean. The water below was shimmering with all colors of the rainbow, and I could see ancient cities beneath the waves.',
    emotions: ['joy', 'peace'],
    likes: 24,
    comments: 8,
    timestamp: Date.now() - 3600000,
  },
  {
    id: '2',
    author: 'Astral Walker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'In my dream, I was walking through a library where all the books were written in a language that kept changing, but somehow I could understand everything. The knowledge felt infinite.',
    emotions: ['confusion', 'peace'],
    likes: 15,
    comments: 5,
    timestamp: Date.now() - 7200000,
  },
];

const DreamContext = createContext<{
  state: DreamState;
  dispatch: React.Dispatch<DreamAction>;
} | undefined>(undefined);

function dreamReducer(state: DreamState, action: DreamAction): DreamState {
  switch (action.type) {
    case 'ADD_DREAM':
      return {
        ...state,
        dreams: [action.dream, ...state.dreams],
      };
    case 'UPDATE_DREAM':
      return {
        ...state,
        dreams: state.dreams.map(dream =>
          dream.id === action.dream.id ? action.dream : dream
        ),
      };
    case 'DELETE_DREAM':
      return {
        ...state,
        dreams: state.dreams.filter(dream => dream.id !== action.id),
      };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        dreams: state.dreams.map(dream =>
          dream.id === action.id
            ? { ...dream, likes: dream.likes + 1 }
            : dream
        ),
      };
    default:
      return state;
  }
}

export function DreamProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dreamReducer, { dreams: initialDreams });

  return (
    <DreamContext.Provider value={{ state, dispatch }}>
      {children}
    </DreamContext.Provider>
  );
}

export function useDreams() {
  const context = useContext(DreamContext);
  if (context === undefined) {
    throw new Error('useDreams must be used within a DreamProvider');
  }
  return context;
}