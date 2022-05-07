<?php
    require_once "../model/basedatos.php";

    $obj = $_POST['id_objetivo'];

    $query = "SELECT r.id_recetas, r.nombre_receta as nombre_receta, so.sumaCal as tcalorias,
	                so.sumaGra as tgrasas, so.sumaHid as thidratos, so.sumaPro as tproteinas FROM objetivos o, sumaobjetivos so, usuarios u, recetas r
                WHERE o.id_objetivo = so.ib_obj
                AND o.id_usu = u.id_usuarios
                and so.receta = r.id_recetas 
                and o.id_objetivo = $obj";

    $con = connDB();
    $consulta= selectBBDD($con,$query);
    $result= listado($con, $query);

    echo json_encode($result);
    
    mysqli_close($con);
?>