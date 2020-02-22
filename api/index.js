const express = require('express');

// GLOBALS
global.methods = require('./methods');

var api = express();

// ROUTES
require('./routes')(api, '');

// ERRORS
api.use((err, req, res, next) => {
    if(err){
        var msg = err.msg ? err.msg : "No error message";
        const status = err.status ? err.status : 500;
        msg = err.status ? msg : msg + ', and no error status'
        res.status(status).send({errors: msg});
    }
});

// START
api.listen(
    process.env.PORT,
    () => process.env.DEBUG && console.log(`AEC-API active on port ${process.env.PORT}`)
)