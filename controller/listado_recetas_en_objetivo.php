<?php

    //^ Devuelve una flia de tabla para añadir al listado

    require_once "../model/basedatos.php";

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
    $n= $filas['nombre_receta'];
    $c= $filas['tcalorias'];
    $g= $filas['tgrasas'];
    $h= $filas['thidratos'];
    $p= $filas['tproteinas'];

    echo "<tr>
            <td hidden>$id</td>
            <td>$n</td>
            <td>$c</td>
            <td>$g</td>
            <td>$h</td>
            <td>$p</td>
            <td>borrar</td> </tr>
    ";
    
        //$filas['codeError'] = "100";
    //echo ($filas);
    

    mysqli_close($db);


?>

