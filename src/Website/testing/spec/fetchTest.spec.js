const promisedDataGet = require('../supportfiles/devices.json');
const promisedDataPost = require('../supportfiles/success.json');
const fetch = require('../../routes/helproutes/fetch');

describe("Test of fetch methods",()=>
{

    it('getFetch',function (done)
    {
        spyOn(fetch, "getFetch").and.
        returnValue(Promise.resolve(promisedDataGet));
        fetch.getFetch().then((result)=>
        {
            expect(result).toEqual(promisedDataGet);
            done();
        });
    });

    it('postFetch', function (done)
    {
        spyOn(fetch,"postFetch").and.
        returnValue(Promise.resolve(promisedDataPost));
        fetch.postFetch().then((result)=>
        {
            expect(result).toEqual(promisedDataPost);
            done();
        });

    });
});