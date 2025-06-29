"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Logo Kemenkes dalam Base64 (ukuran kecil yang sudah dikompres agar ringan)
const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABdElEQVR4nO3ZsUoDQRBF0XsGJrHAsESiYQkqCEoaEVW7AAGMRCIRG8eT8NBmt+kl9QOe7ndzd2/X9wVRXdd0CqFwAAAAAAAAAA4ON9Y4KkTYy6zjGo5xg1wlvuyfZx5P0bTBNwFqgJ3AZUANcBNYBLwBdwE3gEWzcyq8gOpEgh9q9pmISqV4hKpXiEqleISqV4hKpXiEqleISqV4hKpXiEqleIRrWqKZVdrKyt43qUQdeL1MFoKfy2ZazDQC1oKZVYugEqV4hKpXiEqleIRqX7UbUUNtACbAVqgJ3AZUANcBNYBLwBdwE3gAWANXBrcv6TCvK/YCt1hKiIqleISqV4hKpXiEqleISqV4hKpXiEqleIRrd94DLnvo+H5uDAAAAAElFTkSuQmCC";

export function exportDiagnosisToPDF({
  title,
  answers,
  result,
  mlPrediction,
}: {
  title: string;
  answers: { [key: string]: boolean };
  result: string;
  mlPrediction: string;
}) {
  const doc = new jsPDF();

  // Tambahkan logo
  doc.addImage(LOGO_BASE64, "PNG", 15, 10, 25, 25); // x, y, width, height

  // Tambahkan judul
  doc.setFontSize(16);
  doc.text(title, 45, 20);
  doc.setFontSize(12);
  doc.text("Kementerian Kesehatan Republik Indonesia", 45, 27);

  // Tabel jawaban
  autoTable(doc, {
    startY: 45,
    head: [["Pertanyaan", "Jawaban"]],
    body: Object.entries(answers).map(([key, value]) => [key, value ? "Ya" : "Tidak"]),
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 70;

  // Tambahkan hasil manual & ML
  doc.setFontSize(12);
  doc.text("Hasil Diagnosa Manual:", 14, finalY + 10);
  doc.text(result, 14, finalY + 18);
  doc.text("Hasil Prediksi Machine Learning:", 14, finalY + 30);
  doc.text(mlPrediction, 14, finalY + 38);

  // Simpan
  doc.save("diagnosis.pdf");
}
