import React from 'react';
import { Brain, Sparkles, History } from 'lucide-react';
import { analyzeDream } from '../utils/dreamAnalysis';

interface DreamInterpretationProps {
  dream: string;
  emotions: string[];
}

export function DreamInterpretation({ dream, emotions }: DreamInterpretationProps) {
  const { interpretation, symbols } = analyzeDream(dream, emotions);

  return (
    <div className="w-full max-w-2xl bg-purple-950 rounded-xl shadow-lg p-6 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Dream Analysis</h2>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 bg-purple-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-medium text-white">AI Interpretation</h3>
          </div>
          <p className="text-purple-200 leading-relaxed">
            {interpretation}
          </p>
        </div>

        {symbols.length > 0 && (
          <div className="border-t border-purple-800 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-5 h-5 text-purple-400" />
              <h3 className="font-medium text-white">Key Symbols</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {symbols.map((symbol) => (
                <span
                  key={symbol}
                  className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm"
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}