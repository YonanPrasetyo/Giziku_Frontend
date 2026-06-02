export default function FoodIdentityCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">

      {/* ✅ IMAGE HEADER (TERKONTROL) */}
      <div className="w-full h-48 md:h-56 bg-gray-100">
        <img
          src={data.image_url}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ✅ CONTENT */}
      <div className="bg-green-500 text-white p-4 flex gap-4">
        <div>
          <p className="text-xs opacity-80">Makanan Terdeteksi</p>
          <h1 className="text-xl font-extrabold">{data.name}</h1>
        </div>
      </div>

      {/* ✅ META */}
      <div className="grid grid-cols-2 md:grid-cols-4 text-center text-sm border-t">
        <div className="p-2">
          <p className="text-gray-400">Porsi</p>
          <p className="font-bold">1</p>
        </div>
        <div className="p-2">
          <p className="text-gray-400">Untuk</p>
          <p className="font-bold">{data.profile_name}</p>
        </div>
        <div className="p-2">
          <p className="text-gray-400">Tanggal</p>
          <p className="font-bold">
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>
        <div className="p-2">
          <p className="text-gray-400">Waktu</p>
          <p className="font-bold">
            {new Date(data.date).toLocaleTimeString()}
          </p>
        </div>
      </div>

    </div>
  );
}