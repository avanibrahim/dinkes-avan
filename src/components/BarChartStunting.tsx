
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar, ResponsiveContainer, Cell } from "recharts";
import IndicatorLabel from "./IndicatorLabel";
import React from "react";

type DataType = {
  daerah: string;
  persentase: number;
  jumlah: number;
};

type Props = {
  data: DataType[];
};

const COLORS = [
  "#2563eb", // biru
  "#06b6d4", // cyan
  "#facc15", // kuning
  "#ef4444", // merah
  "#15803d", // hijau
];

const SimpleTooltip = ({ active, payload }: { active?: boolean, payload?: any }) => {
  if (!active || !payload || !payload.length) return null;
  const { daerah, persentase, jumlah } = payload[0].payload;
  return (
    <div className="bg-white/90 rounded shadow px-3 py-2 border text-xs text-gray-700 backdrop-blur">
      <div><b>{daerah}</b></div>
      <div>Persentase: <span className="font-semibold">{persentase}%</span></div>
      <div>Jumlah: <span className="font-semibold">{jumlah} anak</span></div>
    </div>
  );
};

// Responsive container: min height untuk mobile, px-1 supaya padding kiri-kanan enak
export default function BarChartStunting({ data }: Props) {
  // Sort descending (besar ke kecil)
  const chartData = [...data].sort((a, b) => b.persentase - a.persentase);

  return (
    <div
      className="
        w-full h-[340px] sm:h-[380px] glass-card relative
        rounded-2xl border shadow-xl
        transition-all bg-white/70 dark:bg-slate-900/70
        backdrop-blur-md p-3 sm:p-6 flex flex-col
        hover:shadow-2xl"
      style={{
        boxShadow: "0 2px 24px 0 rgba(37, 99, 235, 0.07)",
      }}
    >
      <h3 className="font-bold text-blue-700 mb-1 sm:mb-2 text-base sm:text-lg text-center tracking-wide">
        Stunting per Daerah
      </h3>
      <ResponsiveContainer width="100%" height="75%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="2 5" vertical={false} strokeOpacity={0.09} />
          <XAxis
            dataKey="daerah"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b", angle: -20, dy: 10 }}
            height={42}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 'auto']}
            width={34}
          />
          <Tooltip content={<SimpleTooltip />} />
          <Bar
            dataKey="persentase"
            radius={[8, 8, 0, 0]}
            barSize={28}
            isAnimationActive
          >
            {chartData.map((entry, idx) => (
              <Cell key={entry.daerah} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap mt-2 gap-1 sm:gap-3 justify-center">
        {chartData.map(d =>
          <div key={d.daerah} className="flex items-center gap-1 text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 rounded px-2 py-1 font-medium">
            <span className="font-bold text-gray-700 dark:text-slate-100">{d.daerah}:</span>
            <span>{d.persentase}%</span>
            <IndicatorLabel value={d.persentase} />
          </div>
        )}
      </div>
    </div>
  );
}
