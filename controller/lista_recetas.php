<?php 
    require_once "../model/basedatos.php";


            
    $nombre =$_POST['nombre'];
    $query= "SELECT id_recetas FROM RECETAS WHERE nombre_receta = '$nombre'";

    $conn= connDB();

    $res =listado($conn,$query);

    echo json_encode($res);
    mysqli_close($conn);
    

?>