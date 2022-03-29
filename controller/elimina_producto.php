<?php 
    require_once "../model/basedatos.php";

    $data = intval($_POST['id']);
    


    //echo($_REQUEST['grasas']);
    //$nombre= $_POST['nombre'];
    //$calorias= $_POST['calorias'];
    //$grasas= $_POST['grasas'];
    //$hidratos= $_POST['hidratos'];
    //$proteinas= $_POST['proteinas'];

    //echo $nombre;
    
    $query = "DELETE FROM productos WHERE id_producto=" . $data . ";";

    $con = connDB();

    // //$num= duplicados($con,$query);


    $resultado = borrar($con, $query);

    

    echo $resultado;

    mysqli_close($con);
?>