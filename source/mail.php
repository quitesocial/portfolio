<?php

header('Content-Type: application/json');

$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['message'];

$message = "Сообщение от пользователя: $name
E-mail для связи: $email
Сообщение пользователя: $comment";

$result = mail('quitesocial@yandex.ru', 'Заявка на создание сайта', $message);

echo json_encode(array(
    'status' => $result
));