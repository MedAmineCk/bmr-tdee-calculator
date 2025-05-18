import React, { useState } from "react";

const activityLevels = [
  { label: "Sedentary (little or no exercise)", value: 1.2 },
  { label: "Light (1-3 days/week)", value: 1.375 },
  { label: "Moderate (3-5 days/week)", value: 1.55 },
  { label: "Active (6-7 days/week)", value: 1.725 },
];

const goals = [
  { label: "Lose Weight", value: 1 },
  { label: "Maintain Weight", value: 2 },
  { label: "Gain Weight", value: 3 },
];

export default function BmrTdeeCalculator() {
  const [weight, setWeight] = useState(104);
  const [height, setHeight] = useState(180);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState(2);

  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const tdee = bmr * activity;

  const calories = goal === 1 ? tdee - 500 : goal === 3 ? tdee + 500 : tdee;

  const proteinGrams = weight * 2;
  const fatCalories = calories * 0.25;
  const fatGrams = fatCalories / 9;
  const carbCalories = calories - (proteinGrams * 4 + fatCalories);
  const carbGrams = carbCalories / 4;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
        BMR & TDEE Calculator
      </h1>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Weight */}
        <label className="flex flex-col text-gray-700">
          Weight (kg)
          <input
            type="number"
            min="1"
            className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}
          />
        </label>

        {/* Height */}
        <label className="flex flex-col text-gray-700">
          Height (cm)
          <input
            type="number"
            min="1"
            className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
          />
        </label>

        {/* Age */}
        <label className="flex flex-col text-gray-700">
          Age (years)
          <input
            type="number"
            min="1"
            className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={age}
            onChange={(e) => setAge(+e.target.value)}
          />
        </label>

        {/* Gender */}
        <label className="flex flex-col text-gray-700">
          Gender
          <select
            className="mt-1 p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {/* Activity Level */}
        <label className="flex flex-col text-gray-700 sm:col-span-2">
          Activity Level
          <select
            className="mt-1 p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={activity}
            onChange={(e) => setActivity(+e.target.value)}
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </label>

        {/* Goal */}
        <label className="flex flex-col text-gray-700 sm:col-span-2">
          Goal
          <select
            className="mt-1 p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={goal}
            onChange={(e) => setGoal(+e.target.value)}
          >
            {goals.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
      </form>

      {/* Results */}
      <div className="mt-10 bg-indigo-50 rounded-lg p-6 text-indigo-900 shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 border-b border-indigo-300 pb-2">
          Results
        </h2>
        <ul className="space-y-2 text-lg">
          <li>
            <strong>BMR:</strong> {bmr.toFixed(0)} kcal/day
          </li>
          <li>
            <strong>TDEE:</strong> {tdee.toFixed(0)} kcal/day
          </li>
          <li>
            <strong>Calories (goal adjusted):</strong> {calories.toFixed(0)}{" "}
            kcal/day
          </li>
          <li>
            <strong>Protein:</strong> {proteinGrams.toFixed(0)} g
          </li>
          <li>
            <strong>Fat:</strong> {fatGrams.toFixed(0)} g
          </li>
          <li>
            <strong>Carbs:</strong> {carbGrams.toFixed(0)} g
          </li>
        </ul>
      </div>
    </div>
  );
}
