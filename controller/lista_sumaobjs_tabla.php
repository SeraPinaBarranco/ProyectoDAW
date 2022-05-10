<?php
    require_once "../model/basedatos.php";

    // //Listado de recetas que no son del usuario logado
            
    $id_objetivo =$_POST['id_obj'];
    
    $query ="SELECT r.id_recetas as idr, r.nombre_receta, so.sumaCal as tcalorias, so.sumaGra as tgrasas,
                so.sumaHid as thidratos, so.sumaPro as tproteinas FROM sumaobjetivos so, recetas r
                WHERE  so.receta = r.id_recetas
                AND so.ib_obj= $id_objetivo";

    $conn= connDB();

    $res =consulta($conn,$query);

  

    // if(count($res) == 0){
    //     echo (json_encode("cero"));
    // }else{
        //}
        
    //echo $res;
    $id =$res['idr'];
    $n =$res['nombre_receta'];
    $c =$res['tcalorias'];
    $g =$res['tgrasas'];
    $h =$res['thidratos'];
    $p =$res['tproteinas'];

    $tabla= "

            <tr>
                <th>id</th>
                <th>Receta</th>
                <th>Calorias</th>
                <th>Grasas</th>
                <th>Hidratos</th>
                <th>Proteinas</th>
            </tr>
            <tr>
                <th>$id</th>
                <th>$n</th>
                <th>$c</th>
                <th>$g</th>
                <th>$h</th>
                <th>$p</th>

            </tr>
        ";

    echo $res;
    mysqli_close($conn);
?>