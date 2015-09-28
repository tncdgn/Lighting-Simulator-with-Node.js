# Lighting-Simulator-with-Node.js
# Description:
    This is the sample Real time lighting simulator for multiple users.
    There are 12 lambs.Users can open or close multiple lambs in same time.
    When a user open or close the lamb, all other users can see the process.
    When a lamb is opened or closed, no user can make opening or closing the same lamb during 5 seconds.
    Furthermore, user can request by using cURL.
    
# Technologies used:

    Server:Node.js 4.1.1
    Nodejs module:
        1.Express:    http://expressjs.com/
        2.Socket.io:  http://socket.io/
     
     Npm 3.3.4   
      
      Frontend:
            1. Jquery 1.9.1
            2. Bootstrap 3.3.5
            
            
# Usage

    1.After downloaded node.js and npm, go to project folder by using windows cmd.
    2.Type this command to install node.js modules "npm install".
    3.Type this command to start project server "node app.js"
    4.You will see a message like this " listening on *:3000 ".This means, your server started.
    5.Then open index.html inside your project more than one start to use.
    6.To make cURL request,first download cURL for your machine. http://curl.haxx.se/
    7.Then open your cURL folder from cmd.
    8.Type this command    "curl --data "1.data,2.data" localhost:3000
    9.1.data means lambs' id.These are lambs id :"1lamb,2lamb,3lamb,4lamb.......12lamb".
    10.2.data means open or close lambs.To open use "yellow", to close "black".
    11.Sample cURL request  curl --data "3lamb,yellow" localhost:3000 this command means open the 3.lamb.
