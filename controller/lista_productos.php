<?php
require_once "../model/basedatos.php";

$conn= connDB();
$query= "SELECT * FROM PRODUCTOS";

$res =listado($conn,$query);


mysqli_close($conn);

echo json_encode($res);
?>