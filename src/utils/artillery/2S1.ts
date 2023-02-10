import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_3OF56, Shell_3BK13 } from "../shells";

export const Arty_2S1: Artillery = {
  Name: "2S1",
  simulationStep: 0.05,
  minAngle: 1,
  maxAngle: 70,
  fireModes: [
    {
      name: "Full Charge",
      artilleryCharge: 0.564,
    },
    {
      name: "Reduced Charge",
      artilleryCharge: 0.5,
    },
    {
      name: "Charge 1",
      artilleryCharge: 0.44,
    },
    {
      name: "Charge 2",
      artilleryCharge: 0.39,
    },
    {
      name: "Charge 3",
      artilleryCharge: 0.32,
    },
    {
      name: "Charge 4",
      artilleryCharge: 0.26,
    },
  ],
  shellTypes: [Shell_3OF56, Shell_3BK13],
  isAirFriction: false,
  angleAdjustment: -0.14,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, 0, 0);
  },
};
