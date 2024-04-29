const express = require("express");
const auth = require("../middleware/auth");
const { getAllDrone, createDrone, updateDrone, deleteDrone, getAllDroneBySite } = require("../controller/DroneController");
const droneRouter = express.Router();

droneRouter.get("/drone", auth, getAllDrone);
droneRouter.post("/drone/:siteId", auth, createDrone);
droneRouter.put("/drone/:siteId/:droneId", auth, updateDrone);
droneRouter.delete("/drone/:droneId", auth, deleteDrone);
droneRouter.get("/dronebysiteid/:siteId", getAllDroneBySite)


module.exports = droneRouter;