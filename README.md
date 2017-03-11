# vui-session

npm module that provides VUI (voice user interface) session functions for
inclusion into other vui-xxx projects.

# Repository
This module as well as related vui modules can be found here:
https://github.com/RationalAnimal

# Installation

```shell
	npm install vui-session --save
```

# Summary

This project provides an npm module to be used by other vui-xxx modules to
construct and access session objects usable within a VUI app. This does not
includes session state information - that functionality comes via vui-state
module.  Note that this contains most of the information needed by various
voice services that's not contained within other objects, such as state.

#APIs

## Add the functionality to the "app" object or where ever you want to have it. Note - you can still use it directly from the module as well.

````javascript
var session = require("vui-session");
var app = {};
state.addSessionToApp(app);
````

## Constructor

new Session() - produces a new Session object
parameters: sessionId, isNew, clientId (i.e. client app id), userId, and user name.

````javascript
var session = require("vui-session");
var app = {};
state.addSessionToApp(app);
var someSession = new app.Session("abc-123", true, "voiceApp1", "user-123", {"firstName": "Jim", "lastName": "Brown"});
````

## Getters and setters

````javascript
var scratchSession2 = new app.Session("abc-123", true, "voiceApp1", "user-123", {"firstName": "Jim", "lastName": "Brown"});
console.log(JSON.stringify(scratchSession2.getCurrentSessionId()));
console.log(JSON.stringify(scratchSession2.getOldSessionIds()));
console.log(JSON.stringify(scratchSession2.getUserId()));
console.log(JSON.stringify(scratchSession2.getUserFirstName()));
console.log(JSON.stringify(scratchSession2.getUserLastName()));
console.log(JSON.stringify(scratchSession2.getUser()));

scratchSession2.setCurrentSessionId("NewID");
scratchSession2.setUserId("NewUser");
scratchSession2.setUserFirstName("Bob");
scratchSession2.setUserLastName("Smith");

console.log(JSON.stringify(scratchSession2.getCurrentSessionId()));
console.log(JSON.stringify(scratchSession2.getOldSessionIds()));
console.log(JSON.stringify(scratchSession2.getUserId()));
console.log(JSON.stringify(scratchSession2.getUserFirstName()));
console.log(JSON.stringify(scratchSession2.getUserLastName()));
console.log(JSON.stringify(scratchSession2.getUser()));
````

will produce

````shell
"abc-456"
["old-session-id"]
"user-123"
"Jim"
"Brown"
{"name":{"first":"Jim","last":"Brown"},"userId":"user-123"}
"NewID"
["abc-456","old-session-id"]

"NewID"
["abc-456","old-session-id"]
"NewUser"
"Bob"
"Smith"
{"name":{"first":"Bob","last":"Smith"},"userId":"NewUser"}
````
