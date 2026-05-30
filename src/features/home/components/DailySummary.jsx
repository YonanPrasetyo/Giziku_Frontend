export default function DailySummary() {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border">
      
      <div className="flex justify-between mb-3">
        <span className="font-bold">Total Kalori</span>
        <span className="text-xs bg-green-100 text-green-700 px-2 rounded-full">
          Hari ini
        </span>
      </div>

      <div className="flex items-end gap-1 mb-3">
        <span className="text-2xl sm:text-3xl font-extrabold">1340</span>
        <span className="text-sm text-gray-500">kkal</span>
        <span className="text-sm text-gray-400">/ 2000</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded mb-4">
        <div className="bg-green-500 h-2 rounded w-[67%]"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <Macro label="Protein" value="52g" color="text-blue-500" />
        <Macro label="Karbo" value="168g" color="text-yellow-500" />
        <Macro label="Lemak" value="38g" color="text-purple-500" />
        <Macro label="Serat" value="12g" color="text-green-500" />
      </div>
    </div>
  );
}

function Macro({ label, value, color }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <p className={`font-bold ${color}`}>{value}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}