
import React from 'react';
import { useFriction } from '../context/FrictionContext';
import { InterventionType } from '../types';
import { Icons } from './Icons';

interface InterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  intervention: {
    type: InterventionType;
    eventId: string;
    message: string;
  };
}

const InterventionModal: React.FC<InterventionModalProps> = ({ isOpen, onClose, intervention }) => {
  const { updateEventFeedback } = useFriction();
  const [feedbackGiven, setFeedbackGiven] = React.useState(false);

  const handleFeedback = (isEffective: boolean) => {
    updateEventFeedback(intervention.eventId, isEffective);
    setFeedbackGiven(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const getIcon = () => {
    switch (intervention.type) {
      case InterventionType.Chatbot:
        return <Icons.chatbot className="h-12 w-12 text-blue-500" />;
      case InterventionType.HelpArticle:
        return <Icons.help className="h-12 w-12 text-green-500" />;
      case InterventionType.PromoOffer:
        return <Icons.offer className="h-12 w-12 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <Icons.close className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{getIcon()}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{intervention.type}</h3>
          <p className="text-gray-600 mb-6">{intervention.message}</p>
          
          {!feedbackGiven ? (
            <div className="w-full">
              <p className="text-sm text-gray-500 mb-3">Was this helpful?</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => handleFeedback(true)} 
                  className="flex items-center space-x-2 px-6 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                >
                  <Icons.thumbUp className="h-5 w-5" />
                  <span>Yes</span>
                </button>
                <button 
                  onClick={() => handleFeedback(false)} 
                  className="flex items-center space-x-2 px-6 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  <Icons.thumbDown className="h-5 w-5" />
                  <span>No</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-100 rounded-md w-full">
              <p className="font-medium text-gray-700">Thank you for your feedback!</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default InterventionModal;
