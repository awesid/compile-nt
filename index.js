const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    {exec} = require('child_process'),
    cors = require('cors'),
    logger = require('morgan');


var app = express();
const port = (process.env.PORT || 3000);
const hostname = 'localhost';

var code = require('./routes/code');


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use("/" , express.static(__dirname + '/frontEnd'));

app.use('/code',code);


app.use('/', function(err, req, res, next) {
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.send('Error: ' + err.message);
});

var server = http.createServer(app);
server.listen(port,hostname);