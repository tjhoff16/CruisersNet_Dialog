<?php
    include_once($_SERVER['DOCUMENT_ROOT'] . '/charts/php/includes/db_v3.php');
    // For testing:
    //echo get_newsletter_questions();
    //echo get_question(6);
    function get_question($dbCharts, $lastQuestionID) {
        if ( ! isset($dbCharts) ) return '';
        $query = 'SELECT * FROM Questions WHERE ID = (SELECT MAX(ID) FROM Questions)';
        if ( $result = mysqli_query($dbCharts, $query) ) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            //
            // Check if question already asked.
            //
            if ( $row['ID']==$lastQuestionID ) return ''; // '<!-- Found question but equals previously asked question -->';
            //
            // Determine if question should be asked - must have specific REPLACE Text
            //
            if (strpos($row['Question'], 'REPLACE_WITH_QNUMBER')  === false  ||
                strpos($row['Question'], 'REPLACE_WITH_QSNIPPET') === false) return ''; // '<!-- Question Replace Text Not Found: -->';
            //
            //  Process response
            //
            $question = '<div id="divQ3" style="display:none;">'.$row['Question'].'</div> <!-- divQ3 -->';
            $question = str_replace('REPLACE_WITH_QNUMBER',  $row['ID'],      $question);
            $question = str_replace('REPLACE_WITH_QSNIPPET', $row['Snippet'], $question);
            mysqli_close($dbCharts);
            return $question;
        }
        return '';
    }

    function get_newsletter_questions($dbCharts) {
        if ( ! isset($dbCharts) ) return '';
        if ( $result = mysqli_query($dbCharts, 'SELECT * FROM Questions WHERE ID=1 OR ID=2') ) {
            $question='';
            while ($row = mysqli_fetch_assoc($result)) {
                $rownum=$row['ID'];
                $question = $question . "<div id='divQ".$rownum."' style='display:none;'>".$row['Question']."</div> <!-- divQ".$rownum." -->";
            }
            mysqli_close($dbCharts);
            return $question;
        }
        return '';
    }
    ?>

