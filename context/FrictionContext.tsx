import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { FrictionEvent } from '../types';
import { demoEvents } from '../data/demoData';

interface FrictionContextType {
  frictionEvents: FrictionEvent[];
  addFrictionEvent: (event: Omit<FrictionEvent, 'id' | 'timestamp' | 'interventionEffective'>) => void;
  updateEventFeedback: (eventId: string, isEffective: boolean) => void;
  addNoteToEvent: (eventId: string, note: string) => void;
  loadDemoData: () => void;
}

const FrictionContext = createContext<FrictionContextType | undefined>(undefined);

export const FrictionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [frictionEvents, setFrictionEvents] = useState<FrictionEvent[]>([]);

  const addFrictionEvent = useCallback((event: Omit<FrictionEvent, 'id' | 'timestamp' | 'interventionEffective'>) => {
    const newEvent: FrictionEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date(),
      interventionEffective: null,
    };
    setFrictionEvents(prevEvents => [newEvent, ...prevEvents]);
  }, []);

  const updateEventFeedback = useCallback((eventId: string, isEffective: boolean) => {
    setFrictionEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, interventionEffective: isEffective } : event
      )
    );
  }, []);

  const addNoteToEvent = useCallback((eventId: string, note: string) => {
    setFrictionEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, notes: note } : event
      )
    );
  }, []);
  
  const loadDemoData = useCallback(() => {
    // Sorts demo data to appear in a sensible chronological order
    const sortedDemoData = demoEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setFrictionEvents(sortedDemoData);
  }, []);

  return (
    <FrictionContext.Provider value={{ frictionEvents, addFrictionEvent, updateEventFeedback, addNoteToEvent, loadDemoData }}>
      {children}
    </FrictionContext.Provider>
  );
};

export const useFriction = (): FrictionContextType => {
  const context = useContext(FrictionContext);
  if (!context) {
    throw new Error('useFriction must be used within a FrictionProvider');
  }
  return context;
};