<?php
require_once "../model/basedatos.php";

$id_u= $_POST['id_u'];
$fecha= $_POST['fecha'];

$query = "select id_objetivo from objetivos where id_usu = $id_u and fecha='$fecha'";
$db = connDB();
$filas = consulta($db,$query);

//$filas['codigo'] = mysqli_affected_rows($db);
if(is_null($filas)){
    echo json_encode(array("codeError"=>"null","id_objetivo"=>-1));
}else{
    $filas['codeError'] = "100";
    echo json_encode($filas);
}

mysqli_close($db);
    
?>