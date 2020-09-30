const crypto = require('crypto');

const key = crypto.randomBytes(32);
const initializationVector = crypto.randomBytes(16);

/**
 * encrypt a given text
 * @param text, which will be encrypted
 * @return {{encryptedData: string, initializationVector: string}}
 */

function encrypt(text)
{
    console.log('key: ' +key);
    console.log(Buffer.from(key));
    let chiper = crypto.createCipheriv('aes-256-cbc',Buffer.from(key),initializationVector);
    console.log('initializationVector: '+ initializationVector);
    let encrypted = chiper.update(text);
    encrypted = Buffer.concat([encrypted,chiper.final()]);
    return {initializationVector:initializationVector.toString('hex'),encryptedData : encrypted.toString('hex')};
}
/**
 * decrpyt a given jsonFile back to text
 * @param jsonFile contains the initalization vetor and encryptedData
 * @return {string}
 */
/*function decrypt(text) {
    let iv = Buffer.from(text.initializationVector, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), initializationVector);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
} */

function decrypt(text) {
    let iv = Buffer.from(text.initializationVector, 'hex');
    console.log(text.initializationVector);
    console.log(iv);
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    console.log(text.encryptedData);
    console.log(encryptedText);
    console.log(text.e);
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), initializationVector);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports=
    {
        encrypt,
        decrypt
    }