export default function EnergyHero({ data, standard }) {
  const percent = (data.calories / standard.calories) * 100;

  return (
    <div className="bg-white rounded-2xl border p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">Energi</h2>
        <span className="text-2xl font-extrabold text-orange-500">
          {data.calories} kkal
        </span>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {percent.toFixed(1)}% dari kebutuhan harian
      </div>

      <div className="w-full bg-gray-200 h-2 rounded mt-2">
        <div
          className="bg-orange-500 h-2 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}