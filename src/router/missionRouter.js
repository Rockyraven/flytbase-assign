const express = require("express");
const auth = require("../middleware/auth");
const { getAllMission, createMission, updateMission, deleteMission, getAllMissionBySite } = require("../controller/MissionController");
const missionRouter = express.Router();

missionRouter.get("/mission", auth, getAllMission);
missionRouter.post("/mission/:siteId", auth, createMission);
missionRouter.put("/mission/:siteId/:missionId", auth, updateMission);
missionRouter.delete("/mission/:missionId", auth, deleteMission);
missionRouter.get("/missionbysiteid/:siteId", getAllMissionBySite)


module.exports = missionRouter;