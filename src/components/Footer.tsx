const Footer = () => (
  <footer className="bg-[#229b94] border-t border-white text-white">
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Kolom 1: Lokasi & Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Alamat :</h3>
          <p className="text-sm mb-3 leading-relaxed">
          Jalan Jamaludin Malik No.52, Kota Selatan, Limba U Dua, Gorontalo, Kota Gorontalo, Gorontalo 96138
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4124.700282530758!2d123.05812650000001!3d0.5499508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792b3fb13f6fed%3A0x7db7e50aaa135582!2sDinas%20Kesehatan%20Kota%20Gorontalo!5e1!3m2!1sid!2sid!4v1750848918433!5m2!1sid!2sid"
            width="100%"
            height="140"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="rounded-lg shadow"
          ></iframe>
        </div>

        {/* Kolom 2: Kontak & Tautan */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kontak Penting</h3>
          <ul className="text-sm space-y-1 mb-4">
            <li>Call Center: <span className="font-semibold">1500-567</span></li>
            <li>Darurat: <span className="font-semibold">119</span></li>
            <li>Email: info@dinkesgtlo.go.id</li>
            <li>Hotline: (021) 521-0411</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Tautan Terkait</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/tentang">Tentang</a>
            <a href="https://sehatnegeriku.kemkes.go.id/" target="_blank" rel="noopener noreferrer">Kemenkes</a>
            <a href="https://www.who.int/id" target="_blank" rel="noopener noreferrer">WHO</a>
          </div>
        </div>

        {/* Kolom 3: Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Media Sosial</h3>
          <div className="flex gap-4 mb-3">
            {[
              { name: "Facebook", icon: "https://images.icon-icons.com/134/PNG/512/facebook_socialnetwork_20691.png", url: "#" },
              { name: "Twitter", icon: "https://images.icon-icons.com/134/PNG/512/twitter_socialnetwork_20703.png", url: "#" },
              { name: "Instagram", icon: "https://images.icon-icons.com/134/PNG/512/instagram_socialnetwork_20686.png", url: "#" },
              { name: "YouTube", icon: "https://images.icon-icons.com/134/PNG/512/youtube_socialnetwork_20660.png", url: "#" },
            ].map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-6 h-6 object-contain hover:opacity-80 transition"
                />
              </a>
            ))}
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-1">Jam Layanan</h3>
          <p className="text-sm">Senin - Jumat, 08.00 - 16.00 WIB</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-5 border-t border-white/30 text-center text-xs text-white">
        © {new Date().getFullYear()} Dinas Kesehatan Kota Gorontalo. Semua hak cipta dilindungi undang-undang.
      </div>
    </div>
  </footer>
);

export default Footer;
