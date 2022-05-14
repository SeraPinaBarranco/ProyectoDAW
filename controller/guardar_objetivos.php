<?php
    require_once "../model/basedatos.php";
    
    $boton = $_POST['boton'];
    $id_u= $_POST['id_u'];
    $fecha= $_POST['fecha'];
    $calorias= $_POST['inputC'];
    $grasas= $_POST['inputG'];
    $hidratos= $_POST['inputH'];
    $proteinas= $_POST['inputP'];
    
    $query = "select id_objetivo from objetivos where id_usu = $id_u and fecha='$fecha'";
    $con = connDB();
    $consulta= selectBBDD($con,$query);
    $num= obtener_num_filas($consulta); // * Obtengo si la consulta devuelve resultados 1*-SI, 0-NO

    //echo json_encode($query);

    mysqli_close($con);

    
    
    // * Si el boton pulsado es guardar
    if($boton == "Guardar"){
        if($num == 0){
            $query = "INSERT INTO objetivos (id_usu, fecha, objCal, objGra, objHid, objPro) VALUES ($id_u,'$fecha',$calorias,$grasas,$hidratos,$proteinas)";
            // echo json_encode($query);
            $db = connDB();
           
            $resultado = guardar2($db, $query);  // * Array con el resultado de guardar
           
            // // //Traer el id del objetivo    
            $query = "select id_objetivo from objetivos where id_usu = $id_u and fecha='$fecha'";
            $id = consulta($db,$query);
            //var_dump($id);
            extract($id);    
    
            $resultado['id_objetivo'] = $id_objetivo; // *Añadir al array de la consulta el resultado de la consulta
                     
            echo json_encode($resultado);
            
            mysqli_close($db);
        }else{
            echo( json_encode(array("filas"=>$num))) ;
            //mysqli_close($db);
        }
    }elseif($boton == "Editar"){
        // * Editar
        $query = "UPDATE objetivos SET objCal=$calorias, objGra=$grasas, objHid=$hidratos, objPro=$proteinas WHERE id_usu = $id_u and fecha = '$fecha'";
        $db = connDB();
        $update = selectBBDD($db,$query);

        $filas['codigo'] = mysqli_affected_rows($db);

        echo json_encode($filas);
        mysqli_close($db);
    }    

?>