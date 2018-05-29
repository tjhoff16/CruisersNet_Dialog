$( function() {
  $( "#dialog" ).dialog(
    {
      resizable: false,
      autoOpen:false,
      show: { effect: "fade", duration: 1000 },
      hide: { effect: "fade", duration: 500},
      modal: true,
      maxWidth:600,
      maxHeight: 300,
      width:600,
      height:300
    }
  );
  $("#dialog").dialog('open');
} );
