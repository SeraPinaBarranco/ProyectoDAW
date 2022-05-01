<?php
    require_once "../model/basedatos.php";

    //Listado de recetas que no son del usuario logado
            
    $id =$_POST['id_usuario'];
    $query= "SELECT * FROM recetas r, favoritas f, recetas_productos rp, productos p
                WHERE r.id_recetas = f.id_rec
                AND r.id_recetas = rp.id_r
                AND rp.id_p = p.id_producto 
                AND f.id_usu= $id";

    $conn= connDB();

    $res =listado($conn,$query);

    echo (json_encode($res));
    mysqli_close($conn);
?>