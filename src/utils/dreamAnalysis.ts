import { Emotion } from '../types';

type DreamTheme = {
  emotion: string;
  themes: string[];
  symbols: string[];
};

const dreamThemes: DreamTheme[] = [
  {
    emotion: 'joy',
    themes: [
      'personal growth and achievement',
      'newfound opportunities',
      'spiritual awakening',
      'creative breakthroughs'
    ],
    symbols: ['sun', 'flying', 'gardens', 'celebration']
  },
  {
    emotion: 'fear',
    themes: [
      'unresolved anxieties',
      'facing inner challenges',
      'need for self-protection',
      'transformation through adversity'
    ],
    symbols: ['darkness', 'falling', 'chase', 'locked doors']
  },
  {
    emotion: 'peace',
    themes: [
      'inner harmony',
      'spiritual balance',
      'emotional healing',
      'life transitions'
    ],
    symbols: ['water', 'mountains', 'sky', 'nature']
  },
  {
    emotion: 'anxiety',
    themes: [
      'overwhelming responsibilities',
      'fear of unknown changes',
      'need for control',
      'subconscious warnings'
    ],
    symbols: ['clocks', 'mazes', 'storms', 'tests']
  },
  {
    emotion: 'love',
    themes: [
      'deep connections',
      'self-acceptance',
      'emotional vulnerability',
      'relationship dynamics'
    ],
    symbols: ['hearts', 'bridges', 'gifts', 'embraces']
  },
  {
    emotion: 'confusion',
    themes: [
      'seeking clarity',
      'life crossroads',
      'hidden truths',
      'need for guidance'
    ],
    symbols: ['fog', 'mirrors', 'doors', 'puzzles']
  }
];

export function analyzeDream(content: string, emotions: string[]): {
  interpretation: string;
  symbols: string[];
} {
  const words = content.toLowerCase().split(' ');
  const relevantThemes = dreamThemes.filter(theme => 
    emotions.includes(theme.emotion)
  );

  // Get unique symbols based on selected emotions
  const symbols = Array.from(new Set(
    relevantThemes.flatMap(theme => theme.symbols)
  )).slice(0, 6);

  if (emotions.length === 0) {
    return {
      interpretation: "Share how this dream made you feel for a deeper interpretation.",
      symbols: []
    };
  }

  // Generate interpretation based on emotional combinations
  let interpretation = '';
  
  if (emotions.length === 1) {
    const theme = dreamThemes.find(t => t.emotion === emotions[0]);
    if (theme) {
      interpretation = `This dream reflects ${theme.themes[0]} and ${theme.themes[1]}.`;
    }
  } else {
    const emotionalThemes = emotions.map(emotion => {
      const theme = dreamThemes.find(t => t.emotion === emotion);
      return theme?.themes[0];
    }).filter(Boolean);

    interpretation = `Your dream suggests a complex interplay between ${emotionalThemes.join(' and ')}.`;
  }

  // Add content-specific analysis
  if (words.some(word => ['fall', 'falling', 'fell'].includes(word))) {
    interpretation += ' The presence of falling in your dream often symbolizes feelings of losing control or fear of failure.';
  }

  if (words.some(word => ['fly', 'flying', 'flew'].includes(word))) {
    interpretation += ' Flying in your dream typically represents freedom, transcendence, or desire to escape current situations.';
  }

  if (words.some(word => ['water', 'ocean', 'river', 'sea'].includes(word))) {
    interpretation += ' Water in dreams often represents your emotional state or the unconscious mind.';
  }

  return { interpretation, symbols };
}