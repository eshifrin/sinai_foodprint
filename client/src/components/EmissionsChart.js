import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function EmissionsChart({ order, user, average }) {
  if (!Object.values(user).length) {
    return null;
  }

  const totalUser = Object.values(user).reduce((a, b) => a + b);
  const totalAverage = Object.values(average).reduce((a, b) => a + b);

  const categoryName = (title) => {
    return title.slice(0, 1) + title.slice(1).toLowerCase();
  };

  const data = order.map((category) => ({
    category: categoryName(category),
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
      <div className="title">
        Annual Emissions (CO2kge) <br /> by Category
      </div>
      <div className="chart">
        <ResponsiveContainer>
          <BarChart
            layout={"vertical"}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="user" fill="#a6ad58"></Bar>
            <Bar dataKey="avg" fill="#82ca9d"></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmissionsChart;
