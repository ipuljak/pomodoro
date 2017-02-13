$(document).ready(function () {

  // Instantiate some default values
  var paused = true;
  var isBreak = false;
  var curTime = parseInt($("#timer").text());
  var curBreak = parseInt($("#break").text());
  var curSession = parseInt($("#session").text());

  // Set a timer to some amount of minutes
  var clock = new Date();
  clock.setHours(0, curTime, 0);

  var t = 0;

  // Click event to decrement the break length
  $("#minusBreak").on("click", function () {
    // Decrement if the timer is greater than 1 and is paused
    if (curBreak > 1 && paused) {
      curBreak--;
      $("#break").text(curBreak);
    }
  });

  // Click event to increment the break length
  $("#plusBreak").on("click", function () {
    // Incremement if the timer is paused
    if (paused) {
      curBreak++;
      $("#break").text(curBreak);
    }
  });

  // Click event to decrement the session length
  $("#minusSession").on("click", function () {
    // Decrement if the timer is greater than 1 and is paused
    if (curSession > 1 && paused) {
      curSession--;
      $("#session").text(curSession);
      $("#timer").text(curSession);
      curTime = $("#timer").text();
      // Reset the timer to 0 and the session to the new session length
      t = 0;
      clock.setHours(0, curTime, 0);
    }
  });

  $("#plusSession").on("click", function () {
    // Incremement if the timer is paused
    if (paused) {
      curSession++;
      $("#session").text(curSession);
      $("#timer").text(curSession);
      curTime = $("#timer").text();
      // Reset the timer to 0 and the session to the new session length
      t = 0;
      clock.setHours(0, curTime, 0);
    }
  });

  // Click event for the main play button
  $(".circle").on("click", function () {
    // If currently paused, unpause the timer
    if (paused) {
      paused = !paused;
      t = setTimeout(getTimer, 1);
    } else {
      // Otherwise pause it
      paused = !paused;
      clearTimeout(t);
    }
  });

  // A function that handles the Javascript timer using the global variable t
  function getTimer() {
    var m = clock.getMinutes();
    var s = clock.getSeconds();

    // Add 0's if the times are less than 10 to keep double digits
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    // Create the timer string with the semicolon between minutes and seconds
    $("#timer").text(m + ":" + s);

    // Change the color of the play circle depending on whether it's a break or countdown
    if (isBreak) {
      $(".circle").css("border-color", "#40C947");
    } else {
      $(".circle").css("border-color", "#AF4848");
    }

    // When the timer hits 0, clear it and start the break
    if (m == 0 && s == 0) {
      clearTimeout(t)
      isBreak = !isBreak;

      // If on break, create a timer for the break length and count down from it
      if (isBreak) {
        t = 0;
        clock.setHours(0, curBreak, 0);
        t = setTimeout(getTimer, 1000);
      } else {
        // Otherwise start the timer for the session length
        t = 0;
        clock.setHours(0, curTime, 0);
        t = setTimeout(getTimer, 1000);
      }
      return;
    }

    // Count down every second
    clock.setSeconds(clock.getSeconds() - 1);
    t = setTimeout(getTimer, 1000);
  }
});