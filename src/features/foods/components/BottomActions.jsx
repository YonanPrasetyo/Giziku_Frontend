export default function BottomActions() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-2">
      <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold">
        Simpan ke Jurnal
      </button>

      <button className="w-full border py-2 rounded-xl text-gray-600">
        Input Ulang
      </button>
    </div>
  );
}