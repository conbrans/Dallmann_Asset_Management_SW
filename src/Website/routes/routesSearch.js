const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');

router.post("/searchStatus", (req, res) => {
    fetch.postFetch("/api/device/getSpecificDevice/byStatus", req)
        .then(data => res.status(200).render("newDeviceManagement.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                data: data,
            }))
        .catch((error) => {
            console.error('Error:', error);
        })
})

router.post("/searchCategory", (req, res) => {
    fetch.postFetch("/api/device/getSpecificDevice/byCategory", req)
        .then(data => res.status(200).render("newDeviceManagement.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                data: data,
            }))
        .catch((error) => {
            console.error('Error:', error);
        })
})

router.post("/searchModel", (req, res) => {
    fetch.postFetch("/api/device/getSpecificDevice/byModel", req)
        .then(data => res.status(200).render("newDeviceManagement.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                data: data,
            }))
        .catch((error) => {
            console.error('Error:', error);
        })
})

router.post("/searchTuv", (req, res) => {
    fetch.postFetch("/api/device/getSpecificDevice/byTuev", req)
        .then(data => res.status(200).render("newDeviceManagement.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                data: data,
            }))
        .catch((error) => {
            console.error('Error:', error);
        })
})

router.post("/searchUvv", (req, res) => {
    fetch.postFetch("/api/device/getSpecificDevice/byUvv", req)
        .then(data => res.status(200).render("newDeviceManagement.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                data: data,
            }))
        .catch((error) => {
            console.error('Error:', error);
        })
})

router.post("/searchRepair", (req, res) => {
    fetch.postFetch("/api/device/getSpecificDevice/byRepair", req)
        .then(data => res.status(200).render("newDeviceManagement.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                data: data,
            }))
        .catch((error) => {
            console.error('Error:', error);
        })
})


module.exports = router;