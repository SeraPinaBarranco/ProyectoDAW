<?php 
    require_once "../model/basedatos.php";

    $nombre= strtoupper($_POST['nombre']);
    $calorias= $_POST['calorias'];
    $grasas= $_POST['grasas'];
    $hidratos= $_POST['hidratos'];
    $proteinas= $_POST['proteinas'];
    
    $query = "INSERT INTO productos (nombre_p, calorias, grasas, hidratos, proteinas) VALUES ('$nombre','$calorias','$grasas','$hidratos','$proteinas');";

    $con = connDB();

    //$num= duplicados($con,$query);


    $resultado = guardar($con, $query);

    

    echo $resultado;

    mysqli_close($con);
?>