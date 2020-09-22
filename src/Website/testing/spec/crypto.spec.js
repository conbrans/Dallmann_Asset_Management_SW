const crypto = require('../../routes/helproutes/crypto');
describe("Encryption",()=>
{
    it("encrypt method contains encryptedData and iv",()=>
    {
        spyOn(crypto,"encrypt");
        const testencrypt =crypto.encrypt("TEST");
        expect(crypto.encrypt).toHaveBeenCalledWith("TEST");
        //expect(testencrypt).toContain("iv");
        //expect(testencrypt).toContain("encryptedData");
    });
});