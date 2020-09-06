const bcrypt = require("bcrypt");

async function hash(password)
{
    return await bcrypt.hash(password, 10);
}


//TODO HASH COMPARISON

module.exports =
    {
        hash
    }