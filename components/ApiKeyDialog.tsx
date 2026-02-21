
import React from 'react';
import { Button } from './Button';

interface ApiKeyDialogProps {
  onClose: () => void;
}

export const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ onClose }) => {
  const handleOpenSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio?.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass max-w-md w-full p-8 rounded-2xl shadow-2xl border-violet-500/20 border text-center">
        <div className="w-16 h-16 bg-violet-600/20 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-key text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold mb-4">API Key Required</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          High-quality image and video generation requires a paid API key. 
          Please select your project key from a paid GCP account to continue.
        </p>
        
        <div className="space-y-4">
          <Button onClick={handleOpenSelectKey} className="w-full py-4 text-lg">
            Select API Key
          </Button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sm text-violet-400 hover:underline"
          >
            Learn about billing & project setup
          </a>
        </div>
      </div>
    </div>
  );
};
