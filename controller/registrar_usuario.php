<?php

require_once "../model/basedatos.php";

$conn = connDB();


if(  isset($_POST['nick']) && !empty($_POST['nick']) &&
     isset($_POST['email']) && !empty($_POST['email']) && 
     isset($_POST['pass']) && !empty($_POST['pass'])){

    $nombre= $_POST['nombre'];
    $apellidos= $_POST['apellidos'];
    $nick= $_POST['nick'];
    $email= $_POST['email'];
    $pass= $_POST['pass'];
    $cryppass= password_hash($pass, PASSWORD_DEFAULT) ;//password encriptado

    $query="INSERT INTO usuarios (nombre, apellidos, nick, email, pass, tipo_usuario) 
        VALUES ('$nombre','$apellidos','$nick','$email','$cryppass', 3)";
    
    $resultado = guardar($conn, $query);

   

    echo ($resultado);


}else{
    echo "MAL";
}

   
  


?>