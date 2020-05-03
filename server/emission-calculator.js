class EmissionCalculator {
  static LBS_PER_KG = 2.2;
  static WEEKS_PER_YEAR = 52;

  constructor({ emissionsData, consumptionData, usData }) {
    this.emissionData = emissionsData; // annual by category emission
    this.usData = usData;
    this.consumptionData = consumptionData;
  }

  getAverages = () => {
    return Promise.resolve({
      usData: this.usData,
      consumptionData: this.consumptionData,
    });
  };

  calculateUserEmissions = (userEmissions) => {
    const annualized = Object.keys(this.emissionData).reduce(
      (obj, category) => {
        const emission = Math.round(
          userEmissions[category] *
            EmissionCalculator.WEEKS_PER_YEAR *
            this.emissionData[category],
          0
        );
        obj[category] = emission;
        obj.TOTAL += emission;
        return obj;
      },
      { TOTAL: 0 }
    );

    return Promise.resolve(annualized);
  };
}

module.exports = EmissionCalculator;
