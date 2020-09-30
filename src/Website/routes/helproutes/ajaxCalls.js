const express = require('express');
const router = express.Router();

/**
 * gets a specific inventorynumber from an ajax call on the device
 * management side
 */
router.post("/sendInventoryNumber",(req, res) => {
    req.session.inventoryNumber = req.body.inventoryNumber;
    res.json({
        message: "Erfolg",
    })
});

module.exports = router;