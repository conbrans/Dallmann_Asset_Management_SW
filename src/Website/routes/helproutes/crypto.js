const crypto = require('crypto');

const key = crypto.randomBytes(32);


/**
 * encrypt a given text
 * @param text, which will be encrypted
 * @return {{initializationVector: string, encryptedData: string}}
 */

function encrypt(text) {
	let key = crypto.randomBytes(32);
	let initializationVector = crypto.randomBytes(16);
	let chiper = crypto.createCipheriv('aes-256-cbc', Buffer.from(key),
		initializationVector);

	let encrypted = chiper.update(text);
	encrypted = Buffer.concat([encrypted, chiper.final()]);
	return {
		initializationVector: initializationVector.toString('hex')
			+ key.toString('hex'),
		encryptedData: encrypted.toString('hex'),
	};
}

function decrypt(text) {

	let initializationVector =
		Buffer.from(text.initializationVector.substring(0, 32), 'hex');

	let encryptedData = Buffer.from(text.encryptedData.substring(0), 'hex');
	let decipher = crypto.createDecipheriv('aes-256-cbc',
		Buffer.from(text.initializationVector.substring(32), 'hex'),
		initializationVector);
	let decrypted = decipher.update(encryptedData);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

module.exports = {
	encrypt,
	decrypt
};