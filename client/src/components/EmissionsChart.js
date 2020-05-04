import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function EmissionsChart({ order, user, average }) {
  if (!Object.values(user).length) {
    return null;
  }

  const totalUser = Object.values(user).reduce((a, b) => a + b);
  const totalAverage = Object.values(average).reduce((a, b) => a + b);

  const data = order.map((category) => ({
    category: category.slice(0, 1) + category.slice(1).toLowerCase(),
    user: user[category],
    avg: average[category],
  }));

  data.push({
    category: "Total",
    user: totalUser,
    avg: totalAverage,
  });

  return (
    <div className="emissions-chart">
      <div className="title">Annual Emissions (CO2kge) by Category</div>
      <BarChart
        layout={"vertical"}
        width={500}
        height={800}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="user" fill="#a6ad58" />
        <Bar dataKey="avg" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default EmissionsChart;
