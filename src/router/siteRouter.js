const express = require("express");
const { getSite, createSite, updateSite, deleteSite } = require("../controller/SiteController");
const auth = require("../middleware/auth");
const siteRouter = express.Router();

siteRouter.get("/site", auth, getSite);
siteRouter.post("/site", auth, createSite);
siteRouter.put("/site/:id", auth, updateSite);
siteRouter.delete("/site/:id", auth, deleteSite);


module.exports = siteRouter;