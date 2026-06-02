export default function DailySummary({ data }) {
  if (!data) return null;

  const percent = (data.total_calories / 2000) * 100;

  return (
    <div className="bg-white rounded-2xl p-5 border">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Total Kalori</h3>
        <span className="text-sm text-green-600 font-semibold">
          Hari ini
        </span>
      </div>

      <div className="text-3xl font-extrabold">
        {data.total_calories || 0} kkal
      </div>

      <div className="text-sm text-gray-500 mb-2">
        / 2000 kkal
      </div>

      {/* PROGRESS */}
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-green-500 h-2 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* MACRO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-center">
        <div>
          <p className="font-bold text-blue-500">
            {data.total_protein || 0}g
          </p>
          <p className="text-xs text-gray-500">Protein</p>
        </div>
        <div>
          <p className="font-bold text-yellow-500">
            {data.total_carbohydrates || 0}g
          </p>
          <p className="text-xs text-gray-500">Karbo</p>
        </div>
        <div>
          <p className="font-bold text-purple-500">
            {data.total_fat || 0}g
          </p>
          <p className="text-xs text-gray-500">Lemak</p>
        </div>
        <div>
          <p className="font-bold text-red-500">
            {data.total_sugar || 0}g
          </p>
          <p className="text-xs text-gray-500">Gula</p>
        </div>
      </div>
    </div>
  );
}