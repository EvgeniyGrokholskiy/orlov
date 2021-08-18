<?php
if (isset ($_POST['email'])) {
    $to = "grokholskiy@gmail.com";
    $from = "support@tpverstak.ru";
    $subject = "Заполнена контактная форма на сайте " . $_SERVER['HTTP_REFERER'];
    $message = "Имя пользователя: " . $_POST['first_name'] . "\nEmail пользователя " . $_POST['email'] . "\nТелефон пользователя " . $_POST['tel'] . "\nНазвание трека:" . $_POST['track_name'] . "\nИсполнитель:" . $_POST['performer_name'] . "\nДополнительный текст выбран?" . $_POST['addition_text'] . "\nДополнительный текст:" . $_POST['addition_text_input'] . "\nОживить фото (QR-код):" . $_POST['live_photo'] . "\nДобавить крепление на стену:" . $_POST['wall'] . "\nДобавить подарочную упаковку:" . $_POST['gift'] . "\nДобавить поздравительную
                            открытку" . $_POST['congratulation'] . "\nДобавить подставку:" . $_POST['stand'] . "\nДобавить лазерную гравировку на
                            подставку" . $_POST['laser'] . "\nСумма:" . $_POST['price'] . "\nРазмер:" . $_POST['size_of_glass']. "\nТип плеера:" . $_POST['cover'] . "\nМасштаб:" . $_POST['magnification'] . "\nПоложение по вертикали:" . $_POST['pos_y'] . "\nПоложение по горизонтали:" . $_POST['pos_x'] . "\n\nАдрес сайта: " . $_SERVER['HTTP_REFERER'];

    $boundary = md5(date('r', time()));
    $filesize = '';
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $message = "
Content-Type: multipart/mixed; boundary=\"$boundary\"
 
--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit
 
$message";
    if (is_uploaded_file($_FILES['upload_file']['tmp_name'])) {
        $attachment = chunk_split(base64_encode(file_get_contents($_FILES['upload_file']['tmp_name'])));
        $filename = $_FILES['upload_file']['name'];
        $filetype = $_FILES['upload_file']['type'];
        $filesize = $_FILES['upload_file']['size'];
        $message .= "
 
--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"
 
$attachment";
    }
    $message .= "
--$boundary--";

    if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
        mail($to, $subject, $message, $headers);
        echo $_POST['first_name'] . ', Ваше сообщение отправлено, спасибо!';
    } else {
        echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
    }
}
?>
