
import React from 'react';
import { useFriction } from '../context/FrictionContext';
import { FrictionType } from '../types';
import EventLog from './EventLog';
import KpiCard from './KpiCard';
import FrictionChart from './FrictionChart';
import { Icons } from './Icons';

const Dashboard: React.FC = () => {
  const { frictionEvents } = useFriction();

  const totalEvents = frictionEvents.length;
  const interventionsTriggered = frictionEvents.filter(e => e.interventionTriggered).length;
  const successfulInterventions = frictionEvents.filter(e => e.interventionEffective === true).length;
  const successRate = interventionsTriggered > 0 ? (successfulInterventions / interventionsTriggered) * 100 : 0;
  
  const eventCounts = frictionEvents.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<FrictionType, number>);


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Friction Events" value={totalEvents.toString()} icon={<Icons.alert className="h-8 w-8 text-red-500"/>} />
        <KpiCard title="Interventions Triggered" value={interventionsTriggered.toString()} icon={<Icons.intervention className="h-8 w-8 text-blue-500"/>} />
        <KpiCard title="Successful Interventions" value={successfulInterventions.toString()} icon={<Icons.check className="h-8 w-8 text-green-500"/>} />
        <KpiCard title="Intervention Success Rate" value={`${successRate.toFixed(1)}%`} icon={<Icons.chart className="h-8 w-8 text-purple-500"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Friction Type Breakdown</h3>
            <FrictionChart data={eventCounts} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Friction Event Log</h3>
          <EventLog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
