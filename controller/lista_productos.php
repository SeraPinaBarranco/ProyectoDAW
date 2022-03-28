<?php
require_once "../model/basedatos.php";

$conn= connDB();
$query= "SELECT * FROM PRODUCTOS";

$res =listado($conn,$query);



echo json_encode($res);


mysqli_close($conn);
//echo json_encode($filas);

?>