module.exports = function(app, passport){
	//este archivo sirver para redireccionar y organizar
	//las direcciones de cada peticion
	
	//home page
	app.get('/', function(req, res){
		res.render('index.ejs') //load index.ejs file
	});

	//login
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	//registrarse
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage')}); //load signup.ejs file
	});


	//profile
	//protect this, so you have to be logged in to visit
	//we will use route middleware to verify thiw (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user : req.user //get the user out of session and pass to template
		});
	});

	//to know if the user is logged in
	function isLoggedIn(req, res, next){
		//if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();
		//if they aren't redirect them to the home page
		res.redirect('/');
	}

	//post method to signup

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', //redirect to the profile section
		failureRedirect  : '/signup', //redirect back to the signup if there is an error
		failureFlash : true //allow flash messages
	}));

	//post method to login
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));

}