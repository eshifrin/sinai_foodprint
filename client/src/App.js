import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "antd";
import Api from "./Api";
import { Categories } from "../../shared/constants";
import FoodCategory from "./components/FoodCategory";

const { Header, Content } = Layout;

function App() {
  /*
    all of the shape [category] : number
   */

  const [weeklyUserConsumption, setWeeklyUserConsumption] = useState({});
  const [weeklyAvgConsumption, setWeeklyAvgConsumption] = useState({});
  const [annualUserEmissions, setAnnualUserEmissions] = useState({});
  const [annualAvgEmissions, setAnnualAvgEmissions] = useState({});

  useEffect(() => {
    debugger;
    Api.getAverages().then((data) => {
      const { annualEmissions, consumptionData } = data;

      setWeeklyAvgConsumption(consumptionData);
      setWeeklyUserConsumption(consumptionData);
      setAnnualAvgEmissions(annualEmissions);
      setAnnualUserEmissions(annualEmissions);
    });
  }, []);

  const CategoryOrder = [
    [Categories.BEEF],
    [Categories.CHICKEN],
    [Categories.PORK],
    [Categories.FISH],
    [Categories.EGGS],
    [Categories.VEGETABLES],
    [Categories.FRUITS],
    [Categories.MILK],
    [Categories.CHEESE],
    [Categories.RICE],
    [Categories.COFFEE],
    [Categories.POTATOES],
    [Categories.CHOCOLATE],
    [Categories.WHEAT],
  ];

  const changeUserConsumptionValue = (category) => (v) => {
    const newWeeklyUserConsumption = {
      ...weeklyUserConsumption,
      [category]: v,
    };

    setWeeklyUserConsumption(newWeeklyUserConsumption);

    Api.calculate(newWeeklyUserConsumption).then((newUserEmissions) => {
      setAnnualUserEmissions(newUserEmissions);
    });
  };

  return (
    <div className="App">
      <Layout>
        <Header>header</Header>
        <Content>
          {CategoryOrder.map((category) => {
            return (
              <FoodCategory
                key={category}
                category={category}
                onConsumptionChange={changeUserConsumptionValue(category)}
                userValue={weeklyUserConsumption[category]}
                weeklyAverage={weeklyAvgConsumption[category]}
              />
            );
          })}
          <pre>{JSON.stringify(annualUserEmissions)}</pre>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
