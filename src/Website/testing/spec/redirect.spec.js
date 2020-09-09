const redirect = require('../../routes/helproutes/redirect');
describe("Redirects",()=>
{
    it("right authentication is called with a specific right",()=>
    {
        spyOn(redirect,"authRight");
        redirect.authRight("add_device");
        expect(redirect.authRight).toHaveBeenCalledWith("add_device");
    });

});