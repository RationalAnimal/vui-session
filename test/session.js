/*
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
var expect = require("chai").expect;
var session = require("../index.js");

describe("vui-session", function() {
  describe("Session", function() {
    var app = {};
    session.addSessionToApp(app);

    it("verify Session constructor and getter functions", function() {
      var scratchSession = new app.Session("abc-123", true, "voiceApp1", "user-123", {"firstName": "Jim", "lastName": "Brown"});
      expect(scratchSession.getCurrentSessionId()).to.eql({"sessionId": "abc-123", "platformId": ""});

      var scratchSession2 = new app.Session(["abc-456", "old-session-id"], true, "voiceApp1", "user-123", {"firstName": "Jim", "lastName": "Brown"});
      expect(scratchSession2.getCurrentSessionId()).to.eql({"sessionId": "abc-456", "platformId": ""});
      expect(scratchSession2.getOldSessionIds()).to.eql([{"sessionId": "old-session-id", "platformId":""}]);
      expect(scratchSession2.getIsNew()).to.equal(true);
      expect(scratchSession2.getClientId()).to.equal("voiceApp1");
      expect(scratchSession2.getUserId()).to.equal("user-123");
      expect(scratchSession2.getUserFirstName()).to.equal("Jim");
      expect(scratchSession2.getUserLastName()).to.equal("Brown");
      expect(scratchSession2.getUser()).to.eql({"userId": "user-123", "name": {"first": "Jim", "last": "Brown"}});
      scratchSession2.setCurrentSessionId("NewID");
      scratchSession2.setIsNew(false);
      scratchSession2.setClientId("voiceApp2");
      scratchSession2.setUserId("NewUser");
      scratchSession2.setUserFirstName("Bob");
      scratchSession2.setUserLastName("Smith");
      expect(scratchSession2.getCurrentSessionId()).to.eql({"sessionId": "NewID", "platformId": ""});
      expect(scratchSession2.getOldSessionIds()).to.eql([{"sessionId": "abc-456", "platformId": ""},{"sessionId": "old-session-id", "platformId":""}]);
      expect(scratchSession2.getIsNew()).to.equal(false);
      expect(scratchSession2.getClientId()).to.equal("voiceApp2");
      expect(scratchSession2.getUserId()).to.equal("NewUser");
      expect(scratchSession2.getUserFirstName()).to.equal("Bob");
      expect(scratchSession2.getUserLastName()).to.equal("Smith");

      var scratchSession3 = new app.Session([{"sessionId": "abc-789", "platformId": "Alexa"}], true, "voiceApp1", "user-123", {"firstName": "Jim", "lastName": "Brown"});
      expect(scratchSession3.getCurrentSessionId()).to.eql({"sessionId": "abc-789", "platformId": "Alexa"});

    });

  });
});
