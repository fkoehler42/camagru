<?php

function send_confirmation_mail($login, $email, $token) {

  $subject = "Camagru - Account creation confirmation";
  $link = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['SCRIPT_NAME'], 0, (strrpos($_SERVER['SCRIPT_NAME'], "/") + 1));
  $validation_link = $link."account_confirm.php?login=".$login."&token=".$token;
  $content = "<html>
                <head>
                  <title>Camagru - Account creation confirmation</title>
                </head>
                <body>
                  <h4>Hello ".$login." ,</h4>
                  <p>Please click on <a href='".$validation_link."' target='_blank'>this link</a> to confirm your registration !</p>
                </body>
            </html>";
  $headers  = 'MIME-Version: 1.0'."\r\n";
  $headers .= 'Content-type: text/html;charset=utf-8'."\r\n";
  $headers .= 'To: '.$login.' <'.$email.'>'."\r\n";
	$headers .= 'From: Camagru Website <noreply@camagru.fr>'."\r\n";

  if (mail($email, $subject, $content, $headers) == true)
    return (true);
  else
    return (false);
}

?>
