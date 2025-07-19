import RightPanel from "@/components/RightPanel";
import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini

export default function DiagnosisPage() {
  const [selectedPenyakit, setSelectedPenyakit] = useState("");
  const navigate = useNavigate(); // Tambahkan ini

  const handleMulai = () => {
    if (!selectedPenyakit) return;
    switch (selectedPenyakit) {
      case "DBD":
        navigate("/diagnosis-dbd");
        break;
      case "TBC":
        navigate("/diagnosis-tbc");
        break;
      case "HIV":
        navigate("/diagnosis-hiv");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-screen">
      <main className="flex-1 px-6 lg:pr-[21rem]">
        {/* Header */}
        <header className="sticky top-0 z-30 px-4 py-4 bg-transparent">
          <div className="bg-white rounded-2xl border shadow-sm px-6 py-3 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search Here"
              className="px-4 py-2 rounded-full border border-gray-300 w-72"
            />
            <div className="flex items-center gap-3">
              <button className="bg-teal-100 p-2 rounded-full">
                <Bell className="w-5 h-5 text-teal-600" />
              </button>
              <button className="bg-teal-100 p-2 rounded-full">
                <Settings className="w-5 h-5 text-teal-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Banner */}
        <section className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Edukasi dan <br /> Deteksi Penyakit Menular
          </h1>
          <p className="text-sm bg-white text-teal-700 px-4 py-1 rounded-full w-fit font-medium">
            Jawab Beberapa Pertanyaan di bawah ini untuk memulai diagnosa
          </p>
        </section>

        {/* Select Section */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Pilih Penyakit yang Ingin di Deteksi</h2>
          <div className="flex gap-4 items-center">
            <select
              className="px-4 py-2 rounded-md border border-gray-400 w-64"
              value={selectedPenyakit}
              onChange={(e) => setSelectedPenyakit(e.target.value)}
            >
              <option value="">Pilih Penyakit</option>
              <option value="DBD">DBD</option>
              <option value="TBC">TBC</option>
              <option value="HIV">HIV</option>
            </select>
            <button
              onClick={handleMulai}
              disabled={!selectedPenyakit}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-md"
            >
              Mulai
            </button>
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
    
    </div>
  );
}
