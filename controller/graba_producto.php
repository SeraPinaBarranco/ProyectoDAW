<?php 
    require_once "../model/basedatos.php";

    $nombre= $_POST['nombre'];
    $calorias= $_POST['calorias'];
    $grasas= $_POST['grasas'];
    $hidratos= $_POST['hidratos'];
    $proteinas= $_POST['proteinas'];
    
    $query = "INSERT INTO productos (nombre_p, calorias, grasas, hidratos, proteinas) VALUES ('$nombre','$calorias','$grasas','$hidratos','$proteinas');";

    $con = connDB();

    
    $resultado = guardar($con, $query);

    

    echo $_POST['nombre'] . " -- " . $_POST['calorias'];

    mysqli_close($con);
?>