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
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body>
    <?php include_once "templates/cabecera.html" ?>

    <div class="contenedor">
        <div class="col1" id="col1">
            <h5>Establecer objetivos</h5>

            <!-- <form id="form"> -->
                <div class="div-fecha">
                    <input type="date" name="fecha" id="fecha">
                    <button id="guardar" class="btn btn-success" onclick="guardarObjetivoTraerIdObjetivo()">Guardar</button>
                    <a href="#" id="cancelar" class="btn btn-danger" hidden>Cancelar</a>
                </div>
                <div class="cantidades-objetivo mb-4">
                    <ul class="ul-cantidades-objetivo">
                        <li>
                            <label for="objCal">Calorias
                                <input class="objetivo" value="" type="number" name="objCal" id="objCal" required>
                            </label>
                        </li>
                        <li>
                            <label for="objGra">Grasas
                                <input class="objetivo" type="number" name="objGra" id="objGra" required>
                            </label>
                        </li>
                        <li>
                            <label for="objHid">Hidratos
                                <input class="objetivo" type="number" name="objHid" id="objHid" required>
                            </label>
                        </li>
                        <li>
                            <label for="objPro">Proteinas
                                <input class="objetivo" type="number" name="objPro" id="objPro" required>
                            </label>
                        </li>
                    </ul>
    
                </div>                
            <!-- </form> -->

            <div class="botones mt-3">
               <a class="boton btn-mis btn btn-primary" id="mis">De mis recetas</a>
               <a class="boton btn-fav btn btn-primary" id="fav">De favoritos</a>
            </div>
            
        </div>

        <div class="col2">
            <div>
                <h3>Elegir recetas</h3>
            </div>
            <div class="tabla-recetas">
                <h4>Mis favoritas</h4>
                <div class="div-tabla">
                    <table class="tabla" id="tabla">
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
                                    echo "<td class='masverde'><a href='#' onclick='addRecetaListado(". $fila['id_rec'] .", ". $fila['id_usuarios'] .")'><img src='assets/plus.png'></a></td>";
                                    echo "</tr>";
                                 }
                            ?>
                        </tbody>
                    </table>

                </div>
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
                                    echo "<td><a href='#' onclick='addRecetaListado(". $fila['id_recetas'] .", $id)'><img src='assets/plus.png'></a></td>";
                                    echo "</tr>";
                                 }
                            ?>
                            
                        </tbody>
                    </table>

                </div>
            </div>
            
        </div>

        <div id="col4" class="col4" style="display: none;">
            <!-- <form action="#" id="frm-totales">                        
             <ul class="ulDetalle" id="ulDetalle">

            </ul>--> 
            <table class="table  table-stripped" id="tablaADD">
                <caption><a href="#" class="btn btn-primary" id="guardaRecetasAlDia" onclick="guarda_RecetasAlDia()">Guardar Recetas al día</a></caption>
                <thead>
                    <tr>
                        <th hidden>id</th>
                        <th>Nombre</th>
                        <th>Calorias</th>
                        <th>Grasas</th>
                        <th>Hidratos</th>
                        <th>Proteinas</th>
                        <th>Acciones</th>
                    </tr>            
                </thead>
                <tbody id="myBody">

                </tbody>
                <tfoot id="pieTabla">

                </tfoot >
            </table>
            <!-- </form> -->
        </div>
    </div>
    <div class="agregarDia col-3" style="text-align: right; margin-left:2vw; display:none" id="agregarDia">
        <button class="btn btn-primary" id="btnAgregarDia">Añadir recetas al día</button>
    </div>
    
    <span id="usuario" hidden><?php echo $_SESSION['id_usuario'] ?></span>
    <span id="o" hidden></span>
    <span id="id_obj_oculto" hidden></span>

    <?php include_once "templates/pie.html" ?>
</body>
<!-- <script src="js/configuracion.js" defer></script> -->
    <?php 
        echo  "<script>const id_usu =" . $_SESSION['id_usuario'] ." </script>"
    ?> 
<script src="js/misObjetivos_general.js" defer></script>
<script src="js/obj_funciones2.js" defer></script>
<!-- <script src="js/funciones_del_objetivo.js" defer></script> -->
<!-- <script src="js/objetivos.js" defer></script>
<script src="js/objetivos2.js" defer></script> -->
<script src="js/data-tables.js"></script>

</html>