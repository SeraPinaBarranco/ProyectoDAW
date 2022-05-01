<?php 
    session_start();


    require_once "model/basedatos.php";
    $conn = connDB();
    $id_receta = "";
    
    if(isset($_GET['edt_nombre']) && !empty($_GET['edt_nombre'])){
        $_SESSION['id_receta'] = $_GET['edt_nombre'] ;
        $id_receta = $_GET['edt_nombre'];

        echo $_SESSION['id_receta'];
        $query="SELECT * FROM recetas WHERE id_recetas = $id_receta";

        $resultado= consulta($conn, $query);

        extract($resultado);

        

        cerrarBD($conn);
    }   

    if(isset($_GET['modificar']) && !empty($_GET['modificar']) && !empty($_SESSION['id_receta'])){
        $receta = $_GET['modificar'];

        $nombre_receta = $receta;
       
        $query="UPDATE recetas SET nombre_receta = '$receta' WHERE id_recetas =" . $_SESSION['id_receta'];
        
        $resultado= selectBBDD($conn, $query);    

        cerrarBD($conn);
        
        unset($_SESSION['id_receta']);

        unset($_GET['modificar']);
        unset($_SESSION['id_receta']);
        //session_destroy();
        header("Refresh: 3; url=" . "listar_recetas.php");
        //extract($resultado);
    }
?>




<?php include_once "templates/title.html"; ?>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="styles/style_edit_receta.css">    
<title>Editar Receta</title>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edita Receta</title>
</head>
<body>
<?php include_once "templates/cabecera.html"?>
<div class="container col-4">

    <div class="row mt-5">
        <h3>Modifica el título de la receta</h3>
    </div>

    <div class="row mt-4">
        <form action="<?php echo  $_SERVER['PHP_SELF']  ?>" method="get">
        <div class="mb-3">
            <label for="modificar" class="form-label">Nombre: </label>
            <input hidden type="text" class="form-control" name="id_receta" value="<?php echo $_SESSION['id_receta']; ?>">
            <input type="text" class="form-control" name="modificar" id="modificar" value="<?php 
                if(isset($nombre_receta)){
                    echo $nombre_receta;
                }else{
                    echo $_GET['modificar'];
                }
                 ?>">          
        </div> 
        
        <div class="row m-2">
            
            <?php 
                if(!isset($_SESSION['id_receta'])){
                    echo "<h3 class='badge bg-success'>Receta modificada!!</h3>";
                }else{
                    echo "";
                }
            ?>
        </div>
       
        <button type="submit" class="btn btn-primary">Modificar</button>

        </form>
    </div>
</div>

    <?php include_once "templates/pie.html" ?>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>
</html>

<?php
      
?>