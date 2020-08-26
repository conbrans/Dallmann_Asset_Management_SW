const bcrypt = require("bcrypt");
let password = "test";
let passwordNew =  hash(password);


async function hash(password)
{
     const passwordhashed = await bcrypt.hash(password,10);
     const returnValue = passwordhashed;
     return returnValue;
}


module.exports =
    {
        hash
    }