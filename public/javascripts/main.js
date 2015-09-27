$(document).ready(function () {

    var socket = io.connect("http://localhost:3000/");//to connect server
    var color=" ";     //to keep lambs' color hex value
    var lambId = " ";  //to keep lambs' id
    var newid = " ";   //to keep lambs' id which comes from server
    var newColor;     // to keep lambs' color
    var isIdClickable; // to keep selected lambs is clickable or not
    $("#1lamb,#2lamb,#3lamb,#4lamb,#5lamb,#6lamb,#7lamb,#8lamb,#9lamb,#10lamb,#11lamb,#12lamb").attr('click', "true")// gives an attribute to all lambs to clickable or not when necessary

    changeClor();// function that do all process about project(open or closed lambs)

    function changeClor() {

        $("#1lamb,#2lamb,#3lamb,#4lamb,#5lamb,#6lamb,#7lamb,#8lamb,#9lamb,#10lamb,#11lamb,#12lamb").on("click", function () {

            lambId = $(this).attr('id'); //getting clicked lambs id
            getHexValueOfColor($('#' + lambId).css("backgroundColor")); // get hex value of selected lamb's color

            if (color == "#ffff00") {                   /*
                                                                   these 2 if works for if selected lamb's color is black send server yellow
                                                                    as color value, if color is yellow, again send black to server to change color after click
                                                            */
                newColor = "black";
            }
            else if (color == "#000000") {
                newColor = "yellow";
            }

            socket.emit('lightOnOff', lambId);// send lamb's id to server
            socket.emit('color', newColor);   // send lamb's new color value to change to server


        });

        socket.on('lightOnOff', function (msg) {
            newid = msg; // listen to server's answer and get the data
            isIdClickable=$("#"+newid).attr('click'); // to get lambs value clickable or not that send from server

        });
        socket.on('color', function (msg) {

            if ((msg == "yellow" || msg == "black")) { //these statement is for curl request if curl request has invalid value like "blue,pink or yellowwww,blackkk"

                newColor = msg;

                getHexValueOfColor($('#' + newid).css("backgroundColor"));

                if (color == "#ffff00")
                    newColor = "yellow"
                else
                    newColor = "black";

                if (newColor != msg && isIdClickable == "true") { // first statement in if check that sent data from curl request is same current lamb's value.For example lamb is open and curl request says that open lamb.That time no process can't done
                    $('#' + newid).css("backgroundColor", msg);// change selected lambs value
                    startCountdown(newid)  // start countdown inside selected lamb
                }

            }


        });


    }


    function getHexValueOfColor(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        color = '#' + parts.join('');
    }



    function startCountdown(id) {
        var countdown = $('#' + id).countdown360({
            radius: 30,
            seconds: 5,
            fontColor: '#FFFFFF',
            autostart: false,
            onComplete: function () {
                countdown._clearRect(); // when countdown finished,initialize the countdown
                $("#" + id).attr('click', "true")// after countdown finished, set clickable attribute


            }


        });


        countdown.start();// start countdown
        $("#" + id).attr('click', "false") // locke the selected lamb until countdown finish for 5 seconds


    }
});

