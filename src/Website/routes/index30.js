/**
 * ZUM TESTEN VON fetch für Kevin
 * request body enthält die werte usermail und password( noch im klartext)
 * @type {Express}
 */



const app = require('../../app');

var {
    PORT = 3032,
} = process.env;

app.post("/json", function (request,response)
{
   console.log(request.body);
})

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));