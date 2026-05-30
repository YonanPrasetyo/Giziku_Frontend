import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import {
  createMission,
  updateMission,
  getMissionById,
} from "../services/missionService";

export default function MissionForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    xp: "",
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    const fetchDetail = async () => {
      if (!isEdit) return;

      try {
        setLoading(true);

        const data = await getMissionById(id);

        setForm({
          title: data.data.title,
          description: data.data.description,
          xp: data.data.xp,
        });

      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateMission(id, form);
      } else {
        await createMission(form);
      }

      navigate("/admin/missions");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-6">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border">

            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit Misi" : "Tambah Misi"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Judul"
                className="w-full border p-3 rounded-lg"
                required
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="xp"
                value={form.xp}
                onChange={handleChange}
                placeholder="XP"
                className="w-full border p-3 rounded-lg"
                required
              />

              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold">
                Simpan
              </button>

            </form>

          </div>
        </main>
      </div>
    </div>
  );
}