<?php
    require_once "../model/basedatos.php";

    $obj = $_POST['id_objetivo'];

    //* Consulta que trae SUMAOBJETIVOS
    $query = "SELECT r.id_recetas as idr, r.nombre_receta as nombre_receta, so.sumaCal as tcalorias,
	                so.sumaGra as tgrasas, so.sumaHid as thidratos, so.sumaPro as tproteinas FROM objetivos o, sumaobjetivos so, usuarios u, recetas r
                WHERE o.id_objetivo = so.ib_obj
                AND o.id_usu = u.id_usuarios
                and so.receta = r.id_recetas 
                and o.id_objetivo = $obj";
    $con = connDB();
    $consulta= selectBBDD($con,$query);
    $result= listado($con, $query);

    mysqli_close($con);

    //* Consulta que trae el OBJETIVO
    $queryObj="SELECT  * FROM objetivos WHERE id_objetivo = $obj";
    $conObj= connDB();
    $consultaObj= selectBBDD($conObj,$queryObj);
    $resultObj= listado($conObj, $queryObj);
    
    $datosDevueltos = array();
    $datosDevueltos['objetivo'] = $resultObj;
    $datosDevueltos['sumaobjetivos'] = $result;
    
    
    //echo json_encode($datosDevueltos);
    echo cargar_objetivos($datosDevueltos);

    mysqli_close($conObj);


    function cargar_objetivos($listado){
      
        //* Visto en formato tabla
        $dia = $listado['objetivo'][0]['fecha'];
        $c= floatval($listado['objetivo'][0]['objCal']);
        $g= floatval($listado['objetivo'][0]['objGra']);
        $h= floatval($listado['objetivo'][0]['objHid']);
        $p= floatval($listado['objetivo'][0]['objPro']);
        $sumaC = 0;
        $sumaG = 0;
        $sumaH = 0;
        $sumaP = 0;
        
        $var= "";
        $var .= "
                <table class='table table-hover table-bordered table-sm' id='tabla-totales'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Calorias</th>
                            <th>Grasas</th>
                            <th>Hidratos</th>
                            <th>Proteinas</th>
                        </tr>                
            
                        <tr>
                            <td>$dia</td>
                            <td>$c</td>
                            <td>$g</td>
                            <td>$h</td>
                            <td>$p</td>

                        </tr>
                    </thead>";

        $var.= "<tbody>
                    <tr>
                        <th>Receta</th>
                        <th>Tot.Calorias</th>
                        <th>Tot.Grasas</th>
                        <th>Tot.Hidratos</th>
                        <th>Tot.Proteinas</th>
                    </tr>";
                    for ($i=0; $i < count($listado['sumaobjetivos']); $i++) {
                        $nr= $listado['sumaobjetivos'][$i]['nombre_receta'];
                        $tc= floatval($listado['sumaobjetivos'][$i]['tcalorias']);
                        $tg= floatval($listado['sumaobjetivos'][$i]['tgrasas']);
                        $th= floatval($listado['sumaobjetivos'][$i]['thidratos']);
                        $tp= floatval($listado['sumaobjetivos'][$i]['tproteinas']);

                        $var.= "<tr>";

                        //* Crear etiquetas segun el si el objetivo es mayor, menor o igual a la suma
                        $comparCal=  $c > $tc?"<span class='badge bg-success'>$tc</span>":($c < $tc? "<span class='badge bg-danger'>$tc</span>":"<span class='badge bg-warning'>$tc</span>");
                        $comparGra=  $g > $tg?"<span class='badge bg-success'>$tg</span>":($g < $tg? "<span class='badge bg-danger'>$tg</span>":"<span class='badge bg-warning'>$tg</span>");
                        $comparHid=  $h > $th?"<span class='badge bg-success'>$th</span>":($h < $th? "<span class='badge bg-danger'>$th</span>":"<span class='badge bg-warning'>$th</span>");
                        $comparPro=  $p > $tp?"<span class='badge bg-success'>$tp</span>":($p < $tp? "<span class='badge bg-danger'>$tp</span>":"<span class='badge bg-warning'>$tp</span>");
                        
                        $var.="<td>$nr</td>";
                        $var.="<td>$comparCal</td>";
                        $var.="<td>$comparGra</td>";
                        $var.="<td>$comparHid</td>";
                        $var.="<td>$comparPro</td>";

                        $sumaC += $tc; $sumaG +=$tg; $sumaH += $th; $sumaP += $tp;

                        //$var .= "<li>Receta: , Cal.Totales: , Gra.Totales: , Hid.Totales: , Pro.Totales:   </li>";     
                        $var.="</tr>";
                    }
                    $comparCal=  $c > $sumaC?"<span class='badge bg-success'>$sumaC</span>":($c < $sumaC? "<span class='badge bg-danger'>$sumaC</span>":"<span class='badge bg-warning'>$sumaC</span>");
                    $comparGra=  $g > $sumaG?"<span class='badge bg-success'>$sumaG</span>":($g < $sumaG? "<span class='badge bg-danger'>$sumaG</span>":"<span class='badge bg-warning'>$sumaG</span>");
                    $comparHid=  $h > $sumaH?"<span class='badge bg-success'>$sumaH</span>":($h < $sumaH? "<span class='badge bg-danger'>$sumaH</span>":"<span class='badge bg-warning'>$sumaH</span>");
                    $comparPro=  $p > $sumaP?"<span class='badge bg-success'>$sumaP</span>":($p < $sumaP? "<span class='badge bg-danger'>$sumaP</span>":"<span class='badge bg-warning'>$sumaP</span>");    
                    
                    $var.= "<tr>";
                    
                        $var.="<td style='color:white'>Total</td>";
                        $var.="<td>$comparCal</td>";
                        $var.="<td>$comparGra</td>";
                        $var.="<td>$comparHid</td>";
                        $var.="<td>$comparPro</td>";
                    $var.="</td>";
                    $var.= "</tr>";

        $var.= "</tbody>";
                    $var .="</table>";

        return $var;       
    }

