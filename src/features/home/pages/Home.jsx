import { useState } from "react";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import WelcomeStrip from "../components/WelcomeStrip";
import DailySummary from "../components/DailySummary";
import PorsiCard from "../components/PorsiCard";

export default function Home() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* CONTENT */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300
        ${isOpen ? "lg:ml-64" : "ml-0"}
      `}
      >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          <div className="max-w-5xl mx-auto">

            <WelcomeStrip />

            <div className="mt-6 space-y-6">

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Ringkasan Hari Ini</h2>
                <span className="text-green-600 text-sm font-semibold">
                  Lihat Detail
                </span>
              </div>

              <DailySummary />

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">3 Porsi Terakhir</h2>
                <span className="text-green-600 text-sm font-semibold">
                  Semua riwayat
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <PorsiCard />
                <PorsiCard />
                <PorsiCard />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 h-12 bg-green-500 text-white rounded-xl font-bold">
                  Tambah Porsi
                </button>

                <button className="flex-1 h-12 border border-green-500 text-green-600 rounded-xl font-semibold">
                  Lihat Riwayat
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}