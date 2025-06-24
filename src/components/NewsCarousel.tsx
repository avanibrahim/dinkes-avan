
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const sampleNews = [
  {
    title: "Pentingnya Deteksi Dini Stunting pada Anak",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    desc: "Memahami tanda dan risiko Stunting sangat penting untuk intervensi awal.",
    link: "#"
  },
  {
    title: "Meningkatkan Asupan Gizi di Seribu Hari Pertama",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
    desc: "Kunci pencegahan stunting dimulai sejak kehamilan hingga balita.",
    link: "#"
  },
  {
    title: "Peran Masyarakat dalam Pencegahan Stunting",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    desc: "Edukasi dan gotong royong dorong perubahan nyata.",
    link: "#"
  },
  {
    title: "Layanan Konsultasi Gratis untuk Keluarga",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=400&q=80",
    desc: "Dapatkan saran ahli secara online mengenai pencegahan stunting.",
    link: "#"
  },
];

export default function NewsCarousel() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
        Berita & Informasi
      </h2>
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          {sampleNews.map((news, idx) => (
            <CarouselItem
              key={idx}
              className="max-w-xs"
            >
              <div className="bg-white rounded-lg shadow-md border border-border flex flex-col h-full">
                <img src={news.image} alt={news.title} className="rounded-t-lg object-cover w-full h-40" />
                <div className="flex flex-col p-4 flex-1">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">{news.title}</h3>
                  <p className="text-gray-700 mb-4 flex-1">{news.desc}</p>
                  <a href={news.link} className="bg-blue-600 mt-auto hover:bg-blue-700 text-white text-sm px-4 py-2 rounded font-semibold w-max self-start">Lihat Selengkapnya</a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
      <div className="flex justify-end mt-4">
        <a href="/berita" className="text-blue-600 font-semibold hover:underline">Lihat Semua Berita</a>
      </div>
    </section>
  )
}
