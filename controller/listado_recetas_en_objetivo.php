<?php

    //^ Devuelve una flia de tabla para añadir al listado

    require_once "../model/basedatos.php";
    $id_obj_detalle= $_POST['id_obj_detalle'];
    $id_r= $_POST['id_r'];
    $id_u= $_POST['id_u'];
    

    $query = "SELECT r.id_recetas, r.nombre_receta, 
                sum(total_calorias) as tcalorias, sum(total_grasas) as tgrasas, 
                sum(total_hidratos) as thidratos, sum(total_proteinas) as tproteinas 
                FROM recetas r, recetas_productos rp
                WHERE r.id_recetas = rp.id_r    
                AND rp.id_r= $id_r
                GROUP BY r.id_recetas";

    $db = connDB();
    $filas = consulta($db,$query);

    //$filas['codigo'] = mysqli_affected_rows($db);
    /*
    id_recetas: "137"
    nombre_receta: "Arroz Rebe"
    tcalorias: "11182"
    tgrasas: "12"
    thidratos: "372"
    tproteinas: "2444"
    */
    $id= $filas['id_recetas'];
    $n= $filas['nombre_receta'] ; 
    $c= round(floatval($filas['tcalorias']),2);
    $g= round(floatval($filas['tgrasas']),2);
    $h= round(floatval($filas['thidratos']),2);
    $p= round(floatval($filas['tproteinas']),2);

    echo "<tr>
            <td hidden>$id_obj_detalle</td>
            <td hidden>$id</td>
            <td>$n</td>
            <td>$c</td>
            <td>$g</td>
            <td>$h</td>
            <td>$p</td>
            <td><a href='#' class='btn btn-danger' onclick='borrarFila(0,this.parentNode)'>X</td>
    ";
    
        //$filas['codeError'] = "100";
    //echo ($filas);
    

    mysqli_close($db);


?>

