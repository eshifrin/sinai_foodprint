import React, { useEffect, useState } from "react";
import "./App.css";
import { Divider, Layout } from "antd";
import Api from "./Api";
import { Categories } from "../../shared/constants";
import FoodCategory from "./components/FoodCategory";
import EmissionsChart from "./components/EmissionsChart";

import logo from "./SINAI_logo.webp";

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
    Api.getAverages().then((data) => {
      const { annualEmissions, consumptionData } = data;

      setWeeklyAvgConsumption(consumptionData);
      setWeeklyUserConsumption(consumptionData);
      setAnnualAvgEmissions(annualEmissions);
      setAnnualUserEmissions(annualEmissions);
    });
  }, []);

  const CategoryOrder = [
    Categories.BEEF,
    Categories.CHICKEN,
    Categories.PORK,
    Categories.FISH,
    Categories.EGGS,
    Categories.VEGETABLES,
    Categories.FRUITS,
    Categories.MILK,
    Categories.CHEESE,
    Categories.RICE,
    Categories.COFFEE,
    Categories.POTATOES,
    Categories.CHOCOLATE,
    Categories.WHEAT,
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

  if (!Object.keys(annualUserEmissions).length) {
    return null;
  }

  return (
    <div className="App">
      <Layout>
        <Header style={{ backgroundColor: "rgb(240, 240, 215)" }}>
          <img src={logo} />
        </Header>
        <Content prefixCls={"content"}>
          <div className="apptitle">Food Footprint</div>
          <div className="explanation">
            Calculate the carbon footprint from your consumption of food
          </div>
          <div className="main">
            <div className="description">
              Description of how food impacts etc Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </div>
            <Divider style={{ backgroundColor: "lightgrey" }} />
            <div className="data-container">
              <div className="categoryinputs">
                <div className="description">
                  For each category, please estimate the
                  <span className="pounds"> pounds </span>
                  you consume per <span className="week"> week.</span> The
                  values are defaulted to averages in America. Click on the
                  tooltips for additional guidance.
                </div>
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
              </div>

              <EmissionsChart
                order={CategoryOrder}
                average={annualAvgEmissions}
                user={annualUserEmissions}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
