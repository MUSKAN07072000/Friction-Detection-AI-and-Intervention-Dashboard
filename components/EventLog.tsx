import React, { useState } from 'react';
import { useFriction } from '../context/FrictionContext';
import { FrictionEvent, GeminiAnalysis } from '../types';
import { analyzeFrictionEvent } from '../services/geminiService';
import { Icons } from './Icons';

const EventRow: React.FC<{ event: FrictionEvent }> = ({ event }) => {
  const { addNoteToEvent } = useFriction();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [note, setNote] = useState(event.notes || '');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    if (!showAnalysis) {
        setShowAnalysis(true);
    }
    const result = await analyzeFrictionEvent(event);
    setAnalysis(result);
    setIsAnalyzing(false);
  };
  
  const handleSaveNote = () => {
    addNoteToEvent(event.id, note);
    setIsEditingNote(false);
  };

  const getFeedbackIcon = () => {
    if (event.interventionEffective === true) {
      return <Icons.thumbUp className="h-5 w-5 text-green-500" title="Effective" />;
    }
    if (event.interventionEffective === false) {
      return <Icons.thumbDown className="h-5 w-5 text-red-500" title="Not Effective" />;
    }
    return <span className="text-gray-400 text-xs">N/A</span>;
  };

  const toggleDetails = () => {
      const isDetailsOpen = showAnalysis || isEditingNote;
      setShowAnalysis(!isDetailsOpen);
      setIsEditingNote(false);
  }

  return (
    <>
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-700">{event.timestamp.toLocaleTimeString()}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-800">{event.type}</td>
      <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{event.description}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{event.interventionTriggered || 'None'}</td>
      <td className="px-4 py-3 text-center">{getFeedbackIcon()}</td>
      <td className="px-4 py-3 text-center">
        <button onClick={handleAnalyze} disabled={isAnalyzing} className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed" title="Analyze with AI">
          {isAnalyzing ? <Icons.loading className="h-5 w-5 animate-spin" /> : <Icons.gemini className="h-5 w-5" />}
        </button>
      </td>
       <td className="px-4 py-3 text-center">
        <button onClick={() => setIsEditingNote(!isEditingNote)} className="text-gray-500 hover:text-gray-700" title="View/Edit Notes">
          {event.notes ? <Icons.noteFilled className="h-5 w-5"/> : <Icons.note className="h-5 w-5" />}
        </button>
      </td>
    </tr>
    {(showAnalysis || isEditingNote) && (
      <tr className="bg-gray-50">
        <td colSpan={7} className="p-4 transition-all duration-300">
          {showAnalysis && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-md mb-2 flex items-center"><Icons.gemini className="h-5 w-5 mr-2 text-blue-600" /> AI Analysis</h4>
              {isAnalyzing && (
                  <div className="flex items-center space-x-2 text-gray-600">
                      <Icons.loading className="h-5 w-5 animate-spin" />
                      <span>Analyzing with Gemini...</span>
                  </div>
              )}
              {analysis && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold mb-1">Potential Root Causes</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {analysis.rootCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">UX Recommendations</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {analysis.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          {isEditingNote && (
            <div className="mt-4 bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-md mb-2 flex items-center"><Icons.note className="h-5 w-5 mr-2 text-gray-600"/> Team Notes</h4>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 border rounded-md text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Add notes for your team..."
              />
              <div className="text-right mt-2">
                 <button onClick={() => setIsEditingNote(false)} className="px-3 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-200 mr-2">Cancel</button>
                <button onClick={handleSaveNote} className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Save Note</button>
              </div>
            </div>
          )}
        </td>
      </tr>
    )}
    </>
  );
};

const EventLog: React.FC = () => {
  const { frictionEvents, loadDemoData } = useFriction();

  if (frictionEvents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Icons.log className="mx-auto h-12 w-12 text-gray-400"/>
        <p className="mt-4 font-semibold">No friction events detected yet.</p>
        <p className="text-sm">Go to the Live Simulation tab to generate some data.</p>
        <div className="mt-6">
            <p className="text-xs text-gray-400 mb-2">- OR -</p>
            <button
                onClick={loadDemoData}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <Icons.wand className="h-5 w-5 mr-2" />
                Load Demo Data
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[600px]">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intervention</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AI</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {frictionEvents.map(event => <EventRow key={event.id} event={event} />)}
        </tbody>
      </table>
    </div>
  );
};

export default EventLog;