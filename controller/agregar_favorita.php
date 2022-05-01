<?php  

require_once "../model/basedatos.php";

    
$id_receta= intval($_POST['id_receta']);
$id_usuario = intval($_POST['id_usuario']);

$con = connDB();
//buscar duplicados
//buscar duplicados
$query_duplicados="SELECT id_usu, id_rec FROM favoritas
WHERE id_rec= $id_receta AND id_usu=$id_usuario";

$duplicado= selectBBDD($con, $query_duplicados);

$n_duplicados= duplicados($con);

if($n_duplicados > 0){
    echo json_encode(array("msg" => 0));
}else{
    //echo json_encode(json_encode(array("error" => $n_duplicados)));
    //Guardar la receta como favorita
    
    $query = "INSERT INTO favoritas(id_usu, id_rec) VALUES ($id_usuario ,$id_receta)";

    $resultado = guardar($con, $query);
    $num= duplicados($con);
    
    if($num > 0){
        echo json_encode(array("msg" => 1));
    }else{
        echo json_encode(array("msg" => 0));
    }
}



mysqli_close($con);



?>