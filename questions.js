// https://webdesign.tutsplus.com/tutorials/native-popups-and-modals-with-the-html5-dialog-element--cms-23876
// Files used: /wp-content/themes/CruisersNet/part-home_top.php
//             /wp-content/themes/CruisersNet/js/questions.js
//             /wp-content/themes/CruisersNet/includes/answer.php
//             /wp-content/themes/CruisersNet/includes/get_question.php
//             /wp-content/themes/CruisersNet/includes/test_questions.php
//
var nCookie = 'nCookie'; // Tracking newsletter question
var qCookie = 'qCookie'; // Tracking general question
var dialogDiv = "#divDialog";

function resetQuestions() {
  eraseCookie(nCookie);
  eraseCookie(qCookie);
  location.reload(true);
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function initializeQuestions() {
  // Newsletter Cookie DOES NOT EXIST so show Newsletter question
  if (readCookie(nCookie) === null) {
    openDialog('1', "<div>this is a div</div>");
    console.log('READ COOKIE WORKING');
  } else {
    if (jQuery("#qNumber").length) openDialog(jQuery('#qNumber').val(), jQuery("#divQ3").html());
  }
  //
  // Hide after 10 seconds if q1 still showing since probably not being acted upon by user
  //
  //var hide = setTimeout(function() {
  //                        if ( jQuery('#q1').css("display") === 'block' || jQuery('#q3').css("display") === 'block' ) hideQuestions();
  //                        }, 20000);
}

function openDialog(num, html) {
  if (html == null || num == null) {
    myLog("*** WARNING num or html is null:" + num + "/" + html);
    return;
  }
  html = html.replace(/\s+/g, ' ').trim(); // Clean up html
  qNumber = num;
  //
  //  Disable Question Capability!!!!
  //
  // jQuery(dialogDiv).remove();
  // return;
  //
  // For testing
  //
  //jQuery.getJSON('//freegeoip.net/json/?callback=?', function(data) {
  //               myLog(JSON.stringify(data, null, 2));
  //               if ( data["ip"] == "24.128.225.215" ) ...;
  //          });
  //
  //  If Dialogs are allowed
  //
  // console.log(typeof HTMLDialogElement);
  if (typeof HTMLDialogElement === 'function') {
    console.log('HTMLDialogElement called');
    // init first
    jQuery('#mydiv').dialog({
      autoOpen: false
    });

    // then call open
    jQuery('#mydiv').dialog('open');

    jQuery('#mydiv2').dialog();
    alert('HTMLDialogElement called');
    jQuery(dialogDiv).dialog({
      resizable: false,
      autoOpen: false,
      show: {
        effect: "fade",
        duration: 1000
      },
      hide: {
        effect: "fade",
        duration: 500
      },
      modal: true,
      maxWidth: 600,
      maxHeight: 300,
      width: 600,
      height: 300,
      //buttons: { ok: function() { jQuery(this).dialog('close'); } //end cancel button
      //}//end buttons
    }); //end dialog
    jQuery(dialogDiv).html(html);
    jQuery(dialogDiv).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
    jQuery(dialogDiv).dialog('open');
  } else {
    //
    //  Dialog is unavailable
    //
    jQuery(dialogDiv).html(html);
    jQuery(dialogDiv).css("display", "block");
  }
}

function newsletterTask(qNumber, qSnippet, qAnswer) {
  //  Log question and answer to database
  logAnswer(qNumber, qSnippet, qAnswer);
  switch (qAnswer) {
    case 'NoReceive': // Do not receive Newsletter - show next question
      //var hide = setTimeout(function() { jQuery("#divDialog").dialog('close'); }, 10000);
      qNumber = 2;
      jQuery(dialogDiv).html("<div id='effect' class='ui-widget-content ui-corner-all'>" + jQuery("#divQ2").html() + "</div>");
      return;
    case 'Receive': // Yes, currently receives newsletter - ask again in 180 days
      createCookie(nCookie, 'yes', 180);
      break;
    case 'Want': // Wants to receive newsletter - Sign Them Up but check again in 45 days to make sure
      createCookie(nCookie, 'yes', 45);
      window.location.href = '/alert-list-signup/';
      break;
    case 'Nope': // Does not want newsletter - ask again in 90 days
      createCookie(nCookie, 'no', 90);
      break;
    case 'NotNow': // Not now - ask again in 30 days
      createCookie(nCookie, 'no', 30);
      break;
    default:
      var msg = '*** UNKNOWN ANSWER: ' + qAnswer;
      myLog(msg);
      logAnswer('-1', '*** ERROR ***', msg);
      break;
  }
  if (typeof HTMLDialogElement === 'function') {
    jQuery(dialogDiv).dialog('close');
  } else {
    jQuery(dialogDiv).css("display", "none");
    //myLog("Dialog: NO.");
  }
}

function getFormData() {
  var qNumber = jQuery("#qNumber").length ? jQuery('#qNumber').val() : '-1'; // Retrieved from form
  var qSnippet = jQuery("#qSnippet").length ? jQuery('#qSnippet').val() : 'Unknown'; // Retrieved from form
  var qAnswer = '';
  // Only one type of answer type can be defined
  if (jQuery("#tanswer").length) { // Input text box
    qAnswer = jQuery('#tanswer').val();
  } else if (jQuery("#oanswer").length) { // List of options
    qAnswer = jQuery('#oanswer').val();
  } else { // Radio buttons
    qAnswer = jQuery('.ranswer:checked').val();
  }
  // To strip tage: .replace(/<(?:.|\n)*?>/gm, '');
  logAnswer(qNumber, qSnippet, qAnswer);
  createCookie(qCookie, qNumber, 10 * 365); // Set out 10 years
  if (typeof HTMLDialogElement === 'function') {
    jQuery(dialogDiv).dialog('close');
  } else {
    jQuery(dialogDiv).css("display", "none");
  }
}

function logAnswer(qnumber, snippet, answer) {
  jQuery.ajax({
    url: '/wp-content/themes/CruisersNet/includes/answer.php',
    type: "POST",
    data: {
      qnumber: qnumber,
      snippet: snippet,
      answer: answer
    },
    success: function(data) {
      //myLog(data);
      //alert(data);
    }
  });
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function myLog(text) {
  if (window.console) console.log(text);
}

jQuery(document).ready(function() {
  initializeQuestions();
});