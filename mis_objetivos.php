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
            <div>
                Añadir receta
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
                Tabla con recetas
                <table id="table_id" class="display">
                    <thead>
                        <tr>
                            <th>Column 1</th>
                            <th>Column 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Row 1 Data 1</td>
                            <td>Row 1 Data 2</td>
                        </tr>
                        <tr>
                            <td>Row 2 Data 1</td>
                            <td>Row 2 Data 2</td>
                        </tr>
                    </tbody>
                </table>
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