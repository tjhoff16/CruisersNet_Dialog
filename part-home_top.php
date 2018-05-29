<?php
$question = 'set';
    if ( isset($question) && $question != "" ) {
        echo "<style>";
        echo "     .ui-dialog .ui-dialog-titlebar { height: 0px; }";
        echo "</style>";
        echo "<script type='text/javascript' src='http://cruisersnet-dev.net/wp-includes/js/jquery/jquery.js?ver=1.12.4'></script>";
        echo "<script type='text/javascript' src='https://ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/jquery-ui.min.js'></script>";
        echo "<script type='text/javascript' src='questions.js'></script>";
        echo "$question <div id='divDialog' style='background-color:white; border: 2px solid black; padding: 0px 20px 0px 20px; width: 500px; max-height: 400px;'></div>";
    } else {
        echo "<!-- NO QUESTION TO ASK -->";
    }
?>
