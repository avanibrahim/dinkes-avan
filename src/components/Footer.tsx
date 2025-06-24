
const Footer = () => (
  <footer className="bg-blue-50 border-t border-blue-100 mt-12 text-[15px]">
    <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="font-semibold text-blue-700 tracking-wide text-center md:text-left">
        © {new Date().getFullYear()} Sistem Informasi Pemantauan Stunting. <br className="block md:hidden"/> Semua hak cipta dilindungi undang-undang.
      </div>
      <div className="flex gap-4 text-blue-500 mt-2 md:mt-0 text-sm">
        <a href="https://sehatnegeriku.kemkes.go.id/" className="hover:underline" target="_blank" rel="noopener noreferrer">Kemenkes RI</a>
        <a href="https://www.who.int/id" className="hover:underline" target="_blank" rel="noopener noreferrer">WHO Indonesia</a>
        <a href="/tentang" className="hover:underline">Tentang</a>
      </div>
    </div>
  </footer>
);

export default Footer;
