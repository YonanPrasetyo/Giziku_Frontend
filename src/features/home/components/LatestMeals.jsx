import MealCard from "./MealCard";

export default function LatestMeals({ meals }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <h2 className="font-bold text-lg">3 Porsi Terakhir</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.id} data={meal} />
        ))}
      </div>
    </div>
  );
}