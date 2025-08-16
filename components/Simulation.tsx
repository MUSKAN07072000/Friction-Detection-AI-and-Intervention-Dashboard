import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFriction } from '../context/FrictionContext';
import { FrictionType, InterventionType } from '../types';
import InterventionModal from './InterventionModal';

const Simulation: React.FC = () => {
  const { addFrictionEvent } = useFriction();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoAttempts, setPromoAttempts] = useState(0);
  const clickTimestamps = useRef<number[]>([]);
  
  const [activeIntervention, setActiveIntervention] = useState<{type: InterventionType, eventId: string, message: string} | null>(null);

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
    if (promoError) setPromoError('');
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() !== 'SAVE20') {
      setPromoError('Invalid promo code. Please try again.');
      const newAttempts = promoAttempts + 1;
      setPromoAttempts(newAttempts);

      if (newAttempts >= 3) {
        const eventId = `form-error-${Date.now()}`;
        addFrictionEvent({
          type: FrictionType.FormError,
          elementId: 'promo-code-input',
          description: `User failed to apply a promo code ${newAttempts} times. Last attempt: "${promoCode}"`,
          interventionTriggered: InterventionType.PromoOffer
        });
        setActiveIntervention({
            type: InterventionType.PromoOffer,
            eventId: eventId,
            message: "Having trouble with your promo code? Try using 'SAVE20' for 20% off your order!"
        });
        setPromoAttempts(0); // Reset after intervention
      }
    } else {
      setPromoError('');
      alert('Promo code SAVE20 applied successfully!');
    }
  };

  const handleRageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    clickTimestamps.current.push(now);

    // Keep only the timestamps from the last second
    clickTimestamps.current = clickTimestamps.current.filter(ts => now - ts < 1000);
    
    if (clickTimestamps.current.length >= 4) {
      const eventId = `rage-click-${Date.now()}`;
      addFrictionEvent({
        type: FrictionType.RageClick,
        elementId: e.currentTarget.id,
        description: `User clicked the '${e.currentTarget.innerText}' button ${clickTimestamps.current.length} times in rapid succession.`,
        interventionTriggered: InterventionType.Chatbot,
      });
      setActiveIntervention({
          type: InterventionType.Chatbot,
          eventId: eventId,
          message: "It seems you're having trouble proceeding. Would you like to connect with a support agent?"
      });
      clickTimestamps.current = []; // Reset after detection
    }
  };

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      const eventId = `inactivity-${Date.now()}`;
      addFrictionEvent({
        type: FrictionType.SessionInactivity,
        elementId: 'checkout-page',
        description: 'User has been inactive on the checkout page for over 15 seconds.',
        interventionTriggered: InterventionType.HelpArticle,
      });
       setActiveIntervention({
          type: InterventionType.HelpArticle,
          eventId: eventId,
          message: "Still there? If you have questions about our checkout process, this article might help."
      });
    }, 15000); // 15 seconds
  }, [addFrictionEvent]);

  useEffect(() => {
    resetInactivityTimer();
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
    };
  }, [resetInactivityTimer]);


  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Checkout Simulation</h2>
          <p className="text-gray-500 mb-6">Interact with this form to generate friction events.</p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" />
            </div>

            <div className="pt-2">
              <label htmlFor="promo-code-input" className="block text-sm font-medium text-gray-700">Promo Code</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input 
                  type="text" 
                  id="promo-code-input"
                  value={promoCode}
                  onChange={handlePromoChange}
                  className={`flex-1 block w-full min-w-0 px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${promoError ? 'border-red-500 border-2' : 'border-gray-300'}`} 
                  placeholder="Enter code (hint: SAVE20)"
                />
                <button
                  type="button"
                  onClick={applyPromoCode}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="mt-2 text-sm text-red-600">{promoError}</p>}
            </div>

            <div className="text-right pt-4">
              <button
                id="place-order-btn"
                onClick={handleRageClick}
                className="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Place Order
              </button>
              <p className="text-xs text-gray-500 mt-2">Try clicking this button rapidly 4+ times.</p>
            </div>
          </div>
        </div>
      </div>
      {activeIntervention && (
        <InterventionModal
          isOpen={!!activeIntervention}
          onClose={() => setActiveIntervention(null)}
          intervention={activeIntervention}
        />
      )}
    </>
  );
};

export default Simulation;