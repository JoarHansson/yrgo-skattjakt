import type { Units } from "@turf/turf";

export type distanceConfigType = {
  number: number;
  unit: Units;
};

// change distance here if needed
export const distanceConfig: distanceConfigType = {
  number: 50,
  unit: "meters",
};
