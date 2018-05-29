var dialogDiv = "#divDialog";
// html=html.replace(/\s+/g, ' ').trim();  // Clean up html

console.log('DIALOGDIV');
// if (typeof HTMLDialogElement === 'function') {
jQuery(dialogDiv).dialog({
    resizable: false,
    // autoOpen:false,
    show: { effect: "fade", duration: 1000 },
    hide: { effect: "fade", duration: 500},
    modal: true,
    maxWidth:600,
    maxHeight: 300,
    width:600,
    height:300
    //buttons: { ok: function() { jQuery(this).dialog('close'); } //end cancel button
    //}//end buttons
    });//end dialog
// jQuery(dialogDiv).html( html );
// jQuery(dialogDiv).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
// jQuery(dialogDiv).dialog('open');
