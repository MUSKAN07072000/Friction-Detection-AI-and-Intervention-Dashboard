
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FrictionType } from '../types';

interface FrictionChartProps {
  data: Record<FrictionType, number>;
}

const FrictionChart: React.FC<FrictionChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    count: value,
  }));

  if (chartData.length === 0) {
      return <div className="text-center text-gray-500 py-10">No data to display.</div>
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
          <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}} />
          <Legend />
          <Bar dataKey="count" name="Event Count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrictionChart;
