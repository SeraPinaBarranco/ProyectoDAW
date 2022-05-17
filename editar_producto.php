<?php
ob_start();
session_start();
require_once "./model/basedatos.php";


    $id = $_GET['id'];

    //almacenar en la session el id que viene por GET
    $_SESSION['id_producto']= $id;

    $conn = connDB();  
    
    //obtener la consulta con los datos a editar
    $query= "SELECT * FROM productos WHERE id_producto=".$id;

    //Obtener el array de la consulta
    $result = consulta($conn, $query);  
?>

<title>Editar producto</title>
<?php include_once "templates/title.html" ?>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>


</head>

<body>
    <?php include_once "templates/cabecera.html" ?>

    <div class="aListar" id="aListar"  style="margin-top: 2vh; width: 90%; text-align: right;">
        <a class="badge bg-primary" href="listar_productos.php">Listar Productos</a>
    </div>

    <div class="div-form">
        <div class="fila">
            <h2>Añadir producto</h2>
        </div>
    </div>


    <div class="container">
        <form method="post" action="<?php $_SERVER['PHP_SELF'] ?>" id="formulario" class="form-control">
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
                <button type="submit" class="btn btn-primary" id="guardar" name="modificar" value="modificar">Modificar</button>
            </div>
        </form>
    </div>

    <?php include_once "templates/pie.html" ?>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    
</body>

</html>

<?php
    
    //si se pulsa en el boton de modificar
    if(isset($_POST['modificar']) && $_POST['modificar']=='modificar'){
        //echo($_SESSION['id_producto']);
        $id_p = $_SESSION['id_producto'];
        $nombre = $_POST["nombre"];
        $calorias= $_POST['calorias'];
        $grasas= $_POST['grasas'];
        $hidratos= $_POST['hidratos'];
        $proteinas= $_POST['proteinas'];
       
        //editar registro
        $consulta= "UPDATE PRODUCTOS SET nombre_p='". $nombre . "'," ." calorias= $calorias,  grasas= $grasas,  hidratos= $hidratos, proteinas= $proteinas  WHERE id_producto=". $id_p;
        
        selectBBDD($conn, $consulta);//obtine -1 si ha habido error o 1 si ha modificado con exito
        $n_filas = duplicados($conn);
        //echo $n_filas;
        if($n_filas==1){                       
            
            header("Refresh: 2; url=listar_productos.php",false);
            echo "<script>Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registro Modificado',
                    showConfirmButton: false,
                    timer: 1500
                    })</script>";
        }else{            
            echo "<script>Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No se ha actualizado el producto',
                showConfirmButton: false,
                timer: 1500
                })</script>";
        }
        cerrarBD($conn);
        
        unset($_SESSION['id_producto']);
        //session_destroy();
    }
    ob_end_flush();
?>