const authenfication = require('../../routes/helproutes/rightAuthentication');
describe("Redirects",()=>
{
    it("right authentication is called with a specific right",()=>
    {
        spyOn(authenfication,"authRight");
        authenfication.authRight("add_device");
        expect(authenfication.authRight).toHaveBeenCalledWith("add_device");
    });

});
