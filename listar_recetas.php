<?php
session_start();

require_once "model/basedatos.php";
$eliminado = false;
//Borrar la receta
if (isset($_POST['id_recetas'])) {
    $conn = connDB();
    $id = $_POST['id_recetas'];
    $query = "DELETE FROM recetas WHERE id_recetas = $id";

    $r = selectBBDD($conn, $query);

    if ($r == 1) {
        $eliminado = true;
    }



    cerrarBD($conn);
}

//Editar receta
if (isset($_GET['p'])) {
    echo "pp";
}

?>



<?php include_once "templates/title.html" ?>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<title>Listado de recetas</title>
<link rel="stylesheet" href="styles/style_list_recetas.css">
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript" src="js/listar_recetas_otros.js" defer></script>
</head>

<body>
    <?php include_once "templates/cabecera.html" ?>

    <!-- si por GET no viene na vienen las recetas del usuario -->
    <?php if (!isset($_GET['otros'])) { ?>
        <div class="container">
            <div class="row ">
                <h3 class="text-center">Listado de recetas</h3>
                <h3 class="text-center">creadas por mi</h3>
            </div>
        </div>

        <!-- LISTADO DE RECETAS -->
        <div class="container col-6 mt-3">
            <div class="row">
                <form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Receta</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            //Mostrar la recetas por el usuario logado
                            require_once("model/basedatos.php");
                            $con = connDB();
                            $query = "SELECT * FROM recetas WHERE id_usuario = " . intval($_SESSION['id_usuario']) . "  ORDER BY nombre_receta"; //falta filtrar por id de usuario

                            $resultado = selectBBDD($con, $query);

                            while ($fila = mysqli_fetch_assoc($resultado)) {
                                echo "<tr>";
                                echo "<td>" . $fila['nombre_receta'] . "</td>";
                                echo "<td><a href='editar_receta.php?id_receta=" . $fila['id_recetas'] . "'><img src='assets/pencil.png' alt=''></a> <button type='submit' name='id_recetas' value='" . $fila['id_recetas'] . "'><img src='assets/delete.png' alt=''></button></td>";
                                echo "</tr>";
                            }
                            ?>
                            </tr>

                        </tbody>
                    </table>
            </div>

            <div class="row">
                <?php

                if ($eliminado) {
                    echo "<script>setTimeout(() => {
                                window.location.replace('./listar_recetas.php');                
                                }, 2000);</script>";

                    //header("Refresh: 2; url=" . "index.php");
                    echo "<h4 class='badge bg-danger'>eliminado</h4>";
                    $eliminado = false;
                } else {
                    echo "";
                }
                ?>

            </div>
            </form>

        </div>

        <!--  Si vienen datos por GET muestra las recetas de OTROS usuarios -->
    <?php } elseif (isset($_GET['otros'])) { ?>

        <div class="container">
            <div class="row ">
                <h3 class="text-center">Listado de recetas</h3>
                <h3 class="text-center">creadas por otros usuarios</h3>
            </div>
        </div>

        <!-- LISTADO DE RECETAS -->
        <!-- Le he quitado el form para que no envie nada y tratarlo todo en JS -->
        <div class="container col-6 mt-3">
            <div class="row">
                <!-- Aqui se mostraran el detalle de la receta seleccionada -->
                <!-- <div class='ver_receta' id='ver_receta'>
                    <ul id='lista_ver'></ul>
                </div> -->


                <!-- <form method="POST" id="form" action="">  -->
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Receta</th>
                            <th scope="col">Usuario</th>
                            <th style="text-align: center;" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        //Mostrar la recetas menos las del usuario logado
                        require_once("model/basedatos.php");
                        $con = connDB();
                        $query = "SELECT * FROM recetas r, usuarios u 
                                WHERE r.id_usuario = u.id_usuarios                                
                                AND r.id_usuario <> " . intval($_SESSION['id_usuario']) . "  ORDER BY nombre_receta"; //falta filtrar por id de usuario

                        $resultado = selectBBDD($con, $query);


                        /* 
                            ! Falta añadir las acciones a la receta
                            !    como añadirla a favoritos de un usuario
                            !    o a tu receta para consumir
                            */

                        while ($fila = mysqli_fetch_assoc($resultado)) {
                            echo "<tr>";
                            echo "<td>" . $fila['nombre_receta'] . "</td>";
                            echo "<td>" . $fila['nombre'] . "</td>";
                            echo "<td style='text-align: center;' ><a href='#' data-bs-toggle='modal' data-bs-target='#exampleModal'
                                    onclick='ver_receta(" .  $fila['id_recetas'] . ", this)'><img src='assets/ver.png' alt='Ver receta'></a> 
                                            <a href='#' onclick='agregar_favorita(" .  $fila['id_recetas'] . ", this,". $_SESSION['id_usuario'] ." )' ><img src='assets/anadir.png' alt='añadir a favoritas'></a> </td>";
                            echo "</tr>";
                        }

                        ?>
                        
                        <!-- data-bs-toggle="modal" data-bs-target="#exampleModal" -->

                    </tbody>
                </table>
            </div>

            <div class="row">
                <?php

                if ($eliminado) {
                    echo "<script>setTimeout(() => {
                                window.location.replace('./listar_recetas.php');                
                                }, 2000);</script>";

                    //header("Refresh: 2; url=" . "index.php");
                    echo "<h4 class='badge bg-danger'>eliminado</h4>";
                    $eliminado = false;
                } else {
                    echo "";
                }
                ?>

            </div>
            <!-- </form>  -->
        </div>
    <?php } ?>


    <!-- Vertically centered modal -->
    <!-- <div class="modal-dialog modal-dialog-centered">
        ...
    </div> -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-body">
                    <div class="row" id="div_detalle">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <!-- <button type="button" class="btn"><img src='assets/anadir.png' alt='añadir a favoritas'></button> -->
                </div>
            </div>
        </div>
    </div>


    <?php include_once "templates/pie.html" ?>
</body>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

</html>