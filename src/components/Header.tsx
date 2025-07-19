import { Bell, Settings, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky mb-6 z-10 pt-2">
  <div className="max-w-3xl mx-auto flex justify-between items-center bg-white rounded-2xl border shadow px-6 py-3">
    {/* Search Box with Icon */}
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search Here"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring"
      />
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-4 ml-6">
      <button className="bg-teal-100 p-2 rounded-full">
        <Settings className="w-5 h-5 text-teal-600" />
      </button>
      <button className="bg-teal-100 p-2 rounded-full">
        <Bell className="w-5 h-5 text-teal-600" />
      </button>
    </div>
  </div>
</header>
  );
};

export default Header;
