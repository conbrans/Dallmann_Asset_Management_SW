const crypto = require('Website/routes/helproutes/crypto');

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text)
{
    let chiper = crypto.createCipheriv('aes-256-cbc',Buffer.from(key),iv);
    let encrypted = chiper.update(text);
    encrypted = Buffer.concat([encrypted,chiper.final()]);
    return {iv:iv.toString('hex'),encryptedData : encrypted.toString('hex')};
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports=
    {
        encrypt,
        decrypt
    }