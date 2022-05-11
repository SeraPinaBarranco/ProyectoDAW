<?php  

require_once "../model/basedatos.php";

    
$obj= $_POST['obj'];
$usu= $_POST['usu'];
$r= $_POST['r'];
$c= $_POST['c'];
$g= $_POST['g'];
$h= $_POST['h'];
$p= $_POST['p'];


$con = connDB();
//buscar duplicados
//buscar duplicados
$query="INSERT INTO sumaobjetivos (ib_obj, id_usu, sumaCal, sumaGra, sumaHid, sumaPro, receta)
         VALUES ($obj, $usu, $c, $g, $h, $p, $r)";

$resultado = guardar($con, $query);

echo json_encode($query);

mysqli_close($con);



?>