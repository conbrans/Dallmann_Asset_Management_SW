describe("Password hashing",()=>
{
    var hash = require('../../routes/helproutes/passwordhashing');

    it('hash method is called',()=>
    {
        spyOn(hash,"hash");
        hash.hash();
        expect(hash.hash).toHaveBeenCalled();
    });
    it('hash is called with password',()=>
    {
        spyOn(hash,"hash");
        hash.hash("test");
        expect(hash.hash).toHaveBeenCalledWith("test");


    })
    it('hash method return a hashed password',function (done)
    {
        spyOn(hash,"hash").and.returnValue(Promise.resolve("$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"));
        hash.hash().then((result)=>
        {
            expect(result).toEqual("$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy");
            done();
        });

    });

});