<?php
session_start();
//echo $_SESSION['nombre'];

?>



<?php include_once "templates/title.html"; ?>
<title>Mis objetivos</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="styles/objetivos.css">
<link rel="stylesheet" href="styles/data-tables.css">
<script src="js/objetivos.js" defer></script>
</head>

<body>
    <?php include_once "templates/cabecera.html" ?>

    <div class="contenedor">
        <div class="col1">
            <div>
                <input type="date" name="fecha" id="fecha">
            </div>
            <div class="mt-3">
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
                <h4>Mis favoritas</h4>
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
<script src="js/data-tables.js"></script>

</html>