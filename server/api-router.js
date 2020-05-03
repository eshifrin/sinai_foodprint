const { Router } = require("express");
const EmissionCalculator = require("./emission-calculator");
const Data = require("./data");

const router = Router();
const emissionCalculator = new EmissionCalculator({
  emissionsData: Data.EMISSION_BY_CATEGORY,
  consumptionData: Data.WEEKLY_CONSUMPTION_DATA_POUNDS,
  usData: Data.US_EMISSION_KG_PER_YEAR,
});

router.get("/averages", async (req, res) => {
  const averages = await emissionCalculator.getAverages();
  res.json({ averages });
});

router.post("/calculate", async (req, res) => {
  if (!isCalculateRequestValid(req)) {
    res.status(404).end();
    return;
  }

  const { userConsumption } = req.body;
  const userEmissions = await emissionCalculator.calculateUserEmissions(
    userConsumption
  );

  res.json({ userEmissions });
});

const isCalculateRequestValid = (req) => {
  if (!req.body || !req.body.userConsumption) {
    return false;
  }

  const { userConsumption } = req.body;

  const expectedKeys = Object.keys(EMISSION_BY_CATEGORY);

  for (const k of expectedKeys) {
    const v = userConsumption[k];
    if (isNaN(v)) {
      return false;
    }
  }

  return true;
};

module.exports = router;
