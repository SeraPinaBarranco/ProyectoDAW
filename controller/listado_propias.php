<?php
    require_once "../model/basedatos.php";

    // //Listado de recetas que no son del usuario logado
            
    $id_r =$_POST['id_r'];
    
    $query ="select r.nombre_receta, sum(rp.total_calorias) as tcalorias,
                sum(rp.total_grasas) as tgrasas,
                sum(rp.total_hidratos) as thidratos,
                sum(rp.total_proteinas) as tproteinas
            from recetas r, recetas_productos rp
            where r.id_recetas = rp.id_r
            and rp.id_r =$id_r";

    $conn= connDB();

    $res =listado($conn,$query);

  

    // if(count($res) == 0){
    //     echo (json_encode("cero"));
    // }else{
    echo json_encode($res);
    //}

    mysqli_close($conn);
?>