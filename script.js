var goal = "";
var min = null;
var goalPlusTime = "";
var custMin = null;
var bgColor1 = "#F3F1FB";
var bgColor2 = "#F3F1FB";
//var bgColor2 = "#FAF4DA";

$(document).ready(function() {
  // Set background color
  $('.centerWrapper').css("background-color", bgColor1);

  // Set value of goal field from popular uses
  $('#uses span').click(function() {
    var use = $(this).attr('data-use');
    $('#goalInput').val(use);
  });

  // Set value of custom timer
  $('#customTimerInput').bind('change paste keyup', function() {
    custMin = $('#customTimerInput').val();
    $('#customTimerMin').text(custMin);
  });

  // Get current year for copyright
  $('#currentYear').text(new Date().getFullYear());
});

function startCustomTimer() {
  if (custMin === null || custMin <= 0) {
    $('#customTimerAlertDummy').hide();
    $('#customTimerAlert').show();
    $('#customTimerGroup').addClass('has-error');
  } else {
    var custSec = custMin * 60;
    startTimer(custSec);
    $('#customTimerAlert').hide();
    $('#customTimerAlertDummy').show();
    $('#customTimerGroup').removeClass('has-error');
  }
}

function startTimer(sec) {
  $('#customTimerGroup').removeClass('has-error');
  // Load bell sound
  var audio = new Audio('http://soundbible.com/mp3/Temple Bell-SoundBible.com-756181215.mp3');

  // Hide/show divs
  $('#formDiv').hide();
  $('#timerDiv').show();
  $('#uses').hide();
  $('#saveOrBookmark').show();

  // Change background color
  $('.centerWrapper').css("background-color", bgColor2);

  // Set variables
  var chkGoal = $("#goalInput").val();
  goal = (chkGoal === null || chkGoal === "") ? "Your r3minder" : chkGoal;
  min = Math.floor(sec / 60);

  goalPlusTime = goal + " (" + min + " min)";

  // Display goal plus time
  $('#yourGoal').text(goalPlusTime);

  // Get time for countdown
  now = new Date();
  var time = now.setSeconds(now.getSeconds() + sec);

  // Start timer
  $('#timeLeft').countdown(time, function(event) {
    $(this).text(event.strftime('%H:%M:%S'));
    document.title = event.strftime('%H:%M:%S') + " - " + goal;
  });

  // Trigger GA Event
  ga('send', 'event', 'Timer Started', min, goal);

  // When timer ends
  $(this).on('finish.countdown', function(event) {
    $('#timeLeft').countdown('remove');
    doAlert();
  });

  // Time's up alert
  function doAlert() {
    audio.play();
    document.title = "Your time is up!";
    alert(">>>>>>>>>>  Your r3minder  <<<<<<<<<<\n\n" + goalPlusTime + "\n\n>>>>>>>>>>  is complete!  <<<<<<<<<<<");
    $('#customTimerAlert').hide();
    $('#formDiv').show();
    $('#timerDiv').hide();
    $('.centerWrapper').css("background-color", bgColor1);
    $('#saveOrBookmark').hide();
    $('#uses').show();
    // Trigger GA Event
    ga('send', 'event', 'Timer Completed', min, goal);
  }
}

// Stop Timer
function stopTimer() {
  $('#timeLeft').countdown('remove');
  $('#formDiv').show();
  $('#timerDiv').hide();
  $('.centerWrapper').css("background-color", bgColor1);
  $('#customTimerAlert').hide();
  $('#saveOrBookmark').hide();
  $('#uses').show();
  ga('send', 'event', 'Timer Stopped', min, goal);
  document.title = "Timer stopped."
}

// Open new tab
function openNewTab() {
  window.open();
}