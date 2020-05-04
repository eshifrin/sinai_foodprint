const { Router } = require("express");
const EmissionCalculator = require("./emission-calculator");
const Data = require("./data");

const router = Router();
const emissionCalculator = new EmissionCalculator({
  emissionsData: Data.EMISSION_PER_POUND,
  consumptionData: Data.WEEKLY_CONSUMPTION_DATA_POUNDS,
  annualEmissions: Data.US_EMISSION_KG_PER_YEAR,
});

router.get("/averages", async (req, res) => {
  try {
    const averages = await emissionCalculator.getAverages();
    res.json({ averages });
    return;
  } catch (e) {
    console.log("Error in calculate route", e);
    res.status(500);
    res.end();
  }
});

router.post("/calculate", async (req, res) => {
  if (!isCalculateRequestValid(req)) {
    console.log(req);
    res.status(404).end();
    return;
  }

  try {
    const { userConsumption } = req.body;
    const userEmissions = await emissionCalculator.calculateUserEmissions(
      userConsumption
    );

    res.json({ userEmissions });
    return;
  } catch (e) {
    console.log("Error in calculate route", e);
    res.status(500);
    res.end();
  }
});

const isCalculateRequestValid = (req) => {
  if (!req.body || !req.body.userConsumption) {
    return false;
  }

  const { userConsumption } = req.body;
  const expectedKeys = Object.keys(Data.EMISSION_PER_POUND);

  for (const k of expectedKeys) {
    const v = userConsumption[k];
    if (isNaN(v)) {
      return false;
    }
  }

  return true;
};

module.exports = router;
