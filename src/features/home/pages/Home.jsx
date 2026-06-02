import { useEffect, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import api from "../../../shared/utils/api";

import ProfileDropdown from "../components/ProfileDropdown";
import WelcomeStrip from "../components/WelcomeStrip";
import DailySummary from "../components/DailySummary";
import LatestMeals from "../components/LatestMeals";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [summary, setSummary] = useState(null);
  const [latestMeals, setLatestMeals] = useState([]);

  // FETCH PROFILES
  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await api.get("/profiles");
      setProfiles(res.data.data);
      setSelectedProfile(res.data.data[0]?.id);
    };
    fetchProfiles();
  }, []);

  // FETCH DATA BERDASARKAN PROFILE
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

            {/* 🔥 PROFILE DROPDOWN (FIX DI SINI) */}
            <div className="flex justify-end">
              <ProfileDropdown
                profiles={profiles}
                selected={selectedProfile}
                onChange={setSelectedProfile}
              />
            </div>

            {/* CONTENT */}
            <WelcomeStrip />
            <DailySummary data={summary} />
            <LatestMeals meals={latestMeals} />

          </div>
        </main>
      </div>
    </div>
  );
}