const app = require('../../app');
const homepage = require('../routes/homepage');
const historie = require('../routes/historie');
const login = require('../routes/login');
app.use(homepage);
app.use(historie);
app.use(login);


app.listen(1234, function () {
    console.log('Server running at http://127.0.0.1:1234/');

});