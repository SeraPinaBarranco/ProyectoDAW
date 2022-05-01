<?php  
    require_once "../model/basedatos.php";

    //Trae la receta con el id
    $id= $_POST['id_receta'];
    
    $query= "SELECT  p.nombre_p, rp.* FROM RECETAS r, recetas_productos rp , productos p
        WHERE r.id_recetas = rp.id_r
        AND rp.id_p = p.id_producto 
        AND id_recetas = '$id'";



    $conn= connDB();

    $res =listado($conn,$query);

    echo json_encode($res);
    //echo json_encode($query);
    mysqli_close($conn);


?>