<?php

use function PHPSTORM_META\type;

    require_once "../model/basedatos.php";

    $id_u= $_POST['id_u'];
    $fecha= $_POST['fecha'];
    $calorias= $_POST['inputC'];
    $grasas= $_POST['inputG'];
    $hidratos= $_POST['inputH'];
    $proteinas= $_POST['inputP'];
    
    $query = "INSERT INTO objetivos (id_usu, fecha, objCal, objGra, objHid, objPro) VALUES ('$id_u','$fecha',$calorias,$grasas,$hidratos,$proteinas)";

    $con = connDB();

    $num= duplicados($con,$query);


    $resultado = guardar2($con, $query);    
    //$resultado, $codigo
    

    //Traer el id del objetivo    
    $query = "select id_objetivo from objetivos where id_usu = $id_u and fecha='$fecha'";
    $id = consulta($con,$query);
    extract($id);

    $resultado['id_obj'] = $id_objetivo;
    

    
    //$resultado["id_objetivo"] = $id_objetivo;

    echo json_encode($resultado) ;

    mysqli_close($con);
?>