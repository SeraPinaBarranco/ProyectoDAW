<?php
    require_once "../model/basedatos.php";

    // //Listado de recetas que no son del usuario logado
            
    $id_objetivo =$_POST['id_obj'];
    
    $query ="SELECT so.id_obj_detalle, r.id_recetas as idr, r.nombre_receta, so.sumaCal as tcalorias, so.sumaGra as tgrasas,
                so.sumaHid as thidratos, so.sumaPro as tproteinas FROM sumaobjetivos so, recetas r
                WHERE  so.receta = r.id_recetas
                AND so.ib_obj= $id_objetivo";

   
    $conn= connDB();

    $res =listado($conn,$query);

    
    
    // if(count($res) == 0){
    //     echo (json_encode("cero"));
    // }else{
        //}
    $tabla= "";
    foreach ($res as $key => $fila) {
        $id_od= $fila['id_obj_detalle'];
        $id =$fila['idr'];
        $n =$fila['nombre_receta'];
        $c =$fila['tcalorias'];
        $g =$fila['tgrasas'];
        $h =$fila['thidratos'];
        $p =$fila['tproteinas'];

        $tabla.= "
            
            <tr>
                <td hidden id='od'>$id_od</td>
                <td hidden>$id</td>
                <td>$n</td>
                <td>$c</td>
                <td>$g</td>
                <td>$h</td>
                <td>$p</td>
                <td><a href='#' class='btn btn-danger' onclick='borrarFila($id_od, this.parentNode)'>X</td>
            </tr>";
    }
   
    
    echo $tabla;
    //echo json_encode($res);
    mysqli_close($conn);
?>