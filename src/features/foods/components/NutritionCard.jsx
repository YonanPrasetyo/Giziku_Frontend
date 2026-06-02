export default function NutritionCard({ label, value, max, color, unit }) {
  const hasStandard = !!max;
  const percent = hasStandard ? (value / max) * 100 : 0;

  const colorMap = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{label}</h3>
        <span className="font-extrabold">
          {value} {unit}
        </span>
      </div>

      {/* JIKA ADA STANDARD */}
      {hasStandard && (
        <>
          <div className="text-sm text-gray-500 mt-1">
            {percent.toFixed(1)}% dari kebutuhan
          </div>

          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div
              className={`${colorMap[color]} h-2 rounded`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}