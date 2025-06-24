
import { ChevronDown } from "lucide-react";

type Props = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export default function FilterDropdown({ options, value, onChange }: Props) {
  return (
    <div className="relative inline-block w-56">
      <button
        className="w-full px-4 py-2 border rounded bg-white shadow text-left font-semibold flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => {}}
        tabIndex={-1}
        disabled
      >
        {value}
        <ChevronDown className="ml-2 w-4 h-4"/>
      </button>
      {/* Option dropdown dummy, bisa diubah ke select jika ingin bisa diganti */}
    </div>
  );
}
