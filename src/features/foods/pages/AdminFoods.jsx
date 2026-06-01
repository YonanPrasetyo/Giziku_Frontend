import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFoods, deleteFood } from "../services/foodService";

export default function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const data = await getFoods();
      setFoods(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus food?")) return;

    try {
      await deleteFood(id);
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold">Kelola Foods</h1>
                <p className="text-sm text-gray-500">Tambahkan, edit, atau hapus data food.</p>
              </div>

              <button
                onClick={() => navigate("/admin/foods/create")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                + Tambah Food
              </button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {foods.length === 0 ? (
                <div className="p-5 text-center text-gray-500">Tidak ada data food</div>
              ) : (
                foods.map((food) => (
                  <div key={food.id} className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[1fr_auto] border-b last:border-b-0">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-lg font-semibold">{food.name}</span>
                        <span className="text-xs uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{food.category}</span>
                      </div>
                      <p className="text-sm text-gray-600">Porsi: {food.portionSize}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                        <span>Kalori: {food.calories}</span>
                        <span>Protein: {food.protein}</span>
                        <span>Gula: {food.sugar}</span>
                        <span>Karbohidrat: {food.carbohydrates}</span>
                        <span>Lemak: {food.fat}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                      <button
                        onClick={() => navigate(`/admin/foods/edit/${food.id}`)}
                        className="px-3 py-2 text-sm bg-yellow-400 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="px-3 py-2 text-sm bg-red-500 text-white rounded-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
