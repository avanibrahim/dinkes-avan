import React, { forwardRef } from "react";

export type DiagnosisResult = {
  confidence?: string;      // '46.0%'
  kemungkinan?: string;     // 'Kemungkinan Rendah'
  deskripsi?: string;
  analisis?: string;
  chartUrl?: string;        // base64 dari Chart.js
  gejalaDominan?: string;
  nilaiDominan?: string;
  catatan?: string[];
};

type Props = {
  hasil: DiagnosisResult;
};

const DiagnosisPdfView = forwardRef<HTMLDivElement, Props>(({ hasil }, ref) => (
  <div
    ref={ref}
    style={{
      width: 700,
      background: "#fff",
      fontFamily: "Inter, Arial, sans-serif",
      color: "#222",
      boxSizing: "border-box",
      padding: 0,
    }}
  >
    {/* HEADER KUNING */}
    <div
      style={{
        width: "100%",
        background: "#FFF6C3",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: "28px 0 14px 0",
        textAlign: "center",
        fontWeight: 700,
        fontSize: 24,
        color: "#D4A006",
        letterSpacing: 0.5,
        marginBottom: 10,
      }}
    >
      ANDA NETRAL DBD
    </div>

    {/* CONFIDENCE */}
    <div
      style={{
        textAlign: "center",
        fontSize: 17,
        marginBottom: 24,
        color: "#34495e",
      }}
    >
      Confidence: <span style={{ fontWeight: 600 }}>{hasil.confidence ?? "46.0%"}</span> —{" "}
      <span style={{ fontWeight: 700 }}>{hasil.kemungkinan ?? "Kemungkinan Rendah"}</span>
    </div>

    {/* DESKRIPSI */}
    <div
      style={{
        background: "#FAFBFD",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
        Deskripsi Penyakit
      </div>
      <div style={{ fontSize: 14 }}>
        {hasil.deskripsi ??
          "Demam Berdarah Dengue (DBD) adalah infeksi virus yang ditularkan oleh nyamuk Aedes aegypti. Gejala umum meliputi demam tinggi, bintik merah, mimisan, dan nyeri di ulu hati."}
      </div>
    </div>

    {/* ANALISIS */}
    <div
      style={{
        background: "#FAFBFD",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
        Analisis Gejala Dominan
      </div>
      <div style={{ fontSize: 14, marginBottom: 8 }}>
        {hasil.analisis ??
          `Gejala paling dominan yang Anda alami adalah: '${hasil.gejalaDominan ?? "Tampak bintik merah seperti petekie"}' dengan nilai kepercayaan ${hasil.nilaiDominan ?? "0.72"}.`}
      </div>
      {/* CHART */}
      {hasil.chartUrl && (
        <img
          src={hasil.chartUrl}
          alt="Chart Gejala"
          style={{
            width: "100%",
            borderRadius: 8,
            margin: "8px 0",
            display: "block",
          }}
        />
      )}
    </div>

    {/* CATATAN */}
    <div style={{ marginBottom: 0 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>
        Catatan untuk diagnosa Netral
      </div>
      <div style={{ fontSize: 14, color: "#222" }}>
        {(hasil.catatan && hasil.catatan.map((ctt, i) => <div key={i}>{ctt}</div>)) || (
          <>
            Gejala menunjukkan potensi, tapi belum cukup kuat untuk positif.<br />
            Perlu pemantauan atau pemeriksaan lanjutan.<br />
            Jangan abaikan perubahan kondisi tubuh.
          </>
        )}
      </div>
    </div>
  </div>
));

export default DiagnosisPdfView;
