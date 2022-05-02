<?php
    // require_once "../model/basedatos.php";

    // //Listado de recetas que no son del usuario logado
            
    // $id =$_POST['id_usuario'];
    // // $query= "SELECT f.id_favorita, f.id_rec, u.id_usuarios, r.nombre_receta, u.nick  FROM favoritas f, recetas r, usuarios u
    // //             WHERE r.id_recetas = f.id_rec
    // //             AND r.id_recetas = rp.id_r
    // //             AND rp.id_p = p.id_producto 
    // //             AND f.id_usu= $id";

    // $query = "SELECT f.id_favorita, f.id_rec, u.id_usuarios, r.id_usuario, r.nombre_receta, u.nick  FROM favoritas f, recetas r, usuarios u
    //             where f.id_rec = r.id_recetas
    //             and f.id_usu = u.id_usuarios
    //             and f.id_usu = $id";

    // $conn= connDB();

    // $res =listado($conn,$query);

    // echo (json_encode($res));
    // mysqli_close($conn);
?>