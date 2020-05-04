import React from "react";
import { Tooltip, InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Categories } from "../../../shared/constants";

const GuidanceText = {
  [Categories.BEEF]:
    "The average burger is .25 pounds, the average steak half a pound.  Use this category for lamb as well.",
  [Categories.CHICKEN]: "Info for chicken",
  [Categories.PORK]: "Info for pork",
  [Categories.FISH]: "Info for fish",
  [Categories.EGGS]: "Info for eggs",
  [Categories.VEGETABLES]: "Info for vegetables",
  [Categories.FRUITS]: "Info for fruits",
  [Categories.MILK]: "Info for milk",
  [Categories.CHEESE]: "Info for cheese",
  [Categories.RICE]: "Info for rice",
  [Categories.COFFEE]: "Info for coffee",
  [Categories.POTATOES]: "info for potatoes, FRIES!",
  [Categories.CHOCOLATE]: "Info for chocolate",
  [Categories.WHEAT]: "Info for wheat",
};

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

  // InputNumber will be buggy and send back "." as it's being typed
  const cb = (v) =>
    isNaN(v) ? onConsumptionChange(0) : onConsumptionChange(v);

  return (
    <div className="food-category">
      <div className="title-container">
        <div className="title">{category.toLowerCase()}</div>
        <Tooltip title={GuidanceText[category]} placement="right">
          <InfoCircleOutlined />
        </Tooltip>
      </div>

      <div className="inputcontainer">
        <InputNumber
          onChange={cb}
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
