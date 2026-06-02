export default function HistoryItem({ data }) {
  return (
    <div className="bg-white rounded-2xl border p-4 flex justify-between items-center">

      <div>
        <h3 className="font-bold">{data.name}</h3>
        <p className="text-xs text-gray-500">
          {new Date(data.date).toLocaleTimeString()}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-green-600">
          {data.calories} kkal
        </p>

        <div className="text-xs text-gray-400">
          P: {data.protein}g ·
          K: {data.carbohydrates}g ·
          L: {data.fat}g
        </div>
      </div>

    </div>
  );
}