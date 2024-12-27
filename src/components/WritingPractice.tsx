import React from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { RefreshCw } from 'lucide-react';

interface WritingPracticeProps {
  sentence: string;
}

export function WritingPractice({ sentence }: WritingPracticeProps) {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Drawing Practice Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 text-center" style={{ direction: 'rtl' }}>
          تدرب على الكتابة
        </h2>

        <div className="relative w-full overflow-scroll">
          <DrawingCanvas 
            width={800}
            height={300}
            color="#ef4444"
            text={sentence}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors text-lg"
          >
            <RefreshCw size={20} />
            <span style={{ direction: 'rtl' }}>مسح</span>
          </button>
        </div>

        <p className="mt-4 text-center text-base text-gray-600" style={{ direction: 'rtl' }}>
          اكتب فوق الحروف للتدرب على الكتابة
        </p>
      </div>
    </div>
  );
}