import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import api from "../../../shared/utils/api";

import ProfileDropdown from "../components/ProfileDropdown";
import WelcomeStrip from "../components/WelcomeStrip";
import DailySummary from "../components/DailySummary";
import LatestMeals from "../components/LatestMeals";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [summary, setSummary] = useState(null);
  const [latestMeals, setLatestMeals] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await api.get("/profiles");
      setProfiles(res.data.data);
      setSelectedProfile(res.data.data[0]?.id);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (!selectedProfile) return;

    const fetchData = async () => {
      try {
        const [summaryRes, latestRes] = await Promise.all([
          api.get(`/results/profiles/${selectedProfile}/today`),
          api.get(`/results/profiles/${selectedProfile}/latest`),
        ]);

        setSummary(summaryRes.data.data);
        setLatestMeals(latestRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedProfile]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-5xl mx-auto space-y-6">

            <WelcomeStrip />

            <div>
              <ProfileDropdown
                profiles={profiles}
                selected={selectedProfile}
                onChange={setSelectedProfile}
              />
            </div>

            <DailySummary data={summary} />
            <LatestMeals meals={latestMeals} />
            
            {/* ACTION BUTTONS */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                onClick={() => navigate("/missions/history")}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
              >
                Histori
              </button>
              <button
                onClick={() => navigate("/add-food-photo")}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Tambah Foto Makanan
              </button>
            </div>


          </div>
        </main>
      </div>
    </div>
  );
}