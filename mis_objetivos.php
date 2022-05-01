<?php
session_start();
//echo $_SESSION['nombre'];

?>



<?php include_once "templates/title.html"; ?>
<title>Mis objetivos</title>
<link rel="stylesheet" href="styles/objetivos.css">
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
            <div>
                Tabla con recetas
            </div>
            <div>
                Datos
            </div>
        </div>
    </div>


    <?php include_once "templates/pie.html" ?>
</body>

</html>