
const fasilitasKesehatan = [
  {
    title: "Data Sarana Kesehatan 2024",
    url: "#",
    downloadUrl: "#",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd3c?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Data Posyandu Aktif",
    url: "#",
    downloadUrl: "#",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=200&q=80"
  }
];

const profilKesehatan = [
  {
    title: "Profil Kesehatan Provinsi 2024",
    url: "#",
    downloadUrl: "#",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80"
  },
  {
    title: "Profil Kesehatan Kota/Kabupaten 2024",
    url: "#",
    downloadUrl: "#",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
  }
];

export default function DataPublicationSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
        Publikasi Data Stunting
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sarana Kesehatan */}
        <div className="bg-white rounded-lg border shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Sarana Kesehatan</h3>
          <ul className="space-y-4">
            {fasilitasKesehatan.map((data, idx) => (
              <li key={idx} className="flex items-center gap-4 border-b pb-2 last:border-b-0">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-14 h-14 rounded-lg object-cover border shadow"
                  loading="lazy"
                />
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="text-gray-800 font-medium">{data.title}</span>
                  <div className="flex gap-2 md:ml-auto">
                    <a href={data.url} className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-3 py-1 rounded transition">View More</a>
                    <a href={data.downloadUrl} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition" download>Download</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Profil Kesehatan */}
        <div className="bg-white rounded-lg border shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-700">Profil Kesehatan Provinsi/Kota</h3>
          <ul className="space-y-4">
            {profilKesehatan.map((data, idx) => (
              <li key={idx} className="flex items-center gap-4 border-b pb-2 last:border-b-0">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-14 h-14 rounded-lg object-cover border shadow"
                  loading="lazy"
                />
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="text-gray-800 font-medium">{data.title}</span>
                  <div className="flex gap-2 md:ml-auto">
                    <a href={data.url} className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-3 py-1 rounded transition">View More</a>
                    <a href={data.downloadUrl} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition" download>Download</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
