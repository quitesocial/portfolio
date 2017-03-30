<?php

header('Content-Type: application/json');

$name = $_POST['name'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$home = $_POST['home'];
$part = $_POST['part'];
$appt = $_POST['appt'];
$floor = $_POST['floor'];
$comment = $_POST['comment'];
$payment = $_POST['payment'];
$callback = $_POST['callback'];

$message = "Сообщение от пользователя: $name
Телефон для связи: $phone
Адрес: $street, дом $home, корпус $part, квартира $appt, этаж $floor
Комментарий пользователя: $comment
Нужна сдача / оплата по карте: $payment
Обратный звонок: $callback";

$result = mail('admin@master-css.com', 'Заявка на бургеры', $message);

echo json_encode(array(
    'status' => $result
));