var createError = require('http-errors');
var express     = require('express');
var bodyParser  = require('body-parser');
var path        = require('path');
var fs = require('fs');

var app = express();
require('dotenv').config({path: __dirname + '/.env'})

//var socket = require("socket.io")

// REMOVE X-POWERED-BY FROM RESPONSE HEADER
app.disable('x-powered-by');
// REMOVE SERVER FROM RESPONSE HEADER
app.disable('Server');


app.use(bodyParser.json({
    limit: '50mb'
})); // support json encoded bodies

 
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
})); // support encoded bodies 


/* using middleware */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS,HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,access-token,x-http-method-override,x-access-token,authorization');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type,expire');
    next();
});


global.appPath = __dirname;
require('./config/dbConfig');
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) 
app.use(express.static(__dirname + '/uploads'));
app.use('/uploads', express.static('uploads'));

// Load the constants
global.constants = require(global.appPath + '/config/constants');


// Initialize the events
// require(global.appPath + '/helpers/events')(app)


var apiRouter   = require('./routes/apiRoutes');
var adminRouter   = require('./routes/adminRoutes');


// Socket Configuration
// const io = require('socket.io')(server);
// io.on('connection', (socket) => { 
//   console.log("Socket is Connected...");
//   socketFunc.socketResponse(socket);
// });

// var io = socket(server);
// io.on("connection", function(){
// console.log("Socket connection made")
// });


/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**  
 * Create HTTP / HTTPS server.
 */
//  const pkey  = fs.readFileSync('/home/admin/ssl/letsencrypt/aprodence.com/privkey.pem'),
//  pcert       = fs.readFileSync('/home/admin/ssl/letsencrypt/aprodence.com/cert.pem'),
//  fullchain   = fs.readFileSync('/home/admin/ssl/letsencrypt/aprodence.com/fullchain.pem'),
//  chain       = fs.readFileSync('/home/admin/ssl/letsencrypt/aprodence.com/chain.pem'),

//  options = {key: pkey, cert: pcert, ca:[fullchain,chain]};  

//  var server = require('https').createServer(options,app);
 
var server = require('http').createServer(app);
 
 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/*
 * Listen to all http response here
 */
function InterceptorForAllResponse(req, res, next) {
    var oldSend = res.send;
    res.send = function(data) {
        // arguments[0] (or `data`) contains the response body        
        oldSend.apply(res, arguments);
    }
    next();
}

app.use(InterceptorForAllResponse);


//------------------------------------------- ROUTES ----------------------------------------------//
 app.use('/api', apiRouter); // API Routes
 app.use('/admin', adminRouter); // ADMIN Routes
//------------------------------------------- ROUTES ----------------------------------------------//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err);
    res.status(err.status || 500).json('error');
});


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) { 
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on', bind);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


module.exports = app;