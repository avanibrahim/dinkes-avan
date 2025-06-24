
type Props = {
  value: number;
};

export default function IndicatorLabel({ value }: Props) {
  let color = "";
  let label = "";
  if (value >= 30) {
    color = "bg-red-500";
    label = "Tinggi";
  } else if (value >= 20) {
    color = "bg-yellow-400";
    label = "Sedang";
  } else {
    color = "bg-green-500";
    label = "Rendah";
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${color} text-white`}>
      {label}
    </span>
  );
}
