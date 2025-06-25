import { Microscope } from "lucide-react";

export default function ResultCard({ result }: { result: string }) {
  return (
    <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6 shadow text-center">
      <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
        <Microscope size={24} /> Hasil Diagnosis
      </h2>
      <p className="text-gray-800 whitespace-pre-line">{result}</p>
      <p className="mt-4 text-sm text-gray-600">
        *Hasil ini hanya indikasi awal. Konsultasi lebih lanjut dengan profesional medis tetap diperlukan.
      </p>
    </div>
  );
}
