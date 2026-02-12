
import React, { useState, useEffect } from 'react';
// Import GenAI service for specific challenges
import { generateChallengeFromResources } from '../services/geminiService';
import { Resource } from '../types';

interface Props {
  topic: string; // The syllabus unit or resource name to test
  resources: Resource[]; // List of available teacher materials
  onClose: () => void; // Function to exit the modal
}

const ChallengeModal: React.FC<Props> = ({ topic, resources, onClose }) => {
  // Loading state for AI generation
  const [loading, setLoading] = useState(true);
  // Storage for the generated quiz text
  const [challengeText, setChallengeText] = useState('');

  // On mount, ask Gemini to create a quiz based on the class resources
  useEffect(() => {
    const fetchChallenge = async () => {
      // Find the specific resource text provided by the teacher
      const relevantResource = resources.find(r => r.title === topic) || resources[0];
      const text = await generateChallengeFromResources(topic, relevantResource.content);
      setChallengeText(text || "I couldn't generate a challenge right now. Try another topic!");
      setLoading(false);
    };
    fetchChallenge();
  }, [topic, resources]);

  return (
    <div className="fixed inset-0 bg-uni-blue/90 z-[60] flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95">
        {/* Header with thematic colors */}
        <div className="bg-crane-yellow p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-uni-blue">Mastery Challenge</h2>
            <p className="text-xs font-bold text-uni-blue/60 uppercase">Topic: {topic}</p>
          </div>
          <button onClick={onClose} className="text-uni-blue text-xl font-bold">×</button>
        </div>

        {/* Challenge content area */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center py-12">
               {/* Loading animation for low bandwidth feel */}
               <div className="w-12 h-12 border-4 border-uni-blue border-t-crane-yellow rounded-full animate-spin mb-4"></div>
               <p className="text-slate-500 font-bold">Soma-Agent is reading your teacher's notes...</p>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="prose prose-slate whitespace-pre-wrap font-medium text-slate-800 leading-relaxed">
                 {challengeText}
               </div>
               {/* Action buttons */}
               <div className="pt-6 border-t border-slate-100 flex flex-col space-y-3">
                  <button onClick={onClose} className="w-full bg-uni-blue text-white py-3 rounded-xl font-bold shadow-lg shadow-uni-blue/20">
                    Done practicing
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase">This quiz was generated based on your school's specific materials.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
