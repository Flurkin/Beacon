var Joi = require('joi');
var User = require('../models/user');
var Incident = require('../models/incident');
var Image = require('../models/image');
var data;
var fs = require('fs');

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
exports.login = {
  handler: function (request, reply) {

    // In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
    // Passport and inserted the request and reply variables).
    User.authenticate()(request.payload.email, request.payload.password, function (err, user, passwordError) {

      // There has been an error, do something with it. I just print it to console for demo purposes.
      if (err) {
        console.error(err);
        return reply.redirect('/login');
      }

      // Something went wrong with the login process, could be any of:
      // https://github.com/saintedlama/passport-local-mongoose#error-messages
      if (passwordError) {
        // For now, just show the error and login form
        console.log(passwordError);
        return reply.view('login', {
          errorMessage: passwordError.message,
        });
      }

      // If the authentication failed user will be false. If it's not false, we store the user
      // in our session and redirect the user to the hideout
      if (user) {
        request.auth.session.set(user);
        return reply.redirect('/ViewReports');
      }

      return reply.redirect('/login');

    });
  }
};


/**
 * Responds to POST /login and logs the mobile user in, well, soon.
 */
exports.mobilereport = {
  handler: function (request, reply) {
      data = request.payload;
      // To handle json
      //console.log(json);
      //var data = JSON.parse(json);
      console.log(data);
    // In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
    // Passport and inserted the request and reply variables).
    User.authenticate()(data.username, data.password, function (err, user, passwordError) {

      // There has been an error, do something with it. I just print it to console for demo purposes.
      if (err) {
        console.error(err);
        data = JSON.stringify({success: 0});
        return reply(data);
      }

      // Something went wrong with the login process, could be any of:
      // https://github.com/saintedlama/passport-local-mongoose#error-messages
      if (passwordError) {
        // For now, just show the error and login form
        console.log(passwordError);
        data = JSON.stringify({success: 0});
        return reply(data);
      }

      // If the authentication failed user will be false. If it's not false, we store the user
      // in our session and redirect the user to the hideout
      if (user) {
        request.auth.session.set(user);
      }

        var newIncident = new Incident({
            title: data.title,
            description: data.description,
            severity: data.severity,
            reporter: user._id,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude)
        });

        var photocount = parseInt(data.numOfPhotos);
        var count = 0;
                                console.log(count);
        if(photocount > 0)
            {
                for(count = 0; count < photocount; count++)
                    {
                        console.log(count);
                        if(count == 0)
                            {
                                console.log(count);
                                var newImage1 = new Image({
                                    image: data.image1,
                                    incident: newIncident._id
                                });
                            }
                        if(count == 1)
                            {
                                console.log(count);
                                var newImage2 = new Image({
                                    image: data.image2,
                                    incident: newIncident._id
                                });
                            }
                        if(count == 2)
                            {
                                console.log(count);
                                var newImage3 = new Image({
                                    image: data.image3,
                                    incident: newIncident._id
                                });
                            }
                    }
            }

        console.log(user._id);
        console.log(data.title);
        console.log(data.description);
        console.log(data.severity);
        console.log(data.latitude);
        console.log(data.longitude);
        console.log(data.numOfPhotos);

        newIncident.save();
        count = 0;
        if(photocount > 0)
            {
                for(count = 0; count < photocount; count++)
                    {
                        if(count == 0)
                            {
                                newImage1.save();
                            }
                        if(count == 1)
                            {
                                newImage2.save();
                            }
                        if(count == 2)
                            {
                                newImage3.save();
                            }
                    }
            }
        data = JSON.stringify({success: 1});
        return reply(data);

    });
  }
};

/**
 * Responds to POST /login and logs the mobile user in, well, soon.
 */
exports.mobilelogin = {
  handler: function (request, reply) {
      data = request.payload;
      // To handle json
      //console.log(json);
      //var data = JSON.parse(json);
      console.log(data);
      console.log(data.username);
      console.log(data.password);
    // In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
    // Passport and inserted the request and reply variables).
    User.authenticate()(data.username, data.password, function (err, user, passwordError) {

      // There has been an error, do something with it. I just print it to console for demo purposes.
      if (err) {
        console.error(err);
        data = JSON.stringify({ success: 0 });
        return reply(data);
      }

      // Something went wrong with the login process, could be any of:
      // https://github.com/saintedlama/passport-local-mongoose#error-messages
      if (passwordError) {
        // For now, just show the error and login form
        console.log(passwordError);
        data = JSON.stringify({ success: 0 });
        return reply(data);
      }

      // If the authentication failed user will be false. If it's not false, we store the user
      // in our session and redirect the user to the hideout
      if (user) {
        request.auth.session.set(user);
        data = JSON.stringify({ success: 1 });
        return reply(data);
      }

        data = JSON.stringify({ success: 0 });
      return reply(data);

    });
  }
};

/**
 * Responds to GET /logout and logs out the user
 */
exports.logout = {
  auth: 'session',
  handler: function (request, reply) {
    request.auth.session.clear();
    reply().redirect('/');
  }
};

/**
 * Responds to POST /register and creates a new user.
 */
exports.register = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function(request, reply) {

    // Create a new user, this is the place where you add firstName, lastName etc.
    // Just don't forget to add them to the validator above.
    var newUser = new User({
      email: request.payload.email
    });

    // The register function has been added by passport-local-mongoose and takes as first parameter
    // the user object, as second the password it has to hash and finally a callback with user info.
    User.register(newUser, request.payload.password, function(err, user) {

      // Return error if present
      if (err) {
        return reply(err);
      }

      console.log('registered');
      return reply.redirect('/login');
    });
  }
};

/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.report = {
	auth: 'session',
	handler: function (request, reply) {
        console.log(request.payload);
        Incident.find({ _id: {$in: request.payload.incidentId}})
        .populate('_reporter')
        .exec(function (err, incidents){
            console.log(incidents);
            Image.find({ incident: {$in: request.payload.incidentId}})
            .populate('_incident')
            .exec(function (err, images){
                console.log(images);
                var img;
                for(x in images)
                    {
                        if(x==0)
                            {
                                var image1 = new Buffer(images[x].image, 'base64');
                                img = {images:{image: image1, name: images[x]._id}};
                                console.log(image1);
                                console.log(img.images);
                                fs.writeFile("/usr/api/views/"+img.images.name+".png", image1, function(err) {});
                            }
                        if(x==1)
                            {
                                var image2 = new Buffer(images[x].image, 'base64');
                                img = [{image: image1, name: images[0]._id}, {image: image2, name: images[x]._id}];
                                console.log(image2);
                                console.log(img);
                                fs.writeFile("/usr/api/views/"+img[x].name+".png", image2, function(err) {});
                            }
                        if(x==2)
                            {
                                var image3 = new Buffer(images[x].image, 'base64');
                                img = [{image: image1, name: images[0]._id }, {image: image2, name: images[1]._id}, {image: image3, name: images[x]._id}];
                                console.log(image3);
                                console.log(img);
                                fs.writeFile("/usr/api/views/"+img[x].name+".png", image3, function(err) {});
                            }
                    }
                User.find({ _id: {$in: incidents.reporter}})
                .exec(function (err, users){
                    console.log(users);
                    return reply.view('IndividualReport', {
                        email: request.auth.credentials.email,
                        incidentList: incidents,
                        imageList: img,
                        userList: users
                    });
                })
            });
        })
    }
};
