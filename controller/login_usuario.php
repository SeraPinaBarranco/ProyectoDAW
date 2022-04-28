<?php

    session_start();

    require_once "../model/basedatos.php";

    $conn = connDB();

    if(isset($_POST['user']) && !empty($_POST['user']) &&
     isset($_POST['pass']) && !empty($_POST['pass'])){

        $nick= $_POST['user'];
        $p= $_POST['pass'];

        $pass_query= "SELECT pass FROM usuarios WHERE nick = '$nick'";

        $resultado = consulta($conn, $pass_query);

        extract($resultado);

        if(password_verify($p,$pass)){
            $query = "SELECT * FROM usuarios WHERE nick = '$nick' AND pass= '$pass' ";
    
            $resultado = consulta($conn, $query);
            $resultado["codigo"]=1;
            $_SESSION['id_usuario'] = $resultado['id_usuarios'];
            echo (json_encode($resultado));
        }else{
            
            echo(json_encode(array("error"=>"-1")));
        }
     }
?>