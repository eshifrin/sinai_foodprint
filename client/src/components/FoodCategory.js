import React from "react";
import { Tooltip, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

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

    if (!percentdiff) {
      return "Same as average";
    } else if (percentdiff > 0) {
      return `${percentdiff}% more than average`;
    }

    return `${Math.abs(percentdiff)}% less than average `;
  };

  return (
    <div className="food-category">
      <div className="title-container">
        <div className="title">{category.toLowerCase()}</div>
        <Tooltip title={category} placement="right">
          <InfoCircleOutlined />
        </Tooltip>
      </div>

      <div className="inputcontainer">
        <InputNumber
          onChange={onConsumptionChange}
          value={userValue}
          precision={2}
          defaultValue={weeklyAverage}
          size="large"
          min={0}
          max={10}
          style={{
            backgroundColor: "rgb(240, 240, 215)",
          }}
        />
      </div>

      <div className="change">{calculate()}</div>
    </div>
  );
}

export default FoodCategory;
