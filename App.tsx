
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Simulation from './components/Simulation';
import Header from './components/Header';
import { FrictionProvider } from './context/FrictionContext';

export type View = 'simulation' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('simulation');

  return (
    <FrictionProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Header activeView={view} setView={setView} />
        <main className="p-4 sm:p-6 lg:p-8">
          {view === 'simulation' && <Simulation />}
          {view === 'dashboard' && <Dashboard />}
        </main>
      </div>
    </FrictionProvider>
  );
};

export default App;
