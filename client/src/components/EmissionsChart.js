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
    category: category,
    user: user[category],
    avg: average[category],
  }));

  data.push({
    category: "Total",
    user: totalUser,
    avg: totalAverage,
  });

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="user" fill="#8884d8" background={{ fill: "#eee" }} />
      <Bar dataKey="avg" fill="#82ca9d" />
    </BarChart>
  );
}

export default EmissionsChart;
