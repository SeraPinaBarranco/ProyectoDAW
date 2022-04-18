<?php 
    require_once "../model/basedatos.php";

    $id_r = intval($_POST['id_r']);
    $id_p = intval($_POST['ing']);


    //echo($_REQUEST['grasas']);
    //$nombre= $_POST['nombre'];
    //$calorias= $_POST['calorias'];
    //$grasas= $_POST['grasas'];
    //$hidratos= $_POST['hidratos'];
    //$proteinas= $_POST['proteinas'];

    //echo $nombre;
    
    $query = "DELETE FROM recetas_productos WHERE id_p=" . $id_p . " and id_r= " . $id_r;

    $con = connDB();

    // //$num= duplicados($con,$query);


    $resultado = borrar($con, $query);

    
    mysqli_close($con);

    echo $resultado;

?>