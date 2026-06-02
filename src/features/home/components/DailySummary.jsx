export default function DailySummary({ data, standard }) {
  if (!data || !standard) return null;

  const calcPercent = (value, max) => {
    if (!max) return 0;
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h2 className="font-bold text-lg">Ringkasan Harian</h2>
      </div>
      <div className="bg-white rounded-2xl p-5 border space-y-4">

        {/* 🔥 CALORIES */}
        <div>
          <div className="flex justify-between mb-1">
            <h3 className="font-bold">Kalori</h3>
            <span className="text-sm text-gray-500">
              {data.total_calories || 0} / {standard.calories} kkal
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded"
              style={{
                width: `${calcPercent(data.total_calories, standard.calories)}%`
              }}
            />
          </div>
        </div>

        {/* 🔥 PROTEIN */}
        <div>
          <div className="flex justify-between mb-1">
            <h3 className="font-bold">Protein</h3>
            <span className="text-sm text-gray-500">
              {data.total_protein || 0} / {standard.protein} g
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{
                width: `${calcPercent(data.total_protein, standard.protein)}%`
              }}
            />
          </div>
        </div>

        {/* 🔥 SUGAR */}
        <div>
          <div className="flex justify-between mb-1">
            <h3 className="font-bold">Gula</h3>
            <span className="text-sm text-gray-500">
              {data.total_sugar || 0} / {standard.sugar} g
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-red-500 h-2 rounded"
              style={{
                width: `${calcPercent(data.total_sugar, standard.sugar)}%`
              }}
            />
          </div>
        </div>

        {/* 🔥 NON-STANDARD (NO BAR) */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 text-center pt-2">

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

        </div>

      </div>
    </div>
  );
}