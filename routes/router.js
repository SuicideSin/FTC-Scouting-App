var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Match = require('../models/match');

router.get('/', function (req, res, next) {
  if(req.session.userId != null){
    res.redirect('/scouting/index.html');
  }
  else{
    res.redirect('index.html');
  }
});

router.get('/index.html', function (req, res, next) {
  if(req.session.userId != null){
    res.redirect('/scouting/index.html');
  }
  else{
    return next();
  }
});

router.get('/sites/*', function (req, res, next) {
  if(req.session.userId != null){
    res.redirect('/scouting/index.html');
  }
  else{
    return next();
  }
});

router.get('/auth/*', function (req, res, next) {
  if(req.session.userId != null){
    res.redirect('/scouting/index.html');
  }
  else{
    return next();
  }
});

router.post('/', function (req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    return res.send('<script>alert("Passwords do not match.");window.location="/sites/register.html";</script>');
  }

  if (req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return res.send('<script>alert("Username already exists.");window.location="/sites/register.html";</script>');
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });

  } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
      	return res.send('<script>alert("Wrong username or password.");window.location="/sites/register.html";</script>');
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else if (req.body.matchnumber && req.body.alliance && req.body.teamnumber && req.body.teamname && req.body.autoscore && req.body.driverscore && req.body.endscore && req.body.totalscore && req.body.notes){
    User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null){
          var matchData = {
            username: user.username,
            matchnumber: req.body.matchnumber,
            alliance: req.body.alliance,
            teamnumber: req.body.teamnumber,
            teamname: req.body.teamname,
            autoscore: req.body.autoscore,
            driverscore: req.body.driverscore,
            endscore: req.body.endscore,
            totalscore: req.body.totalscore,
            notes: req.body.notes,
          }

          Match.create(matchData, function (error, match) {
            if (error) {
              return next(error);
            } else {
              return res.redirect('/scouting/scout.html');
            }
          });
        }
      }
    });
  } else if (req.body.matchnumber && req.body.alliance){
    User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null){
          Match.getData(user.username,req.body.matchnumber,req.body.alliance, function (error, match) {
            if (error || !match) {
              return next(error);
            } else {
              return res.send(match);
            }
          });
        }
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.get('/scouting/*', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          return res.redirect('/sites/login.html');
        } else {
          return next();
        }
      }
    });
});

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
