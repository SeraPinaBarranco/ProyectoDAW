<?php 
    require_once "../model/basedatos.php";

    $id_obj_detalle = $_POST['id_obj_detalle'];

    
    //echo $nombre;
    
    $query = "DELETE FROM sumaobjetivos WHERE id_obj_detalle= $id_obj_detalle;";

    $con = connDB();

    // //$num= duplicados($con,$query);


    $resultado = borrar($con, $query);

    

    echo $resultado;

    mysqli_close($con);
?>