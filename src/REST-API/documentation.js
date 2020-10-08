const express = require('express');
const router = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


router.get('/test', (request, response) => {

    console.log("request");
    response.status(200).send("Customer results");

});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Asset-Management REST-API',
            description: "Asset-Management REST Dokumentation",
            contact: {
                name:"Kevin Bosse"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ['documentation.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;