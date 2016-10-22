<?php

function  send_confirmation_mail($login, $email, $token) {

  $subject = "Camagru - Account creation confirmation";
  $link = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['SCRIPT_NAME'], 0, (strpos($_SERVER['SCRIPT_NAME'], "/", 1) + 1));
  $validation_link = $link."public/account_confirm.php?login=".$login."&token=".$token;
  $content = "<html>
                <head>
                  <title>Camagru - Account creation confirmation</title>
                </head>
                <body>
                  <h4>Hello ".$login." ,</h4>
                  <p>Please click on <a href='".$validation_link."' target='_blank'>this link</a> to confirm your registration !</p>
                  <br/><br/><p>*** This is an automatically generated e-mail, please do not reply ***<br/>
                  If you are not the intended recipient of this e-mail, you can ignore it.</p>
                </body>
            </html>";
  $headers  = 'MIME-Version: 1.0'."\r\n";
  $headers .= 'Content-type: text/html;charset=utf-8'."\r\n";
  $headers .= 'To: '.$login.' <'.$email.'>'."\r\n";
	$headers .= 'From: Camagru WebApp <noreply@camagru.fr>'."\r\n";

  if (mail($email, $subject, $content, $headers) == true)
    return (true);
  else
    return (false);
}

function  send_resetpass_mail($passwd, $email) {

  $subject = "Camagru - Account password reset";
  $link = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['SCRIPT_NAME'], 0, (strpos($_SERVER['SCRIPT_NAME'], "/", 1) + 1))."index.php";
  $content = "<html>
                <head>
                  <title>Camagru - Account password reset</title>
                </head>
                <body>
                  <p>Here is your new password : <strong>".$passwd."</strong></p><br/>
                  <p>You can now <a href='".$link."' target='_blank'>sign in</a> using it !</p>
                  <br/><br/><p>*** This is an automatically generated e-mail, please do not reply ***<br/>
                  If you are not the intended recipient of this e-mail, you can ignore it.</p>
                </body>
            </html>";
  $headers  = 'MIME-Version: 1.0'."\r\n";
  $headers .= 'Content-type: text/html;charset=utf-8'."\r\n";
  $headers .= 'To: '.$email."\r\n";
	$headers .= 'From: Camagru WebApp <noreply@camagru.fr>'."\r\n";

  if (mail($email, $subject, $content, $headers) == true)
    return (true);
  else
    return (false);
}

?>
