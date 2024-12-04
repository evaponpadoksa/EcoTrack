import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
* carbonFootprintStorage - it's a key-value datastructure that is used to store carbon footprint data.
* {@link StableBTreeMap} is a self-balancing tree that acts as a durable data storage that keeps data across canister upgrades.
* For the sake of this contract we've chosen {@link StableBTreeMap} as a storage for the next reasons:
* - insert, get, and remove operations have constant time complexity - O(1)
* - data stored in the map survives canister upgrades unlike using HashMap where data is stored in the heap and it's lost after the canister is upgraded
*
* Breakdown of the StableBTreeMap(string, Footprint) datastructure:
* - the key of the map is a footprintId
* - the value in this map is a footprint itself that is related to a given key (footprintId)
*
* Constructor values:
* 1) 0 - memory id where to initialize a map.
*/

/**
This type represents a carbon footprint record.
*/
class Footprint {
  id: string;
  userId: string;
  activity: string;
  carbonEmissions: number; // in kg CO2 equivalent
  rewardPoints: number;
  createdAt: Date;
  updatedAt: Date | null;
}

const carbonFootprintStorage = StableBTreeMap<string, Footprint>(0);

const app = express();
app.use(express.json());

app.post("/footprints", (req, res) => {
  const footprint: Footprint = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    ...req.body,
    rewardPoints: calculateRewardPoints(req.body.carbonEmissions)
  };
  carbonFootprintStorage.insert(footprint.id, footprint);
  res.json(footprint);
});

app.get("/footprints", (req, res) => {
  res.json(carbonFootprintStorage.values());
});

app.get("/footprints/:id", (req, res) => {
  const footprintId = req.params.id;
  const footprintOpt = carbonFootprintStorage.get(footprintId);
  if (!footprintOpt) {
    res.status(404).send(`The footprint with id=${footprintId} not found`);
  } else {
    res.json(footprintOpt);
  }
});

app.put("/footprints/:id", (req, res) => {
  const footprintId = req.params.id;
  const footprintOpt = carbonFootprintStorage.get(footprintId);
  if (!footprintOpt) {
    res.status(400).send(`Couldn't update a footprint with id=${footprintId}. Footprint not found`);
  } else {
    const footprint = footprintOpt;

    const updatedFootprint = {
      ...footprint,
      ...req.body,
      updatedAt: getCurrentDate(),
      rewardPoints: calculateRewardPoints(req.body.carbonEmissions)
    };
    carbonFootprintStorage.insert(footprint.id, updatedFootprint);
    res.json(updatedFootprint);
  }
});

app.delete("/footprints/:id", (req, res) => {
  const footprintId = req.params.id;
  const deletedFootprint = carbonFootprintStorage.remove(footprintId);
  if (!deletedFootprint) {
    res.status(400).send(`Couldn't delete a footprint with id=${footprintId}. Footprint not found`);
  } else {
    res.json(deletedFootprint);
  }
});

app.listen();

function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}

function calculateRewardPoints(carbonEmissions: number): number {
  // Reward points: 1 point for every 10 kg CO2 saved
  return Math.floor(carbonEmissions / 10);
}
