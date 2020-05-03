class EmissionCalculator {
  static LBS_PER_KG = 2.2;
  static WEEKS_PER_YEAR = 52;

  constructor({ emissionsData, consumptionData, annualEmissions }) {
    this.emissionData = emissionsData; // annual by category emission
    this.annualEmissions = annualEmissions;
    this.consumptionData = consumptionData;
  }

  getAverages = () => {
    return Promise.resolve({
      annualEmissions: this.annualEmissions,
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
        return obj;
      },
      {}
    );

    return Promise.resolve(annualized);
  };
}

module.exports = EmissionCalculator;