?>

//* Visto en formato lista
        // $var= "";
        // $var .= "<div class='row sumaObjetivos'>";

        // //Variables de la receta
        // $dia = $listado['objetivo'][0]['fecha'];
        // $c= floatval($listado['objetivo'][0]['objCal']);
        // $g= floatval($listado['objetivo'][0]['objGra']);
        // $h= floatval($listado['objetivo'][0]['objHid']);
        // $p= floatval($listado['objetivo'][0]['objPro']);
       
        // $var = "<h4 class='mb-4'>Ojetivos del dia: $dia, Calorias: $c, Grasas: $g, Hidratos: $h, Proteinas: $p </h4>";            
       

        // $var .= "<ul class='ulSO mt-3'>";
        // for ($i=0; $i < count($listado['sumaobjetivos']); $i++) {
        //     $nr= $listado['sumaobjetivos'][$i]['nombre_receta'];
        //     $tc= floatval($listado['sumaobjetivos'][$i]['tcalorias']);
        //     $tg= floatval($listado['sumaobjetivos'][$i]['tgrasas']);
        //     $th= floatval($listado['sumaobjetivos'][$i]['thidratos']);
        //     $tp= floatval($listado['sumaobjetivos'][$i]['tproteinas']);

        //     //* Crear etiquetas segun el si el objetivo es mayor, menor o igual a la suma
        //     $comparCal=  $c > $tc?"<span class='badge bg-success'>$tc</span>":($c < $tc? "<span class='badge bg-danger'>$tc</span>":"<span class='badge bg-warning'>$tc</span>");
        //     $comparGra=  $c > $tc?"<span class='badge bg-success'>$tc</span>":($h < $th? "<span class='badge bg-danger'>$th</span>":"<span class='badge bg-warning'>$th</span>");
        //     $comparHid=  $g > $tg?"<span class='badge bg-success'>$tg</span>":($g < $tg? "<span class='badge bg-danger'>$tg</span>":"<span class='badge bg-warning'>$tg</span>");
        //     $comparPro=  $p > $tp?"<span class='badge bg-success'>$tp</span>":($p < $tp? "<span class='badge bg-danger'>$tp</span>":"<span class='badge bg-warning'>$tp</span>");

        //     $var .= "<li>Receta: $nr, Cal.Totales: $comparCal, Gra.Totales: $comparGra, Hid.Totales: $comparHid, Pro.Totales: $comparPro  </li>";     
        // }
        // $var .= "</ul>";       
        // $var.="</div>";