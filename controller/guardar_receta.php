<?php 
    require_once "../model/basedatos.php";

    
    $receta= $_POST['receta'];
    $id_usuario = $_POST['id_usuario'];
    
    $con = connDB();
    //buscar duplicados
    $query_duplicados="SELECT nombre_receta, id_usuario FROM recetas
                        WHERE nombre_receta= '$receta' AND id_usuario=$id_usuario";

    $duplicado= selectBBDD($con, $query_duplicados);

    $n_duplicados= duplicados($con);
    
    //si no hay duplicados, guardar la receta
    if($n_duplicados == 0){
        $query = "INSERT INTO recetas
                (
                    nombre_receta, id_usuario
                )
                VALUES
                (
                    '$receta',$id_usuario
                );
            ";
        $resultado = guardar($con, $query);
        $num= duplicados($con);

        // if($num == -1){
            
        // }else{
            echo json_encode(array("guardado" => "Receta guardada con éxito"));
        //}
    }else{
        echo json_encode(array("error" => "Receta duplicada"));        
    }


    
    
    
    
    
    mysqli_close($con);
    


?>