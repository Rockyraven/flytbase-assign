const missionModal = require("../modal/missionModal");
const siteModal = require("../modal/siteModal");

const getAllMission = async (req, res) => {
    try {
        const mission = await missionModal
            .where("userId")
            .equals(req.userId)

        res.status(200).json(mission);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messgae: "something went wrong" });
    }
}
const createMission = async (req, res) => {
    try {
        const userId = req.userId;
        const { siteId } = req.params;
        const { alt, speed, name, waypoints } = req.body;

        // Check if site exists
        const existingSite = await siteModal.findById(siteId);
        if (!existingSite) {
            return res.status(404).json({ message: 'Site not found' });
        }

        const existingMission = await missionModal.findOne({ name });
        if (existingMission) {
            return res.status(400).json({ message: 'Drone already exists' });
        }

        // Create a new mission document
        const newMission = new missionModal({
            alt,
            speed,
            name,
            waypoints,
            site: siteId, // Set the site attribute to the site ID
            userId
        });

        // Save the new mission document to the database
        await newMission.save();

        res.status(201).json({ message: 'Mission added to site successfully', mission: newMission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateMission = async (req, res) => {
    try {
        const userId = req.userId;
        const { siteId, missionId } = req.params;
        const { alt, speed, name, waypoints } = req.body;
    
        // Check if site exists
        const existingSite = await siteModal.findById(siteId);
        if (!existingSite) {
          return res.status(404).json({ message: 'Site not found' });
        }
    
        // Check if mission exists
        const existingMission = await missionModal.findById(missionId);
        if (!existingMission) {
          return res.status(404).json({ message: 'Mission not found' });
        }
    
        // Update mission attributes
        existingMission.alt = alt;
        existingMission.speed = speed;
        existingMission.name = name;
        existingMission.waypoints = waypoints;
        existingMission.userId = userId;
    
        // Save the updated mission document to the database
        const updatedMission = await existingMission.save();
    
        res.status(200).json({ message: 'Mission updated successfully', mission: updatedMission });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


const deleteMission = async (req, res) => {
    try {
        // Extract site ID from request parameters
        const { missionId } = req.params;
    
        // Check if site exists
        const existingMission = await missionModal.findById(missionId);
        if (!existingMission) {
          return res.status(404).json({ message: 'Mission not found' });
        }
    
        // Delete the site document
        await missionModal.deleteOne({ _id: missionId }); // Or use findByIdAndDelete(siteId);
    
      res.status(200).json({ message: 'Mission deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { getAllMission, createMission, updateMission, deleteMission };

