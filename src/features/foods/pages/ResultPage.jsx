import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";

import FoodIdentityCard from "../components/FoodIdentityCard";
import EnergyHero from "../components/EnergyHero";
import NutritionCard from "../components/NutritionCard";
import SummaryTable from "../components/SummaryTable";
import DailyContribution from "../components/DailyContribution";
import BottomActions from "../components/BottomActions";

import { getResultById, getNutritionStandard } from "../services/resultService";

export default function ResultPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [result, setResult] = useState(null);
  const [standard, setStandard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getResultById(id, token);
      setResult(res);

      console.log("Result:", res);

      const std = await getNutritionStandard(res.age, res.gender, token);
      setStandard(std);
    };

    fetchData();
  }, [id]);

  if (!result || !standard) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100">
        <Header />

        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
          <FoodIdentityCard data={result} />
          <EnergyHero data={result} standard={standard} />

          <div>
            <h2 className="font-bold text-lg mb-2">Rincian Nutrisi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NutritionCard
                label="Protein"
                value={result.protein}
                max={standard.protein}
                color="blue"
                unit="g"
              />
              <NutritionCard
                label="Gula"
                value={result.sugar}
                max={standard.sugar}
                color="red"
                unit="g"
              />
              <NutritionCard
                label="Lemak"
                value={result.fat}
                max={standard.fat}
                color="purple"
                unit="g"
              />
              <NutritionCard
                label="Karbohidrat"
                value={result.carbohydrates}
                max={standard.carbohydrates}
                color="yellow"
                unit="g"
              />
            </div>
          </div>

          <SummaryTable result={result} standard={standard} />
          <DailyContribution result={result} standard={standard} />

          <div className="h-24" />
        </div>

        <BottomActions />
      </div>
    </div>
  );
}