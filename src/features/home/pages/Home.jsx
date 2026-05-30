import { useState, useEffect } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import RankBar from "../components/RankBar";
import ProfileMissionCard from "../components/ProfileMissionCard";
import api from "../../../shared/utils/api";

export default function Home() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const [profiles, setProfiles] = useState([]);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  const xp = 250; // 🔥 sementara (nanti ambil dari user/profile)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 ambil missions
        const missionRes = await api.get("/user-missions");
        setProfiles(missionRes.data.data || []);

        // 🔥 ambil rank
        const rankRes = await api.get("/rank/xp");
        setRank(rankRes.data.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>

        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* 🔥 RANK */}
            <RankBar rank={rank} xp={xp} />

            {/* 🔥 LIST PROFILE */}
            {profiles.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada misi hari ini
              </div>
            ) : (
              profiles.map((item) => (
                <ProfileMissionCard
                  key={item.profile.id}
                  item={item}
                />
              ))
            )}

          </div>
        </main>

      </div>
    </div>
  );
}