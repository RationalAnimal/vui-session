/*
@author Ilya Shubentsov

MIT License

Copyright (c) 2017 Ilya Shubentsov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict'
var session = {};

/**
 * Call this function to add vui-session functionality to
 * any object.
 * @param {object} app - The object to which the functionality should be added.
 */
session.addSessionToApp = function(app){
  if(app.sessionAlreadyAdded == true){
    return;
  }
  app.sessionAlreadyAdded = true;
  app.Session = session.Session;
};

session.Session = function(sessionIds, isNew, clientId, userId, userRealName){
  this.sessionIds = [];
  if(typeof sessionIds == "undefined"){
    // Do nothing - no ids at all
  }
  else if(Array.isArray(sessionIds)){
    for(var i = 0; i < sessionIds.length; i++){
      var scratchId = sessionIds[i];
      if(typeof scratchId == "undefined"){
        // Do nothing
      }
      else if(typeof scratchId == "string"){
        this.sessionIds.push(scratchId);
      }
      else {
        this.sessionIds.push("" + scratchId);
      }
    }
  }
  else if(typeof sessionIds == "string"){
    this.sessionIds.push(sessionIds);
  }
  else {
    this.sessionIds.push("" + sessionIds);
  }
  this.isNew = isNew;
  this.clientId = clientId;
  this.User = function(userId, userRealName){
    this.name = {};
    if(typeof userId != "undefined"){
      this.userId = userId;
    }
    if(typeof userRealName == "object" && typeof userRealName.firstName != "undefined"){
      this.name.first = userRealName.firstName;
    }
    if(typeof userRealName == "object" && typeof userRealName.lastName != "undefined"){
      this.name.last = userRealName.lastName;
    }
  }
  this.user = new this.User(userId, userRealName);
  this.getCurrentSessionId = function(){
    if(this.sessionIds.length >= 1){
      return this.sessionIds[0];
    }
    return "";
  }
  this.setCurrentSessionId = function(newId){
    this.sessionIds.unshift(newId);
  }
  this.getOldSessionIds = function(){
    var returnValue = [];
    if(this.sessionIds.length >= 2){
      for(var i = 1; i < this.sessionIds.length; i++){
        returnValue.push(this.sessionIds[i]);
      }
    }
    return returnValue;
  }
  this.isNew = function(){
    return this.isNew;
  }
  this.setIsNew = function(isNew){
    this.isNew = isNew;
  }
  this.getClientId = function(){
    return this.clientId;
  }
  this.setClientId = function(cliendId){
    this.clientId = clientId;
  }
  this.getUserId = function(){
    return this.user.userId;
  }
  this.setUserId = function(newUserId){
    this.user.userId = newUserId;
  }
  this.getUserFirstName = function(){
    if(typeof this != "undefined" && typeof this.user != "undefined" && typeof this.user.name != "undefined"){
      return this.user.name.first;
    }
    return;
  }
  this.setUserFirstName = function(newFirstName){
    this.user.name.first = newFirstName;
  }
  this.getUserLastName = function(){
    if(typeof this != "undefined" && typeof this.user != "undefined" && typeof this.user.name != "undefined"){
      return this.user.name.last;
    }
    return;
  }
  this.setUserLastName = function(newLastName){
    this.user.name.last = newLastName;
  }
  this.getUser = function(){
    if(typeof this != "undefined"){
      return this.user;
    }
    return;
  }

}

module.exports = session;
