var nCookie = 'nCookie'; // Tracking newsletter question
var qCookie = 'qCookie'; // Tracking general question
var dialogDiv = "#divDialog";

function resetQuestions() {
    eraseCookie(nCookie);
    eraseCookie(qCookie);
    location.reload(true);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function initializeQuestions() {
    // Newsletter Cookie DOES NOT EXIST so show Newsletter question
    if ( readCookie(nCookie)===null ) {
        openDialog( '1', jQuery("#divQ1").html() );
    } else {
        if ( jQuery( "#qNumber" ).length ) openDialog( jQuery('#qNumber').val(), jQuery("#divQ3").html() );
    }
    //
    // Hide after 10 seconds if q1 still showing since probably not being acted upon by user
    //
    //var hide = setTimeout(function() {
    //                        if ( jQuery('#q1').css("display") === 'block' || jQuery('#q3').css("display") === 'block' ) hideQuestions();
    //                        }, 20000);
}

function openDialog(num, html) {
    if (html == null || num ==  null ){
        myLog("*** WARNING num or html is null:"+num+"/"+html);
        return;
    }
    html=html.replace(/\s+/g, ' ').trim();  // Clean up html
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
    console.log(typeof HTMLDialogElement);
    if (typeof HTMLDialogElement === 'function') {
        jQuery(dialogDiv).dialog({
                                    resizable: false,
                                    autoOpen:false,
                                    show: { effect: "fade", duration: 1000 },
                                    hide: { effect: "fade", duration: 500},
                                    modal: true,
                                    maxWidth:600,
                                    maxHeight: 300,
                                    width:600,
                                    height:300,
                                    //buttons: { ok: function() { jQuery(this).dialog('close'); } //end cancel button
                                    //}//end buttons
                                    });//end dialog
        jQuery(dialogDiv).html( html );
        jQuery(dialogDiv).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
        jQuery(dialogDiv).dialog('open');
    } else {
        //
        //  Dialog is unavailable
        //
        jQuery(dialogDiv).html( html );
        jQuery(dialogDiv).css("display", "block");
    }
}
