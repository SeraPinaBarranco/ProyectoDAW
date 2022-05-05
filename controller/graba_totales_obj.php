<?php
require_once "../model/basedatos.php";

$id_obj= $_POST['id_obj'];
$id_u= $_POST['id_u'];
$id_r= $_POST['id_r'];
$tcalorias= $_POST['tcalorias'];
$tgrasas= $_POST['tgrasas'];
$thidratos= $_POST['thidratos'];
$tproteinas= $_POST['tproteinas'];

$query = "INSERT INTO sumaobjetivos(ib_obj, id_usu, sumaCal, sumaGra, sumaHid, sumaPro, receta) 
            VALUES ($id_obj,$id_u,$tcalorias,$tgrasas,$thidratos,$tproteinas,$id_r)";

$db = connDB();

$filas = selectBBDD($db,$query);



echo json_encode($filas);


mysqli_close($db);
    
?>