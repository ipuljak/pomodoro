$(document).ready(function() {

    var paused = true;
    var isBreak = false;
    var curTime = parseInt($("#timer").text());
    var curBreak = parseInt($("#break").text());
    var curSession = parseInt($("#session").text());

    var clock = new Date();
    clock.setHours(0, curTime, 0);

    var t = 0;

    $("#minusBreak").on("click", function() {
        if (curBreak > 1 && paused) {
            curBreak--;
            $("#break").text(curBreak);
        }
    });

    $("#plusBreak").on("click", function() {
        if (paused) {
            curBreak++;
            $("#break").text(curBreak);
        }
    });

    $("#minusSession").on("click", function() {
        if (curSession > 1 && paused) {
            curSession--;
            $("#session").text(curSession);
            $("#timer").text(curSession);
            curTime = $("#timer").text();
            t = 0;
            clock.setHours(0, curTime, 0);
        }
    });

    $("#plusSession").on("click", function() {
        if (paused) {
            curSession++;
            $("#session").text(curSession);
            $("#timer").text(curSession);
            curTime = $("#timer").text();
            t = 0;
            clock.setHours(0, curTime, 0);
        }
    });

    $(".circle").on("click", function() {
        // if paused
        if (paused) {
            paused = !paused;
            t = setTimeout(getTimer, 1);

        // if unpaused
        } else {
            paused = !paused;
            clearTimeout(t);
        }
    });

    function getTimer() {
        var m = clock.getMinutes();
        var s = clock.getSeconds();

        m= (m<10)?"0"+m: m;
        s= (s<10)? "0"+s : s;

        $("#timer").text(m+":"+s);

        if (isBreak) {
            $(".circle").css("border-color", "#40C947");
        } else {
            $(".circle").css("border-color", "#AF4848");
        }

        if (m==0 && s==0) {
            clearTimeout(t)
            isBreak = !isBreak;

            // switch to break mode
            if (isBreak) {
                t = 0;
                clock.setHours(0, curBreak, 0);
                t = setTimeout(getTimer, 1000);

            // switch to timer mode
            } else {
                t = 0;
                clock.setHours(0, curTime, 0);
                t = setTimeout(getTimer, 1000);
            }
            return;   
        }
        
        clock.setSeconds(clock.getSeconds()-1);
        t = setTimeout(getTimer, 1000);
    }
});