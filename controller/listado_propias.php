<?php
    require_once "../model/basedatos.php";

    //Listado de recetas que no son del usuario logado
            
    $id =$_POST['id_usuario'];
    
    $query = "SELECT  r.id_recetas, r.id_usuario, r.nombre_receta FROM recetas r
                WHERE r.id_usuario = $id";

    $conn= connDB();

    $res =listado($conn,$query);

    echo (json_encode($res));
    mysqli_close($conn);
?>