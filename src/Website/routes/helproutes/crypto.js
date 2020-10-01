const crypto = require('crypto');

const key = crypto.randomBytes(32);
const initializationVector = crypto.randomBytes(16);

/**
 * encrypt a given text
 * @param text, which will be encrypted
 * @return {{encryptedData: string, initializationVector: string}}
 */

function encrypt(text) {
    let chiper = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), initializationVector);
    let encrypted = chiper.update(text);
    encrypted = Buffer.concat([encrypted, chiper.final()]);
    return {
        initializationVector: initializationVector.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

/**
 * decrypt a given jsonFile back to text
 * @param text contains the initialization vector and encryptedData
 * @return {string}
 */
function decrypt(text) {
    let initializationVector  = Buffer.from(text.initializationVector, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), initializationVector);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt
}