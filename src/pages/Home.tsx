import NewsCarousel from "@/components/NewsCarousel";
import GallerySection from "@/components/GallerySection";
import DataPublicationSection from "@/components/DataPublicationSection";
import ContactSection from "@/components/ContactSection";
import TiltedCard from '@/components/TiltedCard';

const Home = () => (
  <>
    {/* Hero Section */}
    <section className="flex flex-col md:flex-row justify-between items-start gap-12 py-24 px-6 max-w-7xl mx-auto animate-fade-in">
    <div className="flex-1 flex flex-col justify-center items-start max-w-36rem">
        <span className="bg-tealCustomLight text-tealCustom px-3 py-1 rounded-full text-xs mb-5 font-semibold tracking-wider select-none">
          INFORMASI KESEHATAN
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-tealCustom leading-tight">
          Bersama Wujudkan Generasi Sehat <br className="hidden md:block" /> Cegah Stunting HIV dan DBD
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem temporibus quisquam vel, amet culpa, itaque officiis aliquam soluta quibusdam expedita voluptatibus qui cum natus ipsam dolor, odit nesciunt hic nulla.
        </p>
        <ul className="mb-10 space-y-4 w-full">
          <li className="flex items-start gap-4">
            <span className="block w-3 h-3 rounded-full bg-green-400 mt-2"></span>
            <span className="text-gray-700 leading-relaxed">
              Informasi & edukasi seputar pencegahan serta intervensi stunting anak.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="block w-3 h-3 rounded-full bg-sky-400 mt-2"></span>
            <span className="text-gray-700 leading-relaxed">
              Statistik & visualisasi data terkini tingkat stunting di berbagai daerah.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="block w-3 h-3 rounded-full bg-yellow-400 mt-2"></span>
            <span className="text-gray-700 leading-relaxed">
              Kolaborasi antara masyarakat, tenaga kesehatan, dan pemerintah daerah.
            </span>
          </li>
        </ul>
        <a
          href="/monitoring"
          className="inline-block bg-tealCustom hover:bg-tealCustomLighter text-white font-semibold rounded-lg px-8 py-3 shadow-md transition focus:outline-none focus:ring-4 focus:ring-tealCustomLight"
        >
          Lihat Data Monitoring
        </a>
      </div>

      {/* Bungkus TiltedCard dengan div untuk posisi naik di mobile */}
      <div className="relative -mt-8 md:mt-0 hidden md:flex justify-center md:justify-end items-start">
  <TiltedCard
    imageSrc="https://data.tangerangselatankota.go.id/uploads/group/2023-05-09-090514.181927dinkes.png"
    containerHeight="200px"      // ukuran diperbesar
    containerWidth="400px"
    imageHeight="auto"
    imageWidth="400px"
    rotateAmplitude={12}
    scaleOnHover={1.2}
    showMobileWarning={false}
    showTooltip={false}
    displayOverlayContent={true}
    
  />
</div>


    </section>

    {/* Section kedua: manfaat pencegahan */}
    <section className="max-w-7xl mx-auto px-6 py-16 animate-fade-in bg-tealCustomLight rounded-xl mb-12">
      <h2 className="text-3xl font-bold text-tealCustom mb-8 text-center">
        Mengapa Pencegahan Stunting Penting?
      </h2>
      <div className="flex flex-col md:flex-row gap-12 justify-between items-center max-w-5xl mx-auto">
        <div className="flex-1">
          <ul className="space-y-6 text-gray-800 text-lg leading-relaxed">
            <li>
              <span className="font-semibold text-tealCustom">Tumbuh Kembang Optimal:</span> Anak bebas stunting dapat tumbuh sehat secara fisik dan mental.
            </li>
            <li>
              <span className="font-semibold text-tealCustom">Daya Saing Masa Depan:</span> Generasi bebas stunting punya peluang belajar & kerja lebih baik.
            </li>
            <li>
              <span className="font-semibold text-tealCustom">Penurunan Beban Biaya Kesehatan:</span> Pencegahan dini menurunkan risiko penyakit kronis di masa depan.
            </li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Anak sehat dan ceria"
            className="w-full max-w-sm rounded-lg object-cover shadow-lg border border-gray-200"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    {/* Berita & Informasi */}
    <NewsCarousel />

    {/* Galeri Kegiatan */}
    <GallerySection />

    {/* Publikasi Data */}
    <DataPublicationSection />

    {/* Hubungi Kami */}
    <ContactSection />
  </>
);

export default Home;
