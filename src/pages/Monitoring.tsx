
import { useEffect, useState } from "react";
import BarChartStunting from "@/components/BarChartStunting";
import DonutChartStunting from "@/components/DonutChartStunting";
import FilterDropdown from "@/components/FilterDropdown";
import { RefreshCw } from "lucide-react";

type DataStub = {
  daerah: string;
  persentase: number;
  jumlah: number;
};

const daerahList = ["Semua", "Kabupaten A", "Kabupaten B", "Kabupaten C", "Kabupaten D", "Kabupaten E"];

function getRandomData() {
  return [
    { daerah: "Kabupaten A", persentase: +(12 + Math.random()*3).toFixed(1), jumlah: 140 + Math.floor(Math.random()*15) },
    { daerah: "Kabupaten B", persentase: +(28 + Math.random()*4).toFixed(1), jumlah: 225 + Math.floor(Math.random()*22) },
    { daerah: "Kabupaten C", persentase: +(21 + Math.random()*5).toFixed(1), jumlah: 178 + Math.floor(Math.random()*10) },
    { daerah: "Kabupaten D", persentase: +(8 + Math.random()*2).toFixed(1), jumlah: 66 + Math.floor(Math.random()*3) },
    { daerah: "Kabupaten E", persentase: +(33 + Math.random()*2).toFixed(1), jumlah: 269 + Math.floor(Math.random()*20) }
  ];
}

const Monitoring = () => {
  const [data, setData] = useState<DataStub[]>(getRandomData());
  const [selected, setSelected] = useState<string>("Semua");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
      setTimeout(() => {
        setData(getRandomData());
        setLoading(false);
      }, 800);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = selected === "Semua" ? data : data.filter(d => d.daerah === selected);

  return (
    <section className="max-w-6xl mx-auto py-10 px-2 sm:px-4 animate-fade-in">
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-blue-700 text-center md:text-left">
        Monitoring Data Stunting
      </h1>
      <p className="text-muted-foreground mb-6 text-base md:text-lg flex items-center gap-2 justify-center md:justify-start">
        Data diperbarui otomatis setiap <strong>10 detik</strong>.
        <RefreshCw className={loading ? "animate-spin" : ""} size={18} aria-label="Memuat data..." />
      </p>

      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-8">
        <span className="font-semibold text-sm md:text-base">Filter Daerah:</span>
        <FilterDropdown options={daerahList} value={selected} onChange={() => {}} />
        {/* Dropdown belum aktif (dummy) */}
      </div>

      {/* Responsive: stack on mobile (col) & grid 2 cols on large */}
      <div className="flex flex-col gap-5 mb-6 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="w-full">
          <BarChartStunting data={filteredData}/>
        </div>
        <div className="w-full mt-6 lg:mt-0">
          <DonutChartStunting data={data.map(d => ({ daerah: d.daerah, persentase: d.persentase }))}/>
        </div>
      </div>

      <div className="bg-blue-50 text-blue-700 rounded-lg p-3 md:p-4 border text-center text-xs md:text-sm mx-auto max-w-full md:max-w-3xl">
        <b>Keterangan:</b>
        <span className="inline-block mx-1 md:mx-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1 align-middle"></span>
          Tinggi &ge; 30%
        </span>
        <span className="inline-block mx-1 md:mx-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1 align-middle"></span>
          Sedang &ge; 20%
        </span>
        <span className="inline-block mx-1 md:mx-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1 align-middle"></span>
          Rendah &lt; 20%
        </span>
      </div>
    </section>
  );
};

export default Monitoring;
