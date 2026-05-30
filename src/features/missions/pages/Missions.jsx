import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import MissionCard from "../components/MissionCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserMissions } from "../services/missionService";

export default function Missions() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserMissions();
        setProfiles(res.data || []);
      } catch (err) {
        console.error("Error fetch missions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-5">Loading missions...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>

        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* LOOP PROFILE */}
            {profiles.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada misi hari ini
              </div>
            ) : (
              profiles.map((item) => (
                <div
                  key={item.profile.id}
                  className="bg-white rounded-xl border shadow-sm p-5 space-y-4"
                >

                  {/* 🔥 HEADER PROFILE */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">
                      {item.profile.name}
                    </h2>

                    <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold">
                      3 Misi
                    </span>
                  </div>

                  {/* 🔥 LIST MISI */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {item.missions.map((mission) => (
                      <MissionCard key={mission.id} data={mission} />
                    ))}
                  </div>

                  {/* 🔥 BUTTON PER PROFILE */}
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        navigate(`/missions/upload?profileId=${item.profile.id}`)
                      }
                      className="w-full h-11 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                      Selesaikan Misi {item.profile.name}
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>
        </main>

      </div>
    </div>
  );
}