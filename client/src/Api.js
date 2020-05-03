import axios from "axios";

class Api {
  static AVERAGES_ROUTE = "/api/averages";
  static CALCULATE_ROUTE = "/api/calculate";

  static getAverages = async () => {
    const { data } = await axios(Api.AVERAGES_ROUTE);
    return data.averages;
  };

  static calculate = async (userConsumption) => {
    const { data } = await axios.post(Api.CALCULATE_ROUTE, {
      userConsumption,
    });

    return data.userEmissions;
  };
}

export default Api;
