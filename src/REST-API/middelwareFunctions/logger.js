function logging(request, response, next) {
    console.log('logging...');
    next();
}

function logg(request, response, next) {
    console.log('next logging...');
    next();
}

module.exports = {

    logging: logging,
    logg: logg

}