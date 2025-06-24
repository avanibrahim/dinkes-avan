
const gallery = [
  {
    src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    alt: "Edukasi gizi ke masyarakat"
  },
  {
    src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=400&q=80",
    alt: "Pemeriksaan kesehatan anak"
  },
  {
    src: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=400&q=80",
    alt: "Pelatihan kader posyandu"
  },
  {
    src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    alt: "Sosialisasi ke sekolah"
  }
];

export default function GallerySection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
        Galeri Kegiatan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((item, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden shadow border bg-white aspect-[3/4] flex items-center justify-center">
            <img src={item.src} alt={item.alt} className="object-cover w-full h-full transition-transform duration-200 hover:scale-105" />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <a href="#" className="text-blue-600 font-semibold hover:underline">Lihat Selengkapnya</a>
      </div>
    </section>
  );
}
