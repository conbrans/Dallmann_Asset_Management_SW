describe("Notification System",()=>
{
    var notification = require('../../routes/helproutes/notifications');
   beforeAll(()=>
   {
       spyOn(notification,"sendMessage");

   });
    it('sendMessage to be called',()=>
    {
        notification.sendMessage();
        expect(notification.sendMessage).toHaveBeenCalled();
    });
    it('sendMessage to be called with login',()=>
    {
        notification.sendMessage("login");
        expect(notification.sendMessage).toHaveBeenCalledWith("login");
    });

});