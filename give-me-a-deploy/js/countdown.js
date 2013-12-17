// VM Lifespan Countdown Timer

var timerID = null;

var start=0;
var now=null;
var finalhours=null;
var finalminutes=null;
var finalseconds=null;
var rseconds=null;
var rminutes=null;

var digit=null;

var countDown = 0;

function startclock() {
        start = new Date();
        finalseconds = start.getSeconds();
//add countDown time to minutes
        finalminutes = start.getMinutes()+countDown;
        if (finalminutes>=60) {finalminutes -= 60;
                                            finalhours = start.getHours()+1}
        else {finalhours = start.getHours()};
//        document.clock.timer.value = ""
}

function countdown () {
        now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var timeValue = new String("");

//Prepare current time for printing
        var timeValue = "" + ((hours >12) ? hours -12 :hours);
        timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
        timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
           timeValue += (hours >= 12) ? " P.M." : " A.M.";

//Display current time in text field "face"
//       document.clock.face.value = timeValue;
        
//Print out time remaining
        
// Assumes that timer will not be used for more than one hour
//start indicates that timer has been clicked if ne 0
    if(start != 0){
        if (finalseconds >= seconds) {rseconds = finalseconds-seconds}
            else {rseconds = 60+finalseconds-seconds;
                     minutes += 1}
      }; //end if

         if (finalminutes >= minutes) {rminutes = finalminutes-minutes}
            else {rminutes = 60+finalminutes-minutes}; // end if
        
//Check for possibility that clock has run over
//         alert("rminutes= "+rminutes+ " countDown= "+countDown);
         if (rminutes <= countDown) { 
                var timeValue = "" +((rminutes < 10) ? "0" : "") + rminutes;
                timeValue += ((rseconds < 10) ? ":0" : ":") + rseconds}
         else {var timeValue = "00.00"}; // end if

//Display remaining time is text field "timer"
//        document.clock.timer.value = timeValue;
     
//At this point timeValue contains elapsed time
//Prepare to output as big letters

    digit = timeValue.charAt(0);
    document.images[0].src = digit+".GIF";

    digit = timeValue.charAt(1);
    document.images[1].src = digit+".GIF";

    digit = timeValue.charAt(3);
    document.images[3].src = digit+".GIF";

    digit = timeValue.charAt(4);
    document.images[4].src = digit+".GIF";

//Check for time run out
    if (timeValue =="00:00") {
          start=0
    }; // end if

        timerID = setTimeout("showtime()",1000);
} // end function

function setWatch(n){
    countDown = n;
}