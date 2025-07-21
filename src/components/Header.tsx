import { Search, User, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const keyword = search.trim().toLowerCase();

    // Normalisasi input
    if (keyword === "dbd") {
      navigate("/edukasi#dbd");
    } else if (keyword === "tbc") {
      navigate("/edukasi#tbc");
    } else if (keyword === "hiv" || keyword === "hiv aids" || keyword === "hiv/aids") {
      navigate("/edukasi#hiv");
    } else {
      alert("Silahkan mencari antara: TBC, DBD, atau HIV/AIDS");
    }
  };

  return (
    <header className="sticky top-0 mb-6 z-10 mt-4 sm:mt-0 pt-0">
      <div className="max-w-3xl mx-auto flex justify-between items-center bg-white rounded-2xl border shadow px-6 py-3">
        {/* Search Box with Icon */}
        <form className="relative flex-1 max-w-md" onSubmit={handleSearch}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Ketiga Penyakit..."
            className="w-full pl-10 pr-1 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring"
            value={search}
            onChange={e => setSearch(e.target.value)}
            maxLength={15}
            autoComplete="off"
          />
        </form>

        {/* Buttons */}
        <div className="flex items-center gap-4 ml-6">
          <button
            className="bg-teal-100 p-2 rounded-full"
            onClick={() => navigate("/tentang")}
          >
            <Info className="w-5 h-5 text-teal-600" />
          </button>
          <button
            className="bg-teal-100 p-2 rounded-full"
            onClick={() => navigate("/contact")}
          >
            <User className="w-5 h-5 text-teal-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
