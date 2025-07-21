import React from 'react';

const FooterWithWave: React.FC = () => (
  <footer className="relative bg-[#229b94] text-white pt-8">
  {/* 1. Gelombang di atas footer */}
  <div
      className="absolute top-0 left-0 w-full overflow-hidden"
      style={{ height: '2rem' }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        {/* Setengah lingkaran: bulge ke atas */}
        <path
          d="M0,100 C300,0 900,0 1200,100 L1200,0 L0,0 Z"
          fill="#faf9f6"
        />
      </svg>
    </div>

    <div className="max-w-7xl mx-auto pt-8 pb-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Location & Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Alamat :</h3>
          <p className="text-sm mb-3 leading-relaxed">
            Jalan Jamaludin Malik No.52, Kota Selatan, Limba U Dua,
            Gorontalo, Kota Gorontalo, Gorontalo 96138.
          </p>
          <div className="flex items-center gap-4 p-2">

            <div className="bg-gradient-to-br from-gray-500 to-teal-600 rounded-full p-2">
              {/* Location Icon */}
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-4.5 8-8.5 8-12a8 8 0 1 0-16 0c0 3.5 4 7.5 8 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-100 text-sm">Dinas Kesehatan Kota Gorontalo</div>
              <div className="text-xs text-gray-100">Jl. HB Jassin, Kota Gorontalo</div>
              <a
                href="https://www.google.com/maps?ll=0.549951,123.058127&z=15&t=m&hl=id&gl=ID&mapclient=embed&cid=9058961009444869506"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs font-semibold text-gray-100 underline hover:text-teal-600 transition"
              >
                Lihat di Google Maps
              </a>
            </div>
          </div>

        </div>

        {/* Column 2: Contact & Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kontak Penting</h3>
          <ul className="text-sm space-y-1 mb-4">
            <li>
              Call Center: <span className="font-semibold">1500-567</span>
            </li>
            <li>
              Darurat: <span className="font-semibold">119</span>
            </li>
            <li>Email: info@dinkesgtlo.go.id</li>
            <li>Hotline: (021) 521-0411</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">
            Tautan Terkait
          </h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <a 
            className='text-gray-100 hover:text-gray-600 transition border-b'
            href="/tentang">Tentang
            </a>
            <a
              className='text-gray-100 hover:text-gray-600 transition border-b'
              href="https://sehatnegeriku.kemkes.go.id/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kemenkes
            </a>
            <a
              className='text-gray-100 hover:text-gray-600 transition border-b'
              href="https://www.who.int"
              target="_blank"
              rel="noopener noreferrer"
            >
              WHO
            </a>
          </div>
        </div>

        {/* Column 3: Social Media & Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
          <div className="flex gap-4 mb-4">
            {[
              {
                name: 'Facebook',
                icon: 'https://images.icon-icons.com/134/PNG/512/facebook_socialnetwork_20691.png',
                url: '#',
              },
              {
                name: 'Twitter',
                icon: 'https://images.icon-icons.com/134/PNG/512/twitter_socialnetwork_20703.png',
                url: '#',
              },
              {
                name: 'Instagram',
                icon: 'https://images.icon-icons.com/134/PNG/512/instagram_socialnetwork_20686.png',
                url: '#',
              },
              {
                name: 'Email',
                icon: 'https://images.icon-icons.com/134/PNG/96/email_socialnetwork_20692.png',
                url: '#',
              },
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-6 h-6 object-contain hover:opacity-80 transition"
                />
              </a>
            ))}
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-1">Jam Layanan</h3>
          <p className="text-sm">
            Senin - Jumat, 08.00 - 16.00 WIB
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 pt-5 border-t border-white/100 text-center text-xs">
        © {new Date().getFullYear()} Dinas Kesehatan Kota Gorontalo. Semua hak cipta
        dilindungi undang-undang.
      </div>
    </div>
  </footer>
);

export default FooterWithWave;
