const bcrypt = require("bcrypt");

async function hash(password)
{
     hashedPassword = await bcrypt.hash(password,10);
}


module.exports =
    {
        hash
    }