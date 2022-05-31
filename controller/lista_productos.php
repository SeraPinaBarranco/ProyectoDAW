<?php
require_once "../model/basedatos.php";

if(!empty($_POST['nombre'])){
    $nombre =strtoupper($_POST['nombre']);
    $query= "SELECT * FROM PRODUCTOS WHERE nombre_p LIKE '%$nombre%'";

}else{
    $query= "SELECT * FROM PRODUCTOS ORDER BY nombre_p";
}

$conn= connDB();

$res =listado($conn,$query);



mysqli_close($conn);
echo json_encode($res);


//echo json_encode($filas);

?>