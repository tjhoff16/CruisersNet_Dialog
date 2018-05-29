<?php
    include_once($_SERVER['DOCUMENT_ROOT'] . '/wp-content/themes/CruisersNet/includes/get_question.php');
    $question = ! isset($_COOKIE['nCookie']) ? get_newsletter_questions($dbCharts) :
    get_question($dbCharts, isset($_COOKIE['qCookie']) ? $_COOKIE['qCookie'] : -1 );
    //  Process if question data exists
    if ( isset($question) && $question != "" ) {
        echo "<style>";
        echo "     .ui-dialog .ui-dialog-titlebar { height: 0px; }";
        echo "</style>";
        echo "<script type='text/javascript' src='https://ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/jquery-ui.min.js'></script>";
        echo "<script type='text/javascript' src='/wp-content/themes/CruisersNet/js/questions.js'></script>";
        echo "$question <div id='divDialog' style='background-color:white; border: 2px solid black; padding: 0px 20px 0px 20px; width: 500px; max-height: 400px;'></div>";
    } else {
        echo "<!-- NO QUESTION TO ASK -->";
    }
    ?>
<div class="home-top">
	<table>
		<tr>
			<td style="padding: 0px 20px 0px 0px;">
				<!-- Begin Submit News Button -->
				<a href="<?php bloginfo('url'); ?>/contribute-cruising-news/">
					<div class="cnet-button cnet-button-full blue">
						Click Here To<br />Submit Comments
					</div>
				</a>
				<!-- End Submit News Button -->
			</td>
			<td style="padding: 0 0 0 0px;">
				<a href="https://itunes.apple.com/ml/app/ssecn/id964496104?mt=8" target="_blank"><img alt="SSECN iOS App" src="https://linkmaker.itunes.apple.com/images/badges/en-us/badge_appstore-lrg.svg"  width="134" height="55"/></a>
                <a href="https://play.google.com/store/apps/details?id=net.cruisersnet.ssecn.beta&hl=en" target="_blank"><img alt="SSECN Android App" src="/images/google-play-badge.png" width="150" height="62" /></a>
			</td>
			<td style="padding: 0 0 0 0px;">
				<!-- Begin Alert List Button -->
				<a href="/alert-list-signup/">
					<div class="cnet-button cnet-button-full blue">
						Click Here To Signup For Newsletter and Alerts
					</div>
				</a>
				<!-- End Alert List Button -->
			</td>
		</tr>
	</table>
</div>
