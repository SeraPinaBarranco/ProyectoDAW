<?php
require_once "../model/basedatos.php";

$id_obj= $_POST['id_obj'];


$query = "SELECT * FROM objetivos WHERE id_objetivo = $id_obj"; 

$db = connDB();
$filas = consulta($db,$query);


echo json_encode($filas);

mysqli_close($db);
    
?>