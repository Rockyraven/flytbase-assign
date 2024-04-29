const siteModal = require("../modal/siteModal");
const droneModal = require("../modal/droneModal");


const getAllDrone = async (req, res) => {
  try {
    const drone = await droneModal
      .where("userId")
      .equals(req.userId)

    res.status(200).json(drone);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messgae: "something went wrong" });
  }
}

const createDrone = async (req, res) => {
  try {
    const userId = req.userId;
    const { siteId } = req.params;
    const { drone_type, make_name, name } = req.body;

    // Check if site exists
    const existingSite = await siteModal.findById(siteId);
    if (!existingSite) {
      return res.status(404).json({ message: 'Site not found' });
    }

    const existingDrone = await droneModal.findOne({ name });
    if (existingDrone) {
      return res.status(400).json({ message: 'Drone already exists' });
    }

    // Create a new drone document
    const newDrone = new droneModal({
      drone_type,
      make_name,
      name,
      site: siteId,
      userId: userId // Set the site attribute to the site ID
    });
    console.log(newDrone, userId);

    // Save the new drone document to the database
    await newDrone.save();

    res.status(201).json({ message: 'Drone added to site successfully', drone: newDrone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateDrone = async (req, res) => {
  try {
    const userId = req.userId;
    const { siteId, droneId } = req.params;
    const { drone_type, make_name, name } = req.body;

    // Check if site exists
    const existingSite = await siteModal.findById(siteId);
    if (!existingSite) {
      return res.status(404).json({ message: 'Site not found' });
    }

    // Check if drone exists
    const existingDrone = await droneModal.findById(droneId);
    if (!existingDrone) {
      return res.status(404).json({ message: 'Drone not found' });
    }

    // Update drone attributes
    existingDrone.drone_type = drone_type;
    existingDrone.make_name = make_name;
    existingDrone.name = name;
    existingDrone.userId = userId;

    // Save the updated drone document to the database
    const updatedDrone = await existingDrone.save();

    res.status(200).json({ message: 'Drone updated successfully', drone: updatedDrone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const deleteDrone = async (req, res) => {
  try {
    // Extract site ID from request parameters
    const { droneId } = req.params;

    // Check if site exists
    const existingSite = await droneModal.findById(droneId);
    if (!existingSite) {
      return res.status(404).json({ message: 'Site not found' });
    }

    // Delete the site document
    await droneModal.deleteOne({ _id: droneId }); // Or use findByIdAndDelete(siteId);

    res.status(200).json({ message: 'Site deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllDrone, createDrone, updateDrone, deleteDrone };

