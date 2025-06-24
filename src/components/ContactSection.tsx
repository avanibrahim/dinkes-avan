
export default function ContactSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
        Hubungi Kami
      </h2>
      <div className="bg-white rounded-lg shadow border flex flex-col md:flex-row gap-8 p-6">
        <div className="flex-[2]">
          <div className="mb-2">
            <span className="block font-semibold text-lg text-blue-700">Alamat:</span>
            <span className="text-gray-800">Jl. Kesehatan No. 123, Jakarta Pusat, DKI Jakarta, Indonesia</span>
          </div>
          <div className="mb-2">
            <span className="block font-semibold text-lg text-blue-700">Telepon:</span>
            <span className="text-gray-800">021-5555566</span>
          </div>
          <div>
            <span className="block font-semibold text-lg text-blue-700">Jam Pelayanan:</span>
            <span className="text-gray-800">Senin - Jumat, 08.00 - 16.00 WIB</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center border-l border-border pl-6">
          <svg className="w-20 h-20 text-blue-500" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" stroke="#2563eb" strokeWidth="2" fill="#e0e7ff"/>
            <path d="M32 20v-2a8 8 0 0 0-16 0v2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            <rect x="14" y="20" width="20" height="14" rx="5" fill="#fff" stroke="#60a5fa" strokeWidth="2"/>
            <circle cx="24" cy="27" r="3" fill="#60a5fa"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
