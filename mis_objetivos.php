<?php
session_start();
require_once "model/basedatos.php";

// ! LISTADO DE PROPIAS
            
$id =$_SESSION['id_usuario'];
    
$query = "SELECT  r.id_recetas, r.id_usuario, r.nombre_receta FROM recetas r
            WHERE r.id_usuario = $id";

$conn= connDB();

$res =selectBBDD($conn,$query); //^ aqui estan las RECETAS PROPIAS

// ! LISTADO DE FAVORITAS

    $query = "SELECT f.id_favorita, f.id_rec, u.id_usuarios, r.id_usuario, r.nombre_receta, u.nick  FROM favoritas f, recetas r, usuarios u
                where f.id_rec = r.id_recetas
                and f.id_usu = u.id_usuarios
                and f.id_usu = $id";    

    $fav =selectBBDD($conn,$query); //^ aqui estan las RECETAS FAVORITAS

    //echo (json_encode($res));
    mysqli_close($conn);

?>



<?php include_once "templates/title.html"; ?>
<title>Mis objetivos</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="styles/objetivos.css">
<link rel="stylesheet" href="styles/data-tables.css">

</head>

<body>
    <?php include_once "templates/cabecera.html" ?>

    <div class="contenedor">
        <div class="col1">
            <h5>Establecer objetivos</h5>
            <div class="div-fecha">
                <input type="date" name="fecha" id="fecha">
            </div>
            <div class="cantidades-objetivo mb-4">
                <ul class="ul-cantidades-objetivo">
                    <li>
                        <label for="objCal">Calorias
                            <input class="objetivo" type="number" name="objCal" id="objCal" require>
                        </label>
                    </li>
                    <li>
                        <label for="objGra">Grasas
                            <input class="objetivo" type="number" name="objGra" id="objGra" require>
                        </label>
                    </li>
                    <li>
                        <label for="objHid">Hidratos
                            <input class="objetivo" type="number" name="objHid" id="objHid" require>
                        </label>
                    </li>
                    <li>
                        <label for="objPro">Proteinas
                            <input class="objetivo" type="number" name="objPro" id="objPro" require>
                        </label>
                    </li>
                </ul>

            </div>
            <div class="botones mt-3">
               <button class="btn-mis btn btn-primary">De mis recetas</button>
               <button class="btn-fav btn btn-primary">De favoritos</button>
            </div>
            <div>
                Datos
            </div>
        </div>

        <div class="col2">
            <div>
                <h3>Elegir recetas</h3>
            </div>
            <div class="tabla-recetas">
                <h4>Mis favoritas</h4>
                <div class="div-tabla">
                    <table class="tabla">
                        <thead>
                            <tr>
                                <th hidden>id</th>
                                <th hidden>id</th>
                                <th hidden>id</th>
                                <th hidden>id</th>
                                <th>Receta</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php  
                                while($fila = mysqli_fetch_assoc($fav)){
                                    echo "<tr>";
                                    echo "<td class='id_rec' hidden>" . $fila['id_rec'] ."</td>";
                                    echo "<td class='id_usuarios' hidden>" . $fila['id_usuarios'] ."</td>";
                                    echo "<td>" . $fila['nombre_receta'] ."</td>";
                                    echo "<td><button><img src='assets/plus.png'></button></td>";
                                    echo "</tr>";
                                 }
                            ?>
                        </tbody>
                    </table>

                </div>
            </div>
            <div>
                Datos
            </div>
        </div>

        <div class="col3">
            <div>
                <h3>Elegir recetas</h3>
            </div>
            <div class="tabla-recetas">
                <h4>Mis recetas</h4>
                <div class="div-tabla">
                    <table class="tabla">
                        <thead>
                            <tr>
                                <th hidden>id</th>
                                <th>Receta</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php  
                                while($fila = mysqli_fetch_assoc($res)){
                                    echo "<tr>";
                                    echo "<td class='id_receta' hidden>" . $fila['id_recetas'] ."</td>";
                                    echo "<td class='id_usuario' hidden>" . $fila['id_usuario'] ."</td>";
                                    echo "<td>" . $fila['nombre_receta'] ."</td>";
                                    echo "<td><button><img src='assets/plus.png'></button></td>";
                                    echo "</tr>";
                                 }
                            ?>
                            
                        </tbody>
                    </table>

                </div>
            </div>
            <div>
                Datos
            </div>
        </div>
    </div>


    <?php include_once "templates/pie.html" ?>
</body>
<script src="js/objetivos.js" defer></script>
<script src="js/configuracion.js" defer></script>
<script src="js/data-tables.js"></script>

</html>