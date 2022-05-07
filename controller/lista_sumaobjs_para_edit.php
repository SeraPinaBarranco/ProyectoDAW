<?php
    require_once "../model/basedatos.php";

    // //Listado de recetas que no son del usuario logado
            
    $id_objetivo =$_POST['id_objetivo'];
    
    $query ="SELECT r.id_recetas as idr, r.nombre_receta, so.sumaCal as tcalorias, so.sumaGra as tgrasas,
                so.sumaHid as thidratos, so.sumaPro as tproteinas FROM sumaobjetivos so, recetas r
                WHERE  so.receta = r.id_recetas
                AND so.ib_obj= $id_objetivo";

    $conn= connDB();

    $res =listado($conn,$query);

  

    // if(count($res) == 0){
    //     echo (json_encode("cero"));
    // }else{
        //}
        
    echo json_encode($res);
    //echo json_encode($query);
    mysqli_close($conn);
?>