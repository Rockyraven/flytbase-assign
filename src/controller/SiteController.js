const siteModal = require("../modal/siteModal");

// Get all site by user 
const getSite = async (req, res) => {
    try {
        const site = await siteModal
            .where("userId")
            .equals(req.userId)

        res.status(200).json(site);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messgae: "something went wrong" });
    }
}

// Create site controller  by user 
const createSite = async (req, res) => {
    const userId = req.userId;
    try {
        const { site_name, position } = req.body;

        // Check if site_name already exists
        const existingSite = await siteModal.findOne({ site_name });
        if (existingSite) {
            return res.status(400).json({ message: 'Site name already exists' });
        }

        // Create a new site document
        const newSite = new siteModal({
            site_name,
            position,
            userId
        });

        // Save the new site document to the database
        await newSite.save();
        console.log(newSite, "site", existingSite);

        res.status(201).json({ message: 'Site created successfully', site: newSite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Update site controller by id by user 
const updateSite = async (req, res) => {
    const userId = req.userId;
    try {
        const { site_name, position } = req.body;

        // Extract site ID from request parameters
        const { id } = req.params;

        // Check if site exists
        const existingSite = await siteModal.findById(id);
        if (!existingSite) {
            return res.status(404).json({ message: 'Site not found' });
        }

        // Update the site document
        existingSite.site_name = site_name;
        existingSite.position = position;
        existingSite.userId = userId;

        // Save the updated site document to the database
        const updatedSite = await existingSite.save();

        res.status(200).json({ message: 'Site updated successfully', site: updatedSite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete  site controller by id by user 
const deleteSite = async (req, res) => {
    try {
      // Extract site ID from request parameters
      const {id} = req.params;
  
      // Check if site exists
      const existingSite = await siteModal.findById(id);
      if (!existingSite) {
        return res.status(404).json({ message: 'Site not found' });
      }
  
      // Delete the site document
      await siteModal.deleteOne({ _id: id }); // Or use findByIdAndDelete(siteId);
  
      res.status(200).json({ message: 'Site deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


module.exports = { getSite, createSite, updateSite, deleteSite };