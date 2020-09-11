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
    it('putFetch', function (done)
    {
        spyOn(fetch,"putFetch").and.
        returnValue(Promise.resolve(promisedDataGet));
        fetch.putFetch().then((result)=>
        {
            expect(result).toEqual(promisedDataGet);
            done();
        });
    });
    it('deleteFetch', function (done)
    {
        spyOn(fetch,"deleteFetch").and.
        returnValue(Promise.resolve(promisedDataPost));
        fetch.deleteFetch().then((result)=>
        {
            expect(result).toEqual(promisedDataPost);
            done();
        });
    });
    it('loginFetch',function (done)
    {
        spyOn(fetch,"loginFetch").and.
        returnValue(Promise.resolve(promisedDataPost));
        fetch.loginFetch().then((result)=>
        {
            expect(result).toEqual(promisedDataPost);
            done();
        });

    });
});