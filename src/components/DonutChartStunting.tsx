
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import React from "react";

type DataType = {
  daerah: string;
  persentase: number;
};

type Props = {
  data: DataType[];
};

const COLORS = ["#2563eb", "#06b6d4", "#facc15", "#ef4444", "#15803d"];

const SimpleTooltip = ({ active, payload }: { active?: boolean; payload?: any }) => {
  if (!active || !payload || !payload.length) return null;
  const { daerah, persentase } = payload[0].payload;
  return (
    <div className="bg-white/90 rounded shadow px-3 py-2 border text-xs text-gray-700 backdrop-blur">
      <div><b>{daerah}</b></div>
      <div>Persentase: <span className="font-semibold">{persentase}%</span></div>
    </div>
  );
};

export default function DonutChartStunting({ data }: Props) {
  return (
    <div
      className="
        w-full h-[340px] sm:h-[380px] glass-card
        rounded-2xl border shadow-xl
        transition-all bg-white/80 dark:bg-slate-900/80
        backdrop-blur-lg p-3 sm:p-6 flex flex-col
        hover:shadow-2xl"
      style={{
        boxShadow: "0 2px 24px 0 rgba(37, 99, 235, 0.07)",
      }}
    >
      <h3 className="font-bold text-blue-700 mb-1 sm:mb-2 text-base sm:text-lg text-center tracking-wide">
        Distribusi Stunting Nasional
      </h3>
      <ResponsiveContainer width="100%" height="75%">
        <PieChart>
          <Pie
            data={data}
            dataKey="persentase"
            nameKey="daerah"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            label={({ percent }) =>
              percent && `${Math.round(percent * 1000) / 10}%`
            }
            isAnimationActive
            stroke="none"
          >
            {data.map((entry, idx) => (
              <Cell key={entry.daerah} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<SimpleTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-1 sm:gap-3 mt-2 justify-center">
        {data.map((d, idx) => (
          <span
            key={d.daerah}
            className="text-xs rounded bg-slate-100 dark:bg-slate-800 px-2 py-1 text-blue-700 dark:text-blue-300 font-semibold"
            style={{ borderLeft: `4px solid ${COLORS[idx % COLORS.length]}` }}
          >
            {d.daerah}: {d.persentase}%
          </span>
        ))}
      </div>
    </div>
  );
}
