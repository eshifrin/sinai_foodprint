import React, { useEffect, useState } from "react";
import { Tooltip, InputNumber } from "antd";

function FoodCategory({
  category,
  onConsumptionChange,
  weeklyAverage,
  userValue,
}) {
  const calculate = () => {
    const percentdiff = Math.round(
      ((userValue - weeklyAverage) / weeklyAverage) * 100
    );
    return `${percentdiff}% different`;
  };

  return (
    <div className="food-category container">
      <div className="header">
        <div className="title">{category}</div>
        <Tooltip title={"statically derived"} placement="topLeft" />
      </div>
      <div className="content">
        <div className="inputsection">
          <InputNumber
            onChange={onConsumptionChange}
            value={userValue}
            precision={2}
            defaultValue={weeklyAverage}
            size="large"
          />
          <div className="description"></div>
        </div>
        <div className="averagecomparison">{calculate()}</div>
      </div>
    </div>
  );
}

export default FoodCategory;
