<?php 
    require_once "../model/basedatos.php";

    
    $receta= $_POST['receta'];
    
    
    $query = "INSERT INTO recetas
                (
                    nombre_receta, id_usuario
                )
                VALUES
                (
                    '$receta',1
                );
    ";

    $con = connDB();

    $resultado = guardar($con, $query);
    $num= duplicados($con);

    mysqli_close($con);


    if($num == -1){
        echo json_encode(array("error" => "Receta duplicada"));

    }else{
        echo json_encode(array("guardado" => "Receta guardada con éxito"));
    }
    

    
    


?>