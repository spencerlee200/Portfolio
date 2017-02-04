var path = require('path');
var fs = require('fs');
var userDataPath = path.join(__dirname, '/../data/users.json');

exports.getUsers = function(callback) {
  fs.readFile(userDataPath, function(err, data) {
    if(err) {
      callback(err)
    }
    callback(null, JSON.parse(data))
  })
}

exports.findOrCreate = function(user, callback) {
  this.findById(user.id, function(err, users) {
    if(!err) {
      callback(null, users);
    }
    else {
      users.push(user);
      var json = JSON.stringify(users);
      fs.writeFile(userDataPath, json, 'utf8', function() {
        callback(null, user);
      });
    }
  })
}

exports.findById = function(id, cb) {
  this.getUsers(function(err, users) {
    if(!err) {
      for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.id === id) {
        return cb(null, user);
      }
      }
      return cb(new Error('User ' + id + ' does not exist'), users);
    }
    else {
      cb(new Error('Problem getting users'));
    }
  })
}

exports.findByUsername = function(username, cb) {
  this.getUsers(function(err, users) {
    if(!err) {
      for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return cb(null, user);
      }
      }
      return cb(new Error('User ' + username + ' does not exist'));
    }
    else {
      cb(new Error('Problem getting users'));
    }
  });
}
