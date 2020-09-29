const express = require('express');
const router = express.Router();


router.post("/sendInventoryNumber",(req, res) => {
    req.session.inventoryNumber = req.body.inventoryNumber;
    res.json({
        message: "Erfolg",
    })
});

module.exports = router;