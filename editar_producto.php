<?php
require_once "./model/basedatos.php";
    $id = $_GET['id'];

    $conn = connDB();  
    
    //obtener la consulta con los datos a editar
    $query= "SELECT * FROM productos WHERE id_producto=".$id;

    //Obtener el array de la consulta
    $result = consulta($conn, $query);  
?>

<title>Editar producto</title>
<?php include_once "templates/title.html" ?>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="js/funciones.js" defer></script>
</head>

<body>
    <?php include_once "templates/cabecera.html" ?>

    <div class="div-form">
        <div class="fila">
            <h2>Añadir producto</h2>
        </div>
    </div>


    <div class="container">
        <form method="post" action="controller/graba_producto.php" id="formulario" class="form-control">
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="Nombre" name="nombre" id="nombre" value="<?php  echo $result["nombre_p"]?>">
            </div>
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="Calorias" name="calorias" value="<?php echo $result["calorias"] ?>">
            </div>
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="Grasas" name="grasas" value="<?php echo $result["grasas"]?>">
            </div>
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="Hidratos" name="hidratos" value="<?php echo $result["hidratos"]?>">
            </div>
            <div class="mb-3">
                <input class="form-control" type="text" placeholder="Proteinas" name="proteinas" value="<?php echo $result["proteinas"]?>">
            </div>
            <div class="div-boton">
                <button class="btn btn-primary" id="guardar" name="guardar">Guardar</button>
            </div>
        </form>
    </div>

    <?php include_once "templates/pie.html" ?>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

</body>

</html>

