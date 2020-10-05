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
/**
 * get the workerid and mail for a specific user, which is transported with
 * an ajax call
 */
router.post("/sendWorkerInfos",(req, res) => {
   req.session.userMgntID = req.body.workerid;
   req.session.userMgntMail = req.body.mail;
   res.json({
       message : "Erfolg",
   })
});

module.exports = router;