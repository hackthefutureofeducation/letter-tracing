import React, { useEffect, useState } from 'react';
import { WritingPractice } from './components/WritingPractice';

export default function App() {
  const [sentence, setSentence] = useState<string | undefined>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sentenceParam = urlParams.get('sentence');
    if (sentenceParam) {
      setSentence(sentenceParam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text"
          style={{ direction: 'rtl' }}
        >
          تعلم الكتابة العربية
        </h1>
        
        {sentence && (<WritingPractice sentence={sentence} />)}
      </div>
    </div>
  );
}