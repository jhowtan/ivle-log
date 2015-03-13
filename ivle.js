var util = require('util');
var Promise = require('bluebird');
var request = require('request');

var config = require('./config');

var validLogin = function(token){
  return new Promise(function(resolve, reject) {
    request(profileUrl(token), function(error, response, body){
      if(error) return reject(error);

      // Check API Response for {Comments: Valid login!}
      var jsonBody = JSON.parse(body);
      if(jsonBody.Comments == 'Valid login!'){
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

var loginUrl = function(){
  return util.format('https://ivle.nus.edu.sg/api/login/?apikey=%s&url=http://127.0.0.1:1337/callback', config.apikey);
};

function profileUrl(token){
  return util.format('https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?APIKey=%s&AuthToken=%s', config.apikey, token);
}

function modulesUrl(token){
  return util.format('https://ivle.nus.edu.sg/api/Lapi.svc/Modules_Student?APIKey=%s&AuthToken=%s&Duration=0&IncludeAllInfo=false', config.apikey, token);
}

function workbinsUrl(token, courseId){
  return util.format('https://ivle.nus.edu.sg/api/Lapi.svc/Workbins?APIKey=%s&AuthToken=%s&CourseID=%s&Duration=0', config.apikey, token, courseId);
}

module.exports = {
  validLogin: validLogin,
  loginUrl: loginUrl,
  profileUrl: profileUrl,
  modulesUrl: modulesUrl,
  workbinsUrl: workbinsUrl
};
