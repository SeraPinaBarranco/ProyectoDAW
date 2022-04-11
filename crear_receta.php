<title>Editar producto</title>
<?php include_once "templates/title.html" ?>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<script type="text/javascript" src="js/crear_receta.js" defer></script>
<link rel="stylesheet" href="styles/stl_crea_receta.css">

</head>

<body>
<?php include_once "templates/cabecera.html" ?>

<div class="div-form">
        <div class="fila">
            <h2>Listado de alimentos</h2>
        </div>
</div>

<div class="contenedor-receta">
    <div class="div-contenedor-receta cont1">
        <div class="div_receta" >
            <form name="formulario" action="controller/guardar_receta.php" id="frm" method="post">
                <label for="receta">Nombre Receta</label>
                <input type="text" name="receta" id="receta">
                <div class="div_guardarNombreReceta">                
                    <button  id="guardarNombreReceta" class="guardarNombreReceta">Guardar</button>
                </div>
            </form>

            <div class="div-ingredientes">
                <ul id="ingredientes">
                    
                </ul>
            </div>
        </div>
    </div>
    <div class="div-contenedor-receta cont2">
        <div class="div_receta ">
            <div class="div-buscador">
                <input class="btn-buscador" id="btn-buscador" type="text" value="" placeholder=" Escribe ingrediente a buscar">
            </div>
        <table id="tabla" class="my-table" >
        <thead>
            <tr>
                <th>Producto</th>
            
                <th>Añadir</th>
            </tr>
        </thead>
        <tbody>
            <!-- Los datos se cargaran dinamicamente -->
        </tbody>
        <tfoot>
            
        </tfoot>
    </table>
        </div>

       

    </div>
</div>

    
<?php include_once "templates/pie.html" ?>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>

</html>

