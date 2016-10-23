<?php

require_once("send_mail.php");

$name = $_POST['name'];
$email = $_POST['email'];
$msg = rawurldecode($_POST['msg']);

if ($name == NULL || $email == NULL || $msg == NULL) {
  echo "Error : Corrupted request.<br/>";
  die();
}

$mail_content = wordwrap($msg, 70, "\r\n");
if (mail('fkoehler@student.42.fr', 'Camagru - Contact form', $mail_content) == FALSE)
  echo "Error : Server was not able to send the email.<br/>";

?>
