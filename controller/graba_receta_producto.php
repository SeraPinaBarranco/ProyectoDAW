<?php 
    require_once "../model/basedatos.php";


    

    
    $receta= $_POST['receta'];
    $id_p=$_POST['id_p'];
    $cantidad= $_POST['cantidad'];

    
    $query = "INSERT INTO recetas_productos
        (id_p,
         id_r,
         cantidad
        )
        VALUES
             ($id_p,$receta,$cantidad);";

    $con = connDB();

    $resultado = guardar($con, $query);
   
    echo ($resultado);

    mysqli_close($con);

?>