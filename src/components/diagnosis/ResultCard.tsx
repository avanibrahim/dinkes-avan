"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Props = {
  result: string;
  penjelasan?: string;
  saran?: string;
  chartData?: {
    positif: number;
    negatif: number;
  };
};

const COLORS = ["#00bfa6", "#ff6b6b"];

const ResultCard: React.FC<Props> = ({ result, penjelasan, saran, chartData }) => {
  const pieData = chartData
    ? [
        { name: "Positif", value: chartData.positif },
        { name: "Negatif", value: chartData.negatif },
      ]
    : [];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-teal-700">🩺 Prediksi Diagnosa</h2>
      <p className="text-gray-800 whitespace-pre-line">{result}</p>

      {penjelasan && (
        <div>
          <h3 className="font-semibold text-teal-600 mt-4">Penjelasan:</h3>
          <p className="text-gray-700">{penjelasan}</p>
        </div>
      )}

      {saran && (
        <div>
          <h3 className="font-semibold text-teal-600 mt-4">Saran:</h3>
          <p className="text-gray-700">{saran}</p>
        </div>
      )}

      {chartData && (
        <div className="mt-6">
          <h3 className="font-semibold text-teal-600 mb-2">Visualisasi Gejala</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
