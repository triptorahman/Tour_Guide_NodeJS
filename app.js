//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');

var login			= require('./controllers/login');
var admin			= require('./controllers/admin');
var scout = require('./controllers/scout');

var logout			= require('./controllers/logout');
var home 			= require('./controllers/home');
var app  			= express();
var session = require('express-session');
var user=require('./controllers/user');



var port 			= 3000;


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(session({secret: 'my top secret code', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(upload());
//app.use(cookieParser());
//app.use('/login', login);
//app.use('/home', home);
app.use('/logout', logout);
app.use('/assets', express.static('assets'));

//ROUTES
app.use('/', home);

app.use('/home', home);
app.use('/signup', home);
app.use('/login', login);
app.use('/forgot', home);
app.use('/admin', admin);
app.use('/scout', scout);

app.use('/user', user);
app.use('/admin/userUpdateInfo/', admin);

/*app.get('/setCookie', (req,res)=>{
	res.cookie('cookie1', 'first cookie');
	res.send("done");
});

app.get('/viewCookie', (req,res)=>{
	res.send(req.cookies['cookie1']);
});

app.get('/rmCookie', (req,res)=>{
	res.clearCookie('cookie1');
	res.send('Done');
});*/


//SERVER STARTUP
app.listen(port, ()=>console.log('server started at'+port+"..."));