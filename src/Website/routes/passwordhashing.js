const saltRounds = 10;
const password = "cARsr@medaw8j§PM";
const bcrypt = require("bcrypt");
let stored_hash = "";

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(password, salt);
const hash1 = bcrypt.hashSync(password,salt);
console.log(hash);
console.log(hash1);

bcrypt.compare("cARsr@medaw8j§PM", hash, function (err,res)
{
    if (res)
    {
        console.log("Erfolg");

    } else
    {
        console.log("Fail.");
    }

});